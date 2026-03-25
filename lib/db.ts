import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "leads.json");

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string;
  employees?: string;
  budget?: string;
  message?: string;
  quote?: number;
  status: LeadStatus;
  source?: string;
  created_at: string;
};

export const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

function readAll(): Lead[] {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(leads: Lead[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
}

export function getAllLeads(): Lead[] {
  return readAll().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function insertLead(data: Omit<Lead, "id" | "created_at" | "status">): Lead {
  const leads = readAll();
  const id = leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
  const lead: Lead = { ...data, id, status: "New", created_at: new Date().toISOString() };
  leads.push(lead);
  writeAll(leads);
  return lead;
}

export function updateLeadStatus(id: number, status: string): Lead | undefined {
  const leads = readAll();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return undefined;
  lead.status = status as LeadStatus;
  writeAll(leads);
  return lead;
}

export function deleteLead(id: number): void {
  writeAll(readAll().filter((l) => l.id !== id));
}
