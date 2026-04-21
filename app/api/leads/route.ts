import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import { getAllLeads, insertLead } from "@/lib/db";

const leadsRateLimit = new LRUCache<string, number>({
  max: 5000,
  ttl: 1000 * 60 * 60, // 1 hour
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

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
  // Rate limiting
  const ip = getClientIp(req);
  const count = leadsRateLimit.get(ip) ?? 0;
  if (count >= 10) {
    return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429, headers: { "Retry-After": "3600" } });
  }
  leadsRateLimit.set(ip, count + 1);

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { name, email, phone, company, services, employees, budget, message, quote, source } = body as Record<string, unknown>;

    if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Name is required (2–100 chars)" }, { status: 400 });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (message !== undefined && (typeof message !== "string" || message.length > 5000)) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const lead = insertLead({
      name: name.trim(),
      email,
      phone: typeof phone === "string" ? phone.slice(0, 30) : undefined,
      company: typeof company === "string" ? company.slice(0, 200) : undefined,
      services: typeof services === "string" ? services.slice(0, 500) : undefined,
      employees: typeof employees === "string" ? employees.slice(0, 50) : undefined,
      budget: typeof budget === "string" ? budget.slice(0, 50) : undefined,
      message: typeof message === "string" ? message.slice(0, 5000) : undefined,
      quote: typeof quote === "number" ? quote : undefined,
      source: typeof source === "string" ? source.slice(0, 100) : "unknown",
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
