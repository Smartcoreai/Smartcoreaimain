import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Aria, an AI assistant for SmartcoreAI — a company that helps small and medium-sized businesses grow using AI automation. You are friendly, professional, and concise.

SmartcoreAI offers exactly 4 services:
1. AI Chatbot – $399/month: A custom AI chatbot for your website that handles customer questions, captures leads, and works 24/7.
2. Booking System – $499/month: Automated appointment booking that syncs with your calendar and sends confirmations — no more back-and-forth.
3. CRM System – $899/month: A full customer relationship management system to track leads, follow-ups, and deals — powered by AI.
4. Custom AI Integrations – $1,500/month: Tailored AI workflows built specifically for your business needs.

Your job:
- Answer questions about these 4 services and their prices accurately.
- Encourage visitors to book a free discovery call at https://calendly.com/aleksanderb2006/30min
- If someone is unsure which service fits them, ask about their business and guide them to the right option.
- If someone asks about something unrelated to our services, politely redirect: "I'm here to help with SmartcoreAI's services — can I answer any questions about what we offer?"
- Never invent services, prices, or features that aren't listed above.
- Keep responses short and to the point. Use line breaks for readability.`;


export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now. Please try again shortly." }, { status: 200 });
  }
}
