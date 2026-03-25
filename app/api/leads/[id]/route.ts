import { NextRequest, NextResponse } from "next/server";
import { updateLeadStatus, deleteLead } from "@/lib/db";

function checkAdmin(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// PATCH /api/leads/[id] — update status
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await req.json();
  const lead = updateLeadStatus(Number(params.id), status);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lead);
}

// DELETE /api/leads/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  deleteLead(Number(params.id));
  return NextResponse.json({ ok: true });
}
