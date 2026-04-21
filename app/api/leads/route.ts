import { NextRequest, NextResponse } from "next/server";
import { getAllLeads, insertLead } from "@/lib/db";
import { formRatelimit, getClientIp } from "@/lib/ratelimit";
import { LeadSchema, checkContentLength } from "@/lib/validators";

// GET /api/leads — admin only (checked via header)
export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = getAllLeads();
  return NextResponse.json(leads);
}

// POST /api/leads — public (quote calculator), rate limited + validated
export async function POST(req: NextRequest) {
  // Reject oversized bodies
  if (!checkContentLength(req)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (formRatelimit) {
    const { success, reset } = await formRatelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: "Too many submissions. Try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }
  }

  // Parse JSON
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Validate + strip HTML tags
  const result = LeadSchema.safeParse(raw);
  if (!result.success) {
    const msg = result.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  try {
    const lead = insertLead(result.data);
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
