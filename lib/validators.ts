import { z } from "zod";
import { NextRequest } from "next/server";

export function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function checkContentLength(req: NextRequest, maxBytes = 100_000): boolean {
  const cl = req.headers.get("content-length");
  return !cl || parseInt(cl, 10) <= maxBytes;
}

// ── Contact form ──────────────────────────────────────────────────────────────
export const ContactSchema = z.object({
  name:     z.string().min(2, "Navn må være mellom 2 og 100 tegn").max(100, "Navn må være mellom 2 og 100 tegn").transform(stripTags),
  email:    z.string().email("Ugyldig e-postadresse").max(254, "Ugyldig e-postadresse"),
  phone:    z.string().max(20, "Ugyldig telefonnummer").optional().transform(v => v ? stripTags(v) : v),
  business: z.string().max(200, "Klinikknavnet er for langt").optional().transform(v => v ? stripTags(v) : v),
  message:  z.string().min(10, "Meldingen må være mellom 10 og 2000 tegn").max(2000, "Meldingen må være mellom 10 og 2000 tegn").transform(stripTags),
});

// ── Quote calculator lead ─────────────────────────────────────────────────────
export const LeadSchema = z.object({
  name:      z.string().min(2, "Name required (2–100 chars)").max(100).transform(stripTags),
  email:     z.string().email("Valid email required").max(254),
  phone:     z.string().max(20).optional().transform(v => v ? stripTags(v) : v),
  company:   z.string().max(200).optional().transform(v => v ? stripTags(v) : v),
  services:  z.string().max(500).optional().transform(v => v ? stripTags(v) : v),
  employees: z.string().max(50).optional(),
  budget:    z.string().max(50).optional(),
  message:   z.string().max(2000).optional().transform(v => v ? stripTags(v) : v),
  quote:     z.number().optional(),
  source:    z.string().max(100).optional().transform(v => v ? stripTags(v) : v),
});

// ── Aria chat messages ────────────────────────────────────────────────────────
export const ChatSchema = z.object({
  messages: z.array(z.object({
    role:    z.enum(["user", "assistant"]),
    content: z.string().min(1).max(2000).transform(stripTags),
  })).min(1).max(20),
  lang: z.string().max(10).optional(),
});
