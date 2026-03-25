import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Aria, an AI assistant for SmartCore — a company that helps small and medium-sized businesses implement AI solutions. You are friendly, professional, and helpful.

You help visitors with:
- Explaining our 4 services: AI Chatbot (from $299/mo), Google Review Automation (from $199/mo), Quote Calculator (from $399 one-time), and AI Pipeline Dashboard (from $499/mo)
- Answering questions about how AI can help their business
- Guiding them to fill out the quote calculator or contact form
- Booking a free consultation

Always be concise and helpful. If someone asks about pricing, give them the starting price and suggest they use the quote calculator for an exact price. If someone wants to get started, direct them to the contact form. Never make up information you don't know — instead say you'll connect them with a human.

End every first message by asking: 'What kind of business do you run?'`;

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
