import { NextRequest, NextResponse } from "next/server";
import { getAllLeads, insertLead } from "@/lib/db";

// GET /api/leads — admin only (checked via header)
export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = getAllLeads();
  return NextResponse.json(leads);
}

// POST /api/leads — public (contact form / quote calculator)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, services, employees, budget, message, quote, source } = body;
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const lead = insertLead({ name, email, phone, company, services, employees, budget, message, quote, source });
    return NextResponse.json(lead, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
