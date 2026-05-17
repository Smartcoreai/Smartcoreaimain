"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "no";

// ─── All translations ─────────────────────────────────────────────────────────

export const translations = {
  en: {
    nav: {
      services: "Services",
      pricing: "Pricing",
      faq: "FAQ",
      about: "About",
      contact: "Contact",
      getStarted: "Get started",
      bookCall: "Book a free call",
    },
    hero: {
      tag: "FOR SCANDINAVIAN DENTAL CLINICS",
      headline1: "Patient inquiries.",
      headline2: "Handled automatically.",
      subtext: "Ekspedenten is the dental clinic's digital receptionist — she answers calls and chat, books appointments, sends reminders to existing patients, and re-engages website visitors who didn't book. Live in 7 days.",
      ctaPrimary: "Book a free call",
      ctaSecondary: "See how it works",
      ctaTryEkspedenten: "Try Ekspedenten →",
      stats: [
        { value: "🚀", label: "Built for growth" },
        { value: "⚡", label: "Ready in days, not months" },
        { value: "🎯", label: "Tailored to your business" },
        { value: "💬", label: "We're not done until you're happy" },
      ],
      floatingBadges: [
        { icon: "💬", text: "Lead captured",     sub: "via AI chat" },
        { icon: "📅", text: "Booking confirmed", sub: "Tue 2:00 PM" },
        { icon: "🤖", text: "AI responding",     sub: "24/7 active" },
      ],
      headlineNew: "Your dental clinic's digital receptionist.",
      subNew: "Ekspedenten answers the phone, sends reminders to existing patients, and follows up with website visitors who didn't book. Live in 7 days.",
      trustLine: "3-month minimum · 60-day ROI guarantee",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      headline: "Your dental clinic is losing patients every day — without knowing it",
      cards: [
        {
          title: "Calls you can't answer",
          stat: "38%",
          desc: "38% of calls to dental clinics go unanswered. 80% are booking requests — 65% from new patients.",
        },
        {
          title: "The patient books with whoever answers first",
          stat: "78%",
          desc: "78% of customers book with the first business that responds. Responding within 5 minutes gives a 21× higher qualification rate than responding after 30.",
        },
        {
          title: "Patients who never come back",
          stat: "30–40%",
          desc: "30–40% of patients never book their next appointment after a recommended recall. Automated reminders lift retention by 15–30%.",
        },
      ],
      sources: "Sources: Resonate AI (2025), Peerlogic, Harvard Business Review / Oldroyd (MIT, 2011), American Dental Association.",
    },
    bridge: {
      eyebrow: "Our mission",
      lead: "Marketing only fills the bucket faster than it leaks out.",
      mottoPre: "Ekspedenten patches the",
      mottoEm: "\"leak\"",
      quote: "We're building Ekspedenten because dental-clinic receptions deserve better tools. Automatic handling of inbound inquiries should be the standard, not a luxury.",
      founders: "Aleksander Bjørndal & Henrik Andreassen Bøe",
      role: "Founders, Ekspedenten · Bergen",
      teamPlaceholder: "team photo",
    },
    solution: {
      eyebrow: "THE SOLUTION",
      headline: "Meet Ekspedenten — your clinic's digital receptionist.",
      headline1: "Zero missed inquiries.",
      headline2: "Zero lost patients.",
      subtitle: "Responds in your business's tone, qualifies leads automatically — with full visibility into everything.",
      modules: [
        {
          label: "AI Receptionist",
          title: "Your patients get answers in seconds. Not hours.",
          desc: "Ekspedenten answers incoming calls and web chat in your clinic's tone — checks availability, books appointments and confirms with the patient. Your team only steps in when needed.",
          features: ["Responds within 2 seconds", "Handles phone and web chat", "Books directly into the calendar", "Sends SMS confirmation", "Transfers to you when needed"],
        },
        {
          label: "Lead Follow-up",
          title: "Automatic follow-up until they book — or say no.",
          desc: "SMS, email and chat for 7 days. Personal tone, synced with CRM. No leads fall through the cracks.",
          features: ["Personal and natural tone", "SMS, email and chat for 7 days", "Synced with CRM", "Multi-channel follow-up", "No leads fall through the cracks"],
        },
      ],
    },
    process: {
      eyebrow: "THE PROCESS",
      headline: "From conversation to live AI — in 7 days",
      steps: [
        { num: "01", title: "Connect", desc: "Share access to calendar and CRM. 10 minutes." },
        { num: "02", title: "Train the AI", desc: "We train the AI on your business, your services and your tone." },
        { num: "03", title: "Automate", desc: "The system goes live. Calls, chat and leads are handled automatically." },
        { num: "04", title: "Improve", desc: "We analyse data and continuously improve the system." },
      ],
    },
    midCta: {
      headline: "How many new patients are you losing to competitors today?",
      subtitle: "38% of calls to dental clinics go unanswered — and 65% of those are from new patients. They call once. Don't get through. Call the competitor.",
      cta: "See what you can save →",
      stat1Label: "LOST REVENUE PER MONTH",
      stat1Value: "kr 320 853",
      stat1Sub: "in lost new patient inquiries",
      stat2Label: "RECOVERABLE LIFETIME VALUE (LTV)",
      stat2Value: "kr 3 208 530",
      stat2Sub: "conservative — kr 5 347 550 typical",
      breakdownTrigger: "Calculation breakdown",
      breakdown: [
        { title: "1. Missed calls: Total calls per week × missed rate", detail: "Example: 200 × 38% = 76 missed calls per week" },
        { title: "2. Lost new patients: Missed calls × 65%", detail: "65% of unanswered calls are from new patients who don't know the clinic and won't call back.\n(Source: industry research, multiple studies)\nExample: 76 × 65% = 49 lost new patients per week" },
        { title: "3. Lost revenue per month: Lost new patients × customer value × 4.33", detail: "Example: 49 × kr 1 500 × 4.33 = kr 318 000/month" },
        { title: "4. Lost lifetime value (LTV): Lost new patients per month × LTV", detail: "The average Norwegian dental patient is worth kr 15 000–25 000 over 5 years. We show both a conservative and a typical estimate.\nExample: 214 × kr 15 000 = kr 3 210 000 (conservative)\n         214 × kr 25 000 = kr 5 350 000 (typical)" },
      ],
    },
    aiStats: {
      eyebrow: "WHY AI",
      headline: "The numbers behind the decision",
      subtitle: "Businesses that implement AI systems see concrete results from day one.",
      stats: [
        {
          value: "47%",
          countTo: 47,
          suffix: "%",
          text: "of incoming calls to service businesses are never answered",
          context: "Source: industry data for Norwegian clinics and service businesses",
        },
        {
          value: "< 2 sec",
          countTo: 2,
          suffix: " sec",
          prefix: "< ",
          text: "response time with an AI receptionist — around the clock, all year",
          context: "Compared to an average of 4+ hours without AI",
        },
        {
          value: "3x",
          countTo: 3,
          suffix: "x",
          text: "more leads converted when follow-up happens automatically within 5 minutes",
          context: "AI chatbot captures and qualifies leads 24/7",
        },
        {
          value: "7 days",
          countTo: 7,
          suffix: " days",
          text: "from signing to live AI system — fully integrated with your business",
          context: "Includes setup, training and testing",
        },
      ],
    },
    trust: {
      eyebrow: "SECURITY AND TRUST",
      headline: "Built for Norwegian businesses. Owned by you.",
      cards: [
        { title: "GDPR-compliant", desc: "All data is processed in accordance with GDPR. We only use third-party providers with valid data processing agreements." },
        { title: "Encrypted storage", desc: "TLS/SSL encryption in transit and at rest. Your data is safe." },
        { title: "Data security", desc: "Data is stored securely by certified providers. Access is restricted to authorised personnel only." },
        { title: "You own the data", desc: "All customer data belongs to you. Export at any time." },
      ],
    },
    finalCta: {
      headline: "Ready to let AI do the work?",
      subtitle: "Book a no-obligation call. We'll show you exactly what we can build for your business — and you decide if it's worth it.",
      cta: "Book a free call",
      trustLine: "3-month minimum · 60-day ROI guarantee · Response within 4 hours",
    },
    ticker: [
      "AI Chatbot", "Booking Automation", "CRM System", "Lead Capture",
      "Custom Integrations", "24/7 Support", "Revenue Growth", "AI Workflows",
      "Instant Setup", "Smart Automation", "Real-time Analytics", "Client Portal",
    ],
    howItWorks: {
      tag: "Process",
      headline: "How it works",
      steps: [
        {
          num: "01",
          title: "Discovery call",
          desc: "We spend 30 minutes understanding your business, your customers, and where AI can make the biggest difference.",
        },
        {
          num: "02",
          title: "We build and train your AI in 7 days",
          desc: "Our team builds, trains, and tests your custom AI system. You review a live demo before we go live.",
        },
        {
          num: "03",
          title: "You launch and we iterate",
          desc: "Go live with our 60-day ROI guarantee. If Ekspedenten doesn't deliver measurable ROI within 60 days, we refund the monthly subscription.",
        },
      ],
    },
    services: {
      tag: "What we build",
      headline1: "Tools that",
      headline2: "pay for themselves",
      subtext: "Each product is built to generate revenue, not just look good. Try the live demos below.",
      monthNote: "month · 3-month minimum",
      getStarted: "Book a free call",
      liveDemo: "Live interactive demo",
      priceCustom: "Custom quote for every project",
      items: [
        {
          label: "AI Chatbot",
          tag: "Most Popular",
          headline: "Convert visitors to clients while you sleep",
          desc: "A trained AI assistant that handles leads, FAQs, bookings, and follow-ups — 24/7. No scripts, no delays.",
          features: ["Instant lead capture", "Custom AI training", "CRM integration", "Multi-channel (web, SMS, IG)"],
        },
        {
          label: "Leadgen System",
          tag: "Lead generation",
          headline: "Turn traffic into booked meetings. Automatically.",
          desc: "A fully automated leadgen system that captures, qualifies and routes inbound leads — without manual work.",
          features: ["AI lead capture forms", "Instant qualification", "Auto pipeline routing", "Email & SMS follow-up"],
        },
        {
          label: "AI Receptionist",
          tag: "Always on",
          headline: "AI receptionist that answers, qualifies and books — 24/7.",
          desc: "Your AI receptionist handles inbound calls, qualifies leads and books meetings — 24/7.",
          features: ["AI-powered reception", "Lead qualification by phone", "Auto follow-up", "CRM integration"],
        },
        {
          label: "Custom AI Integrations",
          tag: "Enterprise",
          headline: "Your entire workflow, automated.",
          desc: "We design and build a custom AI layer that plugs into your existing tools — turning hours of manual work into seconds.",
          features: ["Custom workflow design", "API integrations", "AI model training", "Dedicated support"],
        },
      ],
    },
    pricing: {
      tag: "Transparent pricing",
      headline1: "Simple, flat rates.",
      headline2: "No surprises.",
      subtext: "3-month minimum partnership, then month-to-month",
      popular: "Most Popular",
      period: "month",
      foundingPrice: "Founding price",
      setupFee: "kr 10,000 one-time setup",
      setupFeeCustom: "Setup fee by agreement",
      bottomNote: "All plans include onboarding support · 60-day ROI guarantee · ",
      customBundles: "Custom bundles available",
      priceCustom: "Custom quote for every project",
      plans: [
        {
          name: "AI Receptionist",
          desc: "Answers calls, SMS, chat and email 24/7. Includes AI Chatbot on your website.",
          features: ["Answers calls 24/7", "Handles chat and SMS", "Incl. AI Chatbot", "Automatic appointment booking", "CRM integration", "Call recording"],
          cta: "Book a free call",
        },
        {
          name: "Lead Follow-up",
          desc: "Automatically follows up every lead from first contact to booked appointment.",
          features: ["Instant lead capture", "Automatic qualification", "Email & SMS follow-up", "Auto-routing to pipeline", "CRM integration", "Monthly performance report"],
          cta: "Book a free call",
        },
        {
          name: "Full Package",
          desc: "AI Receptionist + Lead Follow-up + AI Chatbot — our recommended solution.",
          features: ["Everything in AI Receptionist", "Everything in Lead Follow-up", "Priority onboarding", "Dedicated account manager", "SLA guarantee"],
          cta: "Book a free call",
        },
      ],
    },
    objections: {
      tag: "Common objections",
      headline1: "We've heard every",
      headline2: "reason to wait.",
      subtext: "Here are the honest answers to the questions we get asked every week.",
      items: [
        { q: "It's too expensive.", a: "Our clients typically see ROI within the first month. The cost pays for itself." },
        { q: "I don't need AI yet.", a: "Your competitors are already using it. Every day you wait is revenue left on the table." },
        { q: "I can do this myself.", a: "You could. But it takes months to build and maintain. We deploy in days." },
        { q: "I'm not sure it'll work for my business.", a: "We've built systems for all kinds of businesses. Book a free call and we'll tell you honestly if it's a fit." },
        { q: "I need to think about it.", a: "Of course. We'll send you a one-page summary of what we'd build for you, so you have something concrete to think about. No follow-up pressure." },
      ],
    },
    faq: {
      hero: {
        pill: "Frequently asked questions",
        title1: "Questions clinics ask",
        titleEm: "before they sign",
        titleEnd: ".",
        subtitle: "Honest answers to everything we get asked, from GDPR to pricing to how Ekspedenten actually handles an emergency call.",
      },
      tabs: {
        sikkerhet: "Security & GDPR",
        drift: "Operations & onboarding",
        pris: "Pricing & terms",
        pasient: "Patient experience",
        teknisk: "Technical",
      },
      categories: [
        {
          id: "sikkerhet",
          icon: "01",
          iconClass: "gdpr",
          title: "Security & GDPR",
          count: "5 questions",
          questions: [
            {
              q: "Where is patient data stored?",
              a: "All patient data is processed within the EU. CRM data (conversations, bookings, contacts) is stored in Frankfurt via Supabase. Voice AI runs on Azure in Sweden Central. Both regions are inside the EU and covered by GDPR.\n\n**No patient data leaves the EU.** A Data Processing Agreement (DPA) is available as standard.",
            },
            {
              q: "Does Ekspedenten ask about symptoms or health information?",
              a: "No. Ekspedenten is intentionally designed **not** to collect detailed health information. She only asks about service category (cleaning, check-up, urgent) and suggests booking.\n\nIf the patient voluntarily mentions symptoms, Ekspedenten offers brief empathy and suggests an urgent appointment without asking for more details. Health information and anamnesis are taken up by the dentist at the clinic, where they belong.",
            },
            {
              q: "Are you GDPR-compliant?",
              a: "Yes. The full stack is GDPR-compliant from day one:\n\n• Data stored in the EU (Frankfurt and Sweden Central)\n• Ekspedenten does not ask about special categories (health data)\n• DPA available for all clinics\n• Clear policies for deletion and access",
            },
            {
              q: "What happens to the conversations? Are they stored?",
              a: "By default we store **metadata only**: timestamp, duration, service type, and whether a booking was made. We do not store audio or transcripts.\n\nIf the clinic wishes to store transcripts for quality assurance, that requires opt-in and patient consent. The text then goes through redaction that masks health terms before storage.",
            },
            {
              q: "Can we get a Data Processing Agreement (DPA)?",
              a: "Yes, always. The DPA is part of the standard contract. It covers us as data processor and you as data controller, with clear lines of responsibility.",
            },
          ],
        },
        {
          id: "drift",
          icon: "02",
          iconClass: "drift",
          title: "Operations & onboarding",
          count: "5 questions",
          questions: [
            {
              q: "How long does implementation take?",
              a: "Live in 7 days. Onboarding has 3 steps:\n\n1. **Connect** (Days 1–2): We connect to your calendar and email system.\n2. **Train** (Days 3–5): Ekspedenten reads your services, prices, and opening hours, and builds the knowledge base automatically.\n3. **Test and live** (Days 6–7): Pilot calls with the team before we go live for real patients.",
            },
            {
              q: "Do we need to train Ekspedenten ourselves?",
              a: "No. We do the entire onboarding for you. Ekspedenten reads existing emails, FAQs, and documents, and builds the knowledge base automatically. You can adjust rules or fill in knowledge gaps any time after you go live.",
            },
            {
              q: "Does Ekspedenten integrate with our practice management system?",
              a: "Yes. We integrate with the largest Nordic practice management systems: **Opus, Anita, and Muntra**. Other systems can be adapted on request. Contact us for specific setup.",
            },
            {
              q: "What about our existing phone number?",
              a: "You can keep it. We either forward incoming calls to Ekspedenten, or give you a new +47 number that forwards directly. Both work. You choose what fits best.",
            },
            {
              q: "Can we pause Ekspedenten temporarily?",
              a: "Yes. You can switch Ekspedenten on and off from the dashboard, for example when the reception is extra staffed, or for special days. Toggling takes one click.",
            },
          ],
        },
        {
          id: "pris",
          icon: "03",
          iconClass: "pris",
          title: "Pricing & terms",
          count: "5 questions",
          questions: [
            {
              q: "What does Ekspedenten cost?",
              a: "**AI Receptionist** (the core): NOK 11,000/mo per clinic. Includes phone, SMS, chat, AI chatbot, and CRM dashboard.\n\nAdd-ons as needed:\n• Lead Follower: NOK 7,500/mo\n• Reviews engine: NOK 2,500/mo\n• Custom voice: NOK 1,500/mo\n\nOne-time setup: NOK 10,000 on the first contract. All prices excluding VAT.",
            },
            {
              q: "What is the founding price?",
              a: "The first 5 clinics that sign get a 50% discount for 3 years. It's a price we offer early customers because they help us build the product. We get feedback, you get premium pricing.",
            },
            {
              q: "Is there a binding period?",
              a: "No. Monthly cancellation. We offer a 60-day ROI guarantee. If Ekspedenten doesn't deliver measurable ROI within the first 60 days, we refund the monthly subscription.",
            },
            {
              q: "What is the ROI guarantee?",
              a: "If Ekspedenten doesn't pay for itself (generating more value in bookings than it costs) within the first 60 days, you get your money back. We measure bookings, missed calls saved, and compare against the numbers from before you installed.",
            },
            {
              q: "Can multiple clinics share one solution?",
              a: "Yes. If you own a chain with multiple clinics you get a multi-clinic discount. Each clinic has its own Ekspedenten with its own services, prices, and opening hours, but all data and analytics gather in one dashboard.",
            },
          ],
        },
        {
          id: "pasient",
          icon: "04",
          iconClass: "pasient",
          title: "Patient experience",
          count: "5 questions",
          questions: [
            {
              q: "Does the patient know they're talking to an AI?",
              a: "Yes. Ekspedenten always introduces herself clearly as an AI receptionist when she answers the phone. We believe trust comes from openness, not from pretending the technology is something it isn't.",
            },
            {
              q: "What if the patient doesn't want to talk to AI?",
              a: "Ekspedenten automatically transfers to the human behind if the patient asks, or if the conversation requires human judgment. She works with the team, not instead of it.",
            },
            {
              q: "What about elderly patients who aren't technical?",
              a: "Ekspedenten speaks clear Norwegian, in natural pace, with a warm voice. Most elderly people don't experience that she's \"different\" from a human receptionist. Patients who struggle are transferred immediately to the clinic when Ekspedenten notices.",
            },
            {
              q: "Does Ekspedenten send SMS confirmation?",
              a: "Yes. After each booking Ekspedenten automatically sends SMS with booking details and a link to confirm. She also sends reminders before the appointment, multi-touch (1 week / 1 day / 2 hours before) to reduce no-shows.",
            },
            {
              q: "Can Ekspedenten handle complaints or urgent cases?",
              a: "For complaints: Ekspedenten takes the complaint empathetically, logs it, and promises that the clinic will call back shortly. She does not try to resolve it herself.\n\nFor urgent cases: Ekspedenten prioritizes an urgent appointment immediately if the patient describes pain or emergency, and flags the clinic about a case requiring follow-up.",
            },
          ],
        },
        {
          id: "teknisk",
          icon: "05",
          iconClass: "teknisk",
          title: "Technical",
          count: "4 questions",
          questions: [
            {
              q: "What technology do you use?",
              a: "Ekspedenten is built on LiveKit (voice AI), Azure OpenAI (Sweden Central) for the language model, and Azure Cognitive Services for Norwegian speech (nb-NO Pernille). All EU-hosted, GDPR-safe.",
            },
            {
              q: "What if Ekspedenten makes a mistake?",
              a: "We monitor all conversations in real time. If Ekspedenten misses (books wrong time, forgets info), it's flagged automatically and one of us looks at it the same day. You get notified and refunded if it causes real losses.",
            },
            {
              q: "Can we customize what Ekspedenten says?",
              a: "Yes. The clinic's own tone, phrasing, and priorities are fed into Ekspedenten during onboarding. You can also adjust over time via the dashboard. Change what she says in urgent cases, which questions she prioritizes, and so on.",
            },
            {
              q: "What if the network or system is down?",
              a: "We have a 99.9% uptime guarantee. If Ekspedenten is down, calls are automatically forwarded to the clinic's main number or a backup. You never lose a call because our technology fails.",
            },
          ],
        },
      ],
      cta: {
        title1: "Your question",
        titleEm: "isn't on the list",
        titleEnd: "?",
        subtitle: "Book a no-obligation discovery call. We answer everything, and put a concrete number on what Ekspedenten would be worth for your clinic.",
        primary: "Book demo",
        secondary: "Send email",
        secondaryHref: "mailto:hei@ekspedenten.no",
      },
    },
    booking: {
      tag: "Book a call",
      headline1: "Let's talk",
      headline2: "about your business",
      subtext: "Pick a time that works. Synced with my live calendar — no double-bookings.",
      available: "Available sessions",
      freeNote: "100% free · no obligation",
      freeDesc: "Just a conversation. We'll tell you exactly what's possible for your business.",
      callTypes: [
        { label: "Discovery Call",    duration: "15 min", desc: "Learn what we can build for you" },
        { label: "Product Demo",      duration: "30 min", desc: "See your system in action" },
        { label: "Strategy Session",  duration: "45 min", desc: "Full roadmap for your business" },
      ],
      bookNow: "Book a free call",
      popular: "Most Popular",
    },
    contact: {
      tag: "Get in touch",
      headline1: "Ready to automate",
      headline2: "your business?",
      subtext: "Tell us what you need. We'll map out exactly how we can help.",
      leftHeadline: "Let's build something that works",
      leftDesc: "Whether you need one tool or a complete AI transformation — we start with a conversation, not a contract.",
      perks: ["Response within 4 hours", "No spam, ever", "Strategy call included"],
      directTitle: "Or reach us directly",
      bookCallLink: "Book a discovery call →",
      labels: { name: "Name *", email: "Email *", phone: "Phone (optional)", business: "Business name", message: "What do you need? *" },
      placeholders: { name: "Your name", email: "you@company.com", phone: "Your phone number", business: "Your company", message: "Tell us about your business and what you're trying to achieve..." },
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successDesc: "We'll be in touch within 4 hours. Check your inbox.",
      sendAnother: "Send another",
      errorTitle: "Something went wrong.",
      errorDesc: "Please try again or email us at hei@ekspedenten.no",
      responseNote: "We respond within 4 hours during business hours.",
    },
    footer: {
      tagline: "AI-powered growth systems for businesses that want to move faster.",
      rights: "All rights reserved.",
      followUs: "Follow us",
      categories: { Company: "Company" },
      links: {
        Company: [
          { label: "About",        href: "/about" },
          { label: "FAQ",          href: "/faq" },
          { label: "Pricing",      href: "/pricing" },
          { label: "Book a call",  href: "https://calendly.com/smartcoreaimeeting/new-meeting", target: "_blank" },
        ],
      },
    },
    chat: {
      welcome: "Hey! I'm Ekspedenten, the digital assistant on this site 👋\n\nI can tell you about our services and pricing, or help you figure out which solution fits your business best.\n\nWhat can I help you with?",
      quickReplies: ["What services do you offer?", "How much does it cost?", "How fast can we get started?"],
      placeholder: "Ask me anything...",
      poweredBy: "Powered by Ekspedenten · responses may vary",
      teaserPre: "Ready to",
      teaserEm: "fix the leak",
      teaserPost: "?",
      openLabel: "Open chat with Ekspedenten",
      closeLabel: "Close chat",
    },
    pricingPage: {
      back: "← Back",
      title: "Choose your plan",
      subtitle: "3-month minimum partnership, then month-to-month",
      popular: "Most Popular",
      period: "mo",
      foundingPrice: "Founding price",
      setupFee: "kr 10,000 one-time setup",
      setupFeeCustom: "Setup fee by agreement",
      priceCustom: "Custom quote for every project",
      getStarted: "Book a free call",
      bookCall: "Book a free call",
      bottomNote: "All plans include onboarding support · 60-day ROI guarantee",
      urgencyBarPrefix: "Only ",
      urgencyBarSuffix: " founding-client spots available. Prices revert to standard pricing once filled.",
      heroEyebrow: "PRICING",
      heroHeadline1: "Simple pricing.",
      heroHeadline2: "Real value.",
      heroSubtitle: "No hidden costs. No long contracts. Just AI systems that pay for themselves — or your money back.",
      trustItems: ["60-day ROI guarantee", "Money-back guarantee", "Live in 7 days"],
      foundingBadge: "Founding price",
      planNames: ["AI Receptionist", "Lead Follow-up", "Full Package"],
      planTaglines: ["Your always-on AI receptionist", "Automatic lead follow-up", "Everything in one package"],
      guarantee: {
        items: [
          { title: "60-day ROI guarantee", desc: "If Ekspedenten doesn't deliver measurable ROI within 60 days, we refund the monthly subscription." },
          { title: "Money-back guarantee", desc: "Refund of the monthly subscription if we miss the 60-day ROI target. No questions, no friction." },
          { title: "Live in 7 days", desc: "From signing to production — or you don't pay" },
          { title: "GDPR compliant", desc: "All data processed in accordance with GDPR. You own your data." },
        ],
      },
      compare: {
        eyebrow: "COMPARISON",
        headline: "With Ekspedenten vs. without",
        subtitle: "Real differences for your business — no buzzwords.",
        colArea: "Area",
        colWithout: "Without AI",
        colWith: "With Ekspedenten",
        rows: [
          { area: "Availability",         without: "Business hours",           with: "24/7 without stopping"     },
          { area: "Lead response time",   without: "Hours — days",             with: "Under 2 seconds"           },
          { area: "After-hours bookings", without: "Lost",                     with: "Captured automatically"    },
          { area: "Lead follow-up",       without: "Manual, often forgotten",  with: "Automatic for 7 days"      },
          { area: "Setup time",           without: "Months of development",    with: "Live in 7 days"            },
          { area: "Cost per lead",        without: "High and unpredictable",   with: "Fixed monthly price"       },
        ],
      },
      faqTeaser: {
        headline: "Questions?",
        desc: "We've compiled the most common questions about setup, data, follow-up and more.",
        cta: "See frequently asked questions →",
      },
      plans: [
        {
          desc: "Answers calls, SMS, chat and email 24/7. Includes AI Chatbot on your website.",
          features: ["Answers calls 24/7", "Handles chat and SMS", "Incl. AI Chatbot", "Automatic appointment booking", "CRM integration", "Call recording"],
        },
        {
          desc: "Automatically follows up every lead from first contact to booked appointment.",
          features: ["Instant lead capture", "Automatic qualification", "Email & SMS follow-up", "Auto-routing to pipeline", "CRM integration", "Monthly performance report"],
        },
        {
          desc: "AI Receptionist + Lead Follow-up + AI Chatbot — our recommended solution.",
          features: ["Everything in AI Receptionist", "Everything in Lead Follow-up", "Priority onboarding", "Dedicated account manager", "SLA guarantee"],
        },
      ],
    },
    thankYou: {
      title: "Thank you! 🎉",
      subtitle: "Your payment was successful. We'll be in touch within 4 hours.",
      backButton: "Back to homepage",
    },
    about: {
      hero: {
        tag: "Our story",
        headline1: "Two best friends.",
        headline2: "One mission.",
        subtext: "We started Ekspedenten because we saw the same problem over and over: dental clinics were losing patients to missed calls — while the AI tools that could have helped were built for enterprise companies, not for them.",
      },
      team: {
        tag: "The team",
        headline: "The people behind Ekspedenten",
        members: [
          {
            name: "Henrik Andreassen Bøe",
            role: "CO-FOUNDER & CEO",
            bio: "Entrepreneur from Bergen, focused on making technology deliver real results — not just impress. Co-founded Ekspedenten with Aleksander after seeing how many businesses pay for AI that never delivers. Runs the commercial side: client relations, strategy, growth.",
            email: "henrik@ekspedenten.no",
            linkedin: "https://www.linkedin.com/in/henrik-andreassen-b%C3%B8e",
          },
          {
            name: "Aleksander Nordeide Bjørndal",
            role: "CO-FOUNDER & CTO",
            bio: "Self-taught developer from Bergen with a passion for building AI systems that actually work. Co-founded Ekspedenten with Henrik because he was tired of seeing businesses pay for technology that never delivered. Runs the technical side: building, integrations, AI training.",
            email: "aleksander@ekspedenten.no",
            linkedin: "https://www.linkedin.com/in/aleksander-bj%C3%B8rndal/",
          },
        ],
      },
      story: {
        tag: "Our story",
        headline: "How we got here",
        paragraphs: [
          "Ekspedenten was founded in 2026 in Bergen, Norway by two best friends who saw the same problem everywhere: small and mid-sized businesses were being left behind in the AI revolution. Enterprises had the budgets. For everyone else, AI was a luxury they couldn't afford.",
          "We built Ekspedenten to change that. No six-month implementation projects. No technical jargon. Just AI systems that plug into your business and start working — in days, not months.",
          "Our model is built on commitment. A one-time setup fee, a fixed monthly price, and a minimum three-month partnership — because real results take time to compound. We don't sell quick fixes. We build systems that grow with you.",
          "Today we build AI chatbots, lead generation systems, and AI receptionists for Scandinavian dental clinics — everything from automated booking to lead qualification running 24/7.",
          "Our team is lean by choice. We'd rather build fewer systems that actually drive revenue than sell dashboards nobody opens. We only work with businesses where AI can deliver a measurable return, because focus is how you build trust.",
        ],
      },
      values: [
        { title: "Focus over everything", desc: "We work with a small number of clients at a time so every business gets our full attention." },
        { title: "Results, not dashboards", desc: "We measure our work by revenue generated, not vanity metrics. No fluff, no fillers." },
        { title: "Small team, by design", desc: "We stay lean on purpose. Fewer clients means deeper work and better systems." },
      ],
      cta: {
        headline: "Ready for a conversation?",
        subtitle: "Let's find out if AI can add measurable value to your business — no pitch, no pressure.",
        button: "Book a free call →",
        trustLine: "No commitment · 60-day ROI guarantee · Response within 4 hours",
      },
    },
    calculator: {
      title: "How much revenue is your clinic losing?",
      subtitle: "Enter your call volume and see the true cost of missed calls.",
      labelCalls: "Incoming calls per week",
      labelMissed: "Percentage of calls unanswered",
      labelValue: "Average customer value (first visit, NOK)",
      resultMainLabel: "Lost revenue per month (new patients)",
      resultMainSub: "Based on first-visit value",
      resultLtvLabel: "Potential lost lifetime value (LTV)",
      resultLtvLowLabel: "Conservative:",
      resultLtvHighLabel: "Typical:",
      resultLtvSub: "Based on average 5-year patient LTV for Norwegian dental clinics (NOK 15,000–25,000)",
      breakdownTitle: "Calculation breakdown",
      breakdownLine1: "Missed calls per week: {calls} × {pct}% = {missed} missed calls",
      breakdownLine2: "Missed new patients per week: {missed} × 65% = {newPat} new patients",
      breakdownLine2note: "65% of unanswered calls are from new patients who don't know the clinic and don't call back. (Source: industry research, multiple studies)",
      breakdownLine3: "Lost revenue per month: {newPat} × {val} × 4.33 = {monthly}",
      breakdownLine4a: "Conservative LTV: {monthly_new} × 15,000 = {ltvLow}",
      breakdownLine4b: "Typical LTV: {monthly_new} × 25,000 = {ltvHigh}",
      breakdownLine4note: "An average Norwegian dental patient is worth NOK 15,000–25,000 over 5 years.",
      heroHook: "How much time do you spend on calls, booking and follow-up today?",
      heroParagraph: "A typical dental clinic spends 10–15 hours per week on calls, booking and follow-up. Ekspedenten reduces this dramatically.",
      heroCta: "See what you can save →",
      heroBox1Label: "HOURS SAVED PER MONTH",
      heroBox1Value: "47",
      heroBox1Sub: "hours saved per month",
      heroBox2Label: "IN EXTRA BOOKINGS",
      heroBox2Value: "kr 51 000",
      heroBox2Sub: "in extra bookings",
      cta: "Book a free call to get started →",
      backLink: "← Back",
    },
    diagnose: {
      idle: {
        eyebrow: "Ready when you are",
        introPre: "We measure",
        introEm: "four leak sources",
        introPost: " for your clinic and sum them into one annual figure: what unanswered calls, dormant patients, no-shows, and after-hours web leads actually cost you each year.",
        items: [
          { title: "Unanswered calls", desc: "Patients who call but don't get through. They typically dial the next clinic on the list." },
          { title: "Dormant patients", desc: "People in your patient base who haven't visited in 18+ months. A share can be re-engaged with structured follow-up." },
          { title: "No-shows", desc: "Booked patients who don't show up. SMS confirmation and automated follow-up typically reduce this by 38–40%." },
          { title: "After-hours web leads", desc: "Form/chat inquiries while you're closed. Most find another clinic before your next workday." },
        ],
        hint: "Press «Run diagnosis» when ready, you'll have your clinic's number a moment later.",
      },
      showFormula: "Show how we calculate",
      hideFormula: "Hide how we calculate",
    },
    personvern: {
      eyebrow: "Legal",
      headline: "Privacy Policy",
      updated: "Last updated: 12 May 2026",
      reviewed: "Last legal review: N/A (after pilot)",
      scope: "Covers ekspedenten.no and app.ekspedenten.no.",
      tocLabel: "On this page",
      toc: [
        { id: "innledning", title: "1. Introduction" },
        { id: "data", title: "2. What data we collect" },
        { id: "lagring", title: "3. Where data is stored (sub-processors)" },
        { id: "grunnlag", title: "4. Legal basis (GDPR Art. 6)" },
        { id: "lagringstid", title: "5. Retention" },
        { id: "rettigheter", title: "6. Your rights (GDPR)" },
        { id: "cookies", title: "7. Cookies" },
        { id: "endringer", title: "8. Changes" },
        { id: "datatilsynet", title: "9. Supervisory authority" },
      ],
      intro: {
        title: "1. Introduction",
        paragraphs: [
          "Ekspedenten AS (registration pending) is a Norwegian company based in Bergen. We provide an AI-powered digital receptionist for dental clinics. Ekspedenten answers calls, and a CRM platform handles leads, follow-up and bookings.",
          "This policy explains which personal data we process, why, and what rights you have. It covers both ekspedenten.no (marketing and demo) and app.ekspedenten.no (the CRM platform).",
        ],
        contactLabel: "Contact:",
        contacts: [
          { label: "General", emails: ["aleksander@ekspedenten.no", "henrik@ekspedenten.no"] },
        ],
      },
      data: {
        title: "2. What data we collect",
        groups: [
          {
            heading: "Website visitors (ekspedenten.no)",
            bullets: [
              "Demo popup: name, email, phone, clinic name",
              "Diagnosis form: email and the numbers you enter into the calculator",
            ],
          },
          {
            heading: "CRM users (app.ekspedenten.no)",
            bullets: [
              "User profile and login credentials",
              "Clinic membership and role",
            ],
          },
          {
            heading: "Patients calling Ekspedenten",
            bullets: [
              "Phone number (from the call)",
              "Text transcript of the conversation (max 30 days)",
              "Booking data (requested slot, chosen appointment, etc.)",
              "No audio is stored, only the text transcript",
            ],
          },
        ],
        role: "We process patient data on behalf of the clinic. The clinic is the data controller; Ekspedenten is the data processor. A Data Processing Agreement (DPA) is signed with every clinic before going live.",
      },
      storage: {
        title: "3. Where data is stored (sub-processors)",
        intro: "We use the following sub-processors. All transfers are encrypted (TLS), and patient data stays within the EU/EEA.",
        headers: ["Provider", "Location", "Purpose"],
        rows: [
          { provider: "Supabase", location: "Frankfurt, EU", purpose: "Database (users, leads, CRM, transcripts)" },
          { provider: "Microsoft Azure", location: "Sweden Central, EU", purpose: "AI language model, speech-to-text (STT) and text-to-speech (TTS)" },
          { provider: "Leyr.io", location: "EU", purpose: "Booking integration with dental practice-management systems" },
          { provider: "Vercel", location: "US (DPF-certified)", purpose: "Static website hosting (no patient or health data)" },
          { provider: "LiveKit Cloud", location: "EU region", purpose: "Real-time audio for Ekspedenten calls" },
          { provider: "DIDWW", location: "Ireland, EU", purpose: "Telephony provider (activated at first pilot)" },
        ],
      },
      legal: {
        title: "4. Legal basis (GDPR Art. 6)",
        intro: "We process personal data on the following grounds:",
        items: [
          { label: "Website leads (demo, diagnosis)", basis: "Consent", article: "Art. 6 (1) (a)", desc: "You voluntarily submit the form so we can contact you." },
          { label: "CRM users (clinic staff)", basis: "Contract", article: "Art. 6 (1) (b)", desc: "Processing is necessary to deliver the service the clinic has signed up for." },
          { label: "Patient data (transcripts, bookings)", basis: "Clinic's legal basis", article: "Art. 6 (1) (b) / (c)", desc: "Typically the healthcare contract or a legal record-keeping obligation. We process only on documented instructions from the clinic." },
        ],
      },
      retention: {
        title: "5. Retention",
        bullets: [
          "Leads (demo, diagnosis): up to 24 months if not converted to a contract, then deleted.",
          "Conversation transcripts: max 30 days, then automatic deletion.",
          "Booking data: for as long as the clinic's agreement with Ekspedenten is in force.",
          "On termination, clinic and patient data is deleted within 90 days (unless law requires longer retention).",
        ],
      },
      rights: {
        title: "6. Your rights (GDPR)",
        intro: "Under the GDPR you have the right to:",
        bullets: [
          "Access the data we hold about you",
          "Rectification of inaccurate or incomplete data",
          "Erasure (\"the right to be forgotten\")",
          "Restriction of processing",
          "Data portability: receive your data in a machine-readable format",
          "Object to processing",
        ],
        howBefore: "For patient data, the request must be directed to the clinic (the data controller). For website and CRM data, email ",
        email: "aleksander@ekspedenten.no",
        howAfter: ". We respond within 30 days.",
        complaint: "You can also lodge a complaint with the Norwegian Data Protection Authority (Datatilsynet) if you believe we are processing data in breach of the GDPR.",
      },
      cookies: {
        title: "7. Cookies",
        body: "We use only technical cookies required for authentication and basic site functionality. We do not set tracking cookies and do not use analytics tools such as Google Analytics. If this changes, this policy will be updated and consent will be obtained where required.",
      },
      changes: {
        title: "8. Changes",
        body: "We may update this policy as needed. Material changes are announced via a banner on the website and email to registered users. The current version is always available on this page, with the date of the most recent update.",
      },
      authority: {
        title: "9. Supervisory authority",
        body: "You have the right to lodge a complaint with the Norwegian Data Protection Authority (Datatilsynet) if you believe we are processing personal data in breach of the GDPR.",
        linkLabel: "datatilsynet.no",
        linkHref: "https://www.datatilsynet.no",
      },
    },
    bookCall: {
      label: "Book a free consultation →",
    },
    cookies: {
      banner: {
        title: "Cookies",
        body: "We only use essential technical cookies for authentication and site functionality. We don't track you.",
        policyLink: "Read more in our privacy policy",
        button: "Got it",
        ariaLabel: "Cookie notice",
      },
      settingsLink: "Cookie settings",
    },
    testimonialWidget: {
      label: "CONTINUOUS",
      value: "7 DAYS",
      sub: "automatic follow-up",
    },
    solutionWidget: {
      label: "Continuous follow-up",
      value: "7",
      unit: "days",
    },
    pricingSize: {
      toggleLabel: "Choose your clinic size",
      small: "Small clinic",
      medium: "Medium clinic",
      large: "Large clinic",
      inclVat: "incl. VAT",
    },
    offering: {
      brand: "Ekspedenten",
      brandSub: "standard package",
      metaEyebrow: "For Norwegian dental clinics",
      metaVersion: "May 2026 · Version 1.0",
      oneLinerLabel: "What we do",
      oneLinerLead: "AI receptionist for Norwegian dental clinics. Answers 24/7, books directly in ",
      oneLinerSystems: ["Opus", "Muntra", "Anita"],
      oneLinerJoiner: ", ",
      oneLinerFinalJoiner: ", and ",
      oneLinerTail: ", so no patient is lost to a competitor.",
      includesTitle: "What you get",
      includes: [
        "Norwegian-speaking AI handling inbound calls 24/7 — weekends and holidays",
        "Booking directly in your record system (Opus, Muntra or Anita)",
        "Automatic SMS confirmation to the patient",
        "Dashboard with calls, transcripts, bookings and missed calls",
        "Hands-on training from Henrik or Aleksander the first week",
      ],
      excludesTitle: "What we don't do",
      excludesTitleEm: "don't",
      excludes: [
        "Outbound calls — inbound only",
        "Medical questions or symptom advice",
        "SMS campaigns or marketing",
        "Patient record management (you own the journal)",
      ],
      priceHeading: "Price",
      pricingTag: "Founding",
      pricingMonthlyLabel: "Monthly — first 10 clinics",
      pricingStrikethrough: "kr 10,000 / mo",
      pricingPrice: "kr 6,900",
      pricingPriceSuffix: "/ mo",
      pricingStartupLabel: "Setup",
      pricingStartupPrice: "kr 7,500",
      pricingStartupSuffix: "one-time",
      pricingLockLabel: "Commitment",
      pricingLockValue: "3 mo",
      pricingNote: "After 3 months: monthly cancellation with 30 days' notice. Founding price locked for 12 months from signing — does not increase even after the first 10 clinics are filled.",
      onboardingHeading: "Onboarding — 7 working days once prerequisites are in place",
      timelineDays: [
        { label: "Day 1",    text: "Kickoff call" },
        { label: "Day 2–3",  text: "AI training" },
        { label: "Day 4",    text: "Record system integration" },
        { label: "Day 5",    text: "Telephony setup" },
        { label: "Day 6",    text: "Test and tuning" },
        { label: "Day 7",    text: "Live" },
        { label: "Day 8+",   text: "Henrik / Aleksander shadow" },
      ],
      successHeading: "Success milestones",
      milestones: [
        { day: "Day 30 · Ramp-up",  textStrong: "60%+ of calls handled", textRest: " by Ekspedenten without escalating to the clinic." },
        { day: "Day 60 · ROI check", textStrong: "Measurement vs baseline", textRest: " — more bookings, fewer missed calls. Guarantee expires." },
        { day: "Day 90 · Full report", textStrong: "Total value generated in kr", textRest: ", number of bookings, no-shows reduced." },
      ],
      safetyHeading: "Safety for the clinic",
      guarantees: [
        { strong: "60-day ROI guarantee",      rest: " — refund if no measurable return" },
        { strong: "Live in 7 working days",    rest: " — or the first month is free" },
        { strong: "3-month commitment",        rest: ", then monthly cancellation with 30 days' notice" },
        { strong: "Patient data deleted",      rest: " within 30 days of request" },
        { strong: "GDPR-safe",                 rest: " — all data stored in the EU (Frankfurt)" },
        { strong: "The clinic owns the data",  rest: " — full export on cancellation" },
      ],
      contactLabel: "Contact",
      contactCtoLabel: "CTO",
      contact1Name: "Henrik Andreassen Bøe",
      contact1Email: "henrik@ekspedenten.no",
      contact2Name: "Aleksander Bjørndal",
      contact2Email: "aleksander@ekspedenten.no",
      contactCta: "ekspedenten.no →",
    },
  },

  no: {
    nav: {
      services: "Tjenester",
      pricing: "Priser",
      faq: "FAQ",
      about: "Om oss",
      contact: "Kontakt",
      getStarted: "Kom i gang",
      bookCall: "Book en gratis samtale",
    },
    hero: {
      tag: "FOR SKANDINAVISKE TANNKLINIKKER",
      headline1: "Pasienthenvendelser.",
      headline2: "Håndtert automatisk.",
      subtext: "Ekspedenten er tannklinikkens digitale ekspedient — hun svarer anrop og chat, booker timer, sender påminnelser til eksisterende pasienter og henter tilbake nettbesøkende som ikke bookte. Live på 7 dager.",
      ctaPrimary: "Book gratis samtale",
      ctaSecondary: "Se hvordan det fungerer",
      ctaTryEkspedenten: "Prøv Ekspedenten →",
      stats: [
        { value: "🚀", label: "Bygget for vekst" },
        { value: "⚡", label: "Klar på dager, ikke måneder" },
        { value: "🎯", label: "Skreddersydd for din bedrift" },
        { value: "💬", label: "Vi er ikke fornøyd før du er det" },
      ],
      floatingBadges: [
        { icon: "💬", text: "Lead fanget",        sub: "via AI-chat" },
        { icon: "📅", text: "Booking bekreftet",  sub: "Tir 14:00" },
        { icon: "🤖", text: "AI svarer",          sub: "24/7 aktiv" },
      ],
      headlineNew: "Tannklinikkens digitale ekspedient.",
      subNew: "Ekspedenten tar telefonen, sender påminnelser til eksisterende pasienter, og følger opp nettbesøkende som ikke booket. Live på 7 dager.",
      trustLine: "3 måneders minimumsperiode · 60 dagers ROI-garanti",
    },
    problem: {
      eyebrow: "PROBLEMET",
      headline: "Tannklinikken din mister pasienter hver dag — uten å vite det",
      cards: [
        {
          title: "Telefoner du ikke rekker",
          stat: "38%",
          desc: "38% av anrop til tannklinikker blir aldri besvart. 80% av dem er bookingforespørsler — 65% fra nye pasienter.",
        },
        {
          title: "Pasienten velger den som svarer først",
          stat: "78%",
          desc: "78% av kunder booker hos første bedrift som svarer. Svar innen 5 minutter gir 21× høyere kvalifiseringsrate enn svar etter 30.",
        },
        {
          title: "Pasienter som aldri kommer tilbake",
          stat: "30–40%",
          desc: "30–40% av pasienter booker aldri neste time etter anbefalt recall. Automatiserte innkallinger løfter retensjon med 15–30%.",
        },
      ],
      sources: "Kilder: Resonate AI (2025), Peerlogic, Harvard Business Review / Oldroyd (MIT, 2011), American Dental Association.",
    },
    bridge: {
      eyebrow: "Vår misjon",
      lead: "Markedsføring fyller kun bøtten raskere enn det lekker ut.",
      mottoPre: "Ekspedenten fikser",
      mottoEm: "«lekkasjen»",
      quote: "Vi bygger Ekspedenten fordi resepsjoner i tannklinikker fortjener bedre verktøy. Automatisk besvarelse av henvendelser burde være standard, ikke luksus.",
      founders: "Aleksander Bjørndal & Henrik Andreassen Bøe",
      role: "Gründere, Ekspedenten · Bergen",
      teamPlaceholder: "team-bilde",
    },
    solution: {
      eyebrow: "LØSNINGEN",
      headline: "Møt Ekspedenten — klinikkens digitale ekspedient.",
      headline1: "Null tapte henvendelser.",
      headline2: "Null tapte pasienter.",
      subtitle: "Svarer i din bedrifts tone, kvalifiserer leads automatisk — med full oversikt over alt som skjer.",
      modules: [
        {
          label: "AI-resepsjonist",
          title: "Pasientene dine får svar på sekunder. Ikke timer.",
          desc: "Ekspedenten svarer innkommende samtaler og chat i klinikkens tone — sjekker tilgjengelighet, booker timer og bekrefter med pasienten. Teamet ditt trår bare inn når det trengs.",
          features: ["Svarer innen 2 sekunder", "Håndterer telefon og web-chat", "Booker direkte i kalenderen", "Sender bekreftelse på SMS", "Overfører til deg ved behov"],
        },
        {
          label: "Lead-oppfølging",
          title: "Automatisk oppfølging til de booker — eller sier nei.",
          desc: "SMS, e-post og chat i 7 dager. Personlig tone, synkronisert med CRM. Ingen leads faller mellom stolene.",
          features: ["Personlig og naturlig tone", "SMS, e-post og chat i 7 dager", "Synkronisert med CRM", "Flerkanaloppfølging", "Ingen leads faller mellom stolene"],
        },
      ],
    },
    process: {
      eyebrow: "PROSESSEN",
      headline: "Fra samtale til live AI — på 7 dager",
      steps: [
        { num: "01", title: "Koble til", desc: "Del tilgang til kalender og CRM. 10 minutter." },
        { num: "02", title: "Tren AI-en", desc: "Vi trener AI-en på din bedrift, dine tjenester og din tone." },
        { num: "03", title: "Automatiser", desc: "Systemet går live. Telefoner, chat og leads håndteres automatisk." },
        { num: "04", title: "Forbedre", desc: "Vi analyserer data og forbedrer systemet kontinuerlig." },
      ],
    },
    midCta: {
      headline: "Hvor mange nye pasienter mister du til konkurrentene i dag?",
      subtitle: "38% av anropene til tannklinikker går ubesvart — og 65% av de ubesvarte er nye pasienter. De ringer én gang. Får ikke svar. Ringer konkurrenten.",
      cta: "Se hva du kan spare →",
      stat1Label: "TAPT INNTEKT PER MÅNED",
      stat1Value: "kr 320 853",
      stat1Sub: "i tapte nye pasienthenvendelser",
      stat2Label: "GJENVINNBAR LIVSTIDSVERDI (LTV)",
      stat2Value: "kr 3 208 530",
      stat2Sub: "konservativt — kr 5 347 550 typisk",
      breakdownTrigger: "Beregningsforklaring",
      breakdown: [
        { title: "1. Tapte anrop: Totale anrop per uke × andel ubesvart", detail: "Eksempel: 200 × 38% = 76 tapte anrop per uke" },
        { title: "2. Tapte nye pasienter: Tapte anrop × 65%", detail: "65% av ubesvarte anrop kommer fra nye pasienter som ikke kjenner klinikken og ikke ringer tilbake.\n(Kilde: bransjeforskning, flere studier)\nEksempel: 76 × 65% = 49 tapte nye pasienter per uke" },
        { title: "3. Tapt inntekt per måned: Tapte nye pasienter × kundeverdi × 4,33", detail: "Eksempel: 49 × kr 1 500 × 4,33 = kr 318 000/mnd" },
        { title: "4. Tapt livstidsverdi (LTV): Tapte nye pasienter per måned × LTV", detail: "En gjennomsnittlig norsk tannpasient er verdt kr 15 000–25 000 over 5 år. Vi viser både et konservativt og et typisk estimat.\nEksempel: 214 × kr 15 000 = kr 3 210 000 (konservativt)\n          214 × kr 25 000 = kr 5 350 000 (typisk)" },
      ],
    },
    aiStats: {
      eyebrow: "HVORFOR AI",
      headline: "Tallene som driver beslutningen",
      subtitle: "Bedrifter som implementerer AI-systemer ser konkrete resultater fra dag én.",
      stats: [
        {
          value: "47%",
          countTo: 47,
          suffix: "%",
          text: "av innkommende anrop til servicebedrifter blir aldri besvart",
          context: "Kilde: bransjedata for norske klinikker og servicebedrifter",
        },
        {
          value: "< 2 sek",
          countTo: 2,
          suffix: " sek",
          prefix: "< ",
          text: "responstid med AI-resepsjonist — døgnet rundt, hele året",
          context: "Mot gjennomsnittlig 4+ timer uten AI",
        },
        {
          value: "3x",
          countTo: 3,
          suffix: "x",
          text: "flere leads konvertert når oppfølging skjer automatisk innen 5 minutter",
          context: "AI-chatbot fanger og kvalifiserer leads 24/7",
        },
        {
          value: "7 dager",
          countTo: 7,
          suffix: " dager",
          text: "fra signering til live AI-system — fullt integrert med din bedrift",
          context: "Inkluderer oppsett, trening og testing",
        },
      ],
    },
    trust: {
      eyebrow: "SIKKERHET OG TILLIT",
      headline: "Bygget for norske bedrifter. Eid av deg.",
      cards: [
        { title: "GDPR-kompatibel", desc: "All data behandles i henhold til GDPR. Vi bruker kun tredjepartsleverandører med gyldige databehandlingsavtaler." },
        { title: "Kryptert lagring", desc: "TLS/SSL-kryptering under overføring og lagring. Dine data er trygge." },
        { title: "Datasikkerhet", desc: "Data lagres sikkert av sertifiserte leverandører. Tilgang er begrenset til autorisert personell." },
        { title: "Du eier dataene", desc: "All kundedata tilhører deg. Eksportér når som helst." },
      ],
    },
    finalCta: {
      headline: "Klar til å la AI gjøre jobben?",
      subtitle: "Book en uforpliktende samtale. Vi viser deg nøyaktig hva vi kan bygge for din bedrift — og du bestemmer om det er verdt det.",
      cta: "Book en gratis samtale",
      trustLine: "3 måneders minimumsperiode · 60 dagers ROI-garanti · Svar innen 4 timer",
    },
    ticker: [
      "AI-chatbot", "Bookingautomatisering", "CRM-system", "Leadfangst",
      "Tilpassede integrasjoner", "24/7 support", "Inntektsvekst", "AI-arbeidsflyter",
      "Rask oppsett", "Smart automatisering", "Sanntidsanalyse", "Kundeportal",
    ],
    howItWorks: {
      tag: "Prosessen",
      headline: "Slik fungerer det",
      steps: [
        {
          num: "01",
          title: "Uforpliktende samtale",
          desc: "Vi bruker 30 minutter på å forstå bedriften din, kundene dine og hvor AI kan gjøre størst forskjell.",
        },
        {
          num: "02",
          title: "Vi bygger og trener AI-en din på 7 dager",
          desc: "Teamet vårt bygger, trener og tester ditt skreddersydde AI-system. Du får en live forhåndsvisning før lansering.",
        },
        {
          num: "03",
          title: "Du lanserer og vi forbedrer",
          desc: "Gå live med 60 dagers ROI-garanti. Hvis Ekspedenten ikke leverer målbar ROI innen 60 dager, refunderer vi månedsabonnementet.",
        },
      ],
    },
    services: {
      tag: "Hva vi bygger",
      headline1: "Verktøy som",
      headline2: "betaler seg selv",
      subtext: "Hvert produkt er bygget for å generere inntekter, ikke bare se bra ut. Prøv de live demoene nedenfor.",
      monthNote: "måned · 3 måneders minimum",
      getStarted: "Book en gratis samtale",
      liveDemo: "Live interaktiv demo",
      priceCustom: "Skreddersydd pris for hvert prosjekt",
      items: [
        {
          label: "AI Chatbot",
          tag: "Mest populær",
          headline: "Konverter besøkende til kunder mens du sover",
          desc: "En trent AI-assistent som håndterer leads, FAQ, bookinger og oppfølginger — 24/7. Ingen skript, ingen forsinkelser.",
          features: ["Øyeblikkelig leadfangst", "Tilpasset AI-trening", "CRM-integrasjon", "Flerkanal (web, SMS, IG)"],
        },
        {
          label: "Leadgen-system",
          tag: "Leadgenerering",
          headline: "Gjør trafikk til bookede møter. Automatisk.",
          desc: "Et fullt automatisert leadgen-system som fanger, kvalifiserer og ruter innkommende leads — uten manuelt arbeid.",
          features: ["AI-leadfangstskjemaer", "Øyeblikkelig kvalifisering", "Automatisk pipeline-ruting", "E-post og SMS-oppfølging"],
        },
        {
          label: "AI Resepsjonist",
          tag: "Alltid tilgjengelig",
          headline: "AI-resepsjonist som svarer, kvalifiserer og booker — 24/7.",
          desc: "Din AI-resepsjonist håndterer innkommende samtaler, kvalifiserer leads og booker møter — 24/7.",
          features: ["AI-drevet telefonsvar", "Leadkvalifisering per telefon", "Automatisk oppfølging", "CRM-integrasjon"],
        },
        {
          label: "Skreddersydde AI-integrasjoner",
          tag: "Enterprise",
          headline: "Hele arbeidsflyten din, automatisert.",
          desc: "Vi designer og bygger et tilpasset AI-lag som kobles til dine eksisterende verktøy — og gjør timer med manuelt arbeid om til sekunder.",
          features: ["Tilpasset arbeidsflytdesign", "API-integrasjoner", "AI-modelltrening", "Dedikert support"],
        },
      ],
    },
    pricing: {
      tag: "Transparent prissetting",
      headline1: "Enkle, faste priser.",
      headline2: "Ingen overraskelser.",
      subtext: "Minimum 3-måneders partnerskap, deretter månedlig",
      popular: "Mest populær",
      period: "måned",
      foundingPrice: "Lanseringspris",
      setupFee: "kr 10 000 engangsoppsett",
      setupFeeCustom: "Oppsettgebyr avtales",
      bottomNote: "Alle planer inkluderer onboarding-støtte · 60 dagers ROI-garanti · ",
      customBundles: "Tilpassede pakker tilgjengelig",
      priceCustom: "Skreddersydd pris for hvert prosjekt",
      plans: [
        {
          name: "AI Resepsjonist",
          desc: "Svarer telefon, SMS, chat og e-post 24/7. Inkluderer AI Chatbot på nettsiden.",
          features: ["Svarer telefon 24/7", "Håndterer chat og SMS", "Inkl. AI Chatbot", "Automatisk timebestilling", "CRM-integrasjon", "Samtaleopptak"],
          cta: "Book en gratis samtale",
        },
        {
          name: "Lead-Oppfølger",
          desc: "Følger automatisk opp alle leads fra første henvendelse til booket time.",
          features: ["Øyeblikkelig lead-fangst", "Automatisk kvalifisering", "E-post og SMS-oppfølging", "Auto-ruting til pipeline", "CRM-integrasjon", "Månedlig ytelsesrapport"],
          cta: "Book en gratis samtale",
        },
        {
          name: "Full pakke",
          desc: "AI Resepsjonist + Lead-Oppfølger + AI Chatbot — vår anbefalte løsning.",
          features: ["Alt fra AI Resepsjonist", "Alt fra Lead-Oppfølger", "Prioritert onboarding", "Dedikert kontaktperson", "SLA-garanti"],
          cta: "Book en gratis samtale",
        },
      ],
    },
    objections: {
      tag: "Vanlige innvendinger",
      headline1: "Vi har hørt alle",
      headline2: "grunner til å vente.",
      subtext: "Her er de ærlige svarene på spørsmålene vi får hver uke.",
      items: [
        { q: "Det er for dyrt.", a: "Kundene våre ser vanligvis avkastning allerede i første måned. Kostnaden betaler seg selv." },
        { q: "Jeg trenger ikke AI ennå.", a: "Konkurrentene dine bruker det allerede. Hver dag du venter er tapt inntekt." },
        { q: "Jeg kan gjøre dette selv.", a: "Det kan du. Men det tar måneder å bygge og vedlikeholde. Vi deployer på dager." },
        { q: "Jeg er ikke sikker på at det fungerer for min bedrift.", a: "Vi har bygget systemer for alle slags bedrifter. Book en gratis samtale, så forteller vi deg ærlig om det passer." },
        { q: "Jeg trenger å tenke meg om.", a: "Selvfølgelig. Vi sender deg en one-pager med nøyaktig hva vi ville bygget for deg, så du har noe konkret å vurdere. Ingen purring eller press." },
      ],
    },
    faq: {
      hero: {
        pill: "Vanlige spørsmål",
        title1: "Spørsmål klinikker stiller",
        titleEm: "før de signerer",
        titleEnd: ".",
        subtitle: "Ærlige svar på alt vi får spørsmål om, fra GDPR til pris til hvordan Ekspedenten faktisk håndterer en akutt-samtale.",
      },
      tabs: {
        sikkerhet: "Sikkerhet & GDPR",
        drift: "Drift & onboarding",
        pris: "Pris & vilkår",
        pasient: "Pasient-opplevelse",
        teknisk: "Teknisk",
      },
      categories: [
        {
          id: "sikkerhet",
          icon: "01",
          iconClass: "gdpr",
          title: "Sikkerhet & GDPR",
          count: "5 spørsmål",
          questions: [
            {
              q: "Hvor lagres pasientdataene?",
              a: "All pasientdata behandles innenfor EU. CRM-data (samtaler, bookinger, kontaktinfo) lagres i Frankfurt via Supabase. Voice-AI kjører på Azure i Sweden Central. Begge regionene er innenfor EU og dekkes av GDPR.\n\n**Ingen pasientdata forlater EU.** Databehandleravtale (DPA) er tilgjengelig som standard.",
            },
            {
              q: "Spør Ekspedenten om symptomer eller helseopplysninger?",
              a: "Nei. Ekspedenten er bevisst designet for å **ikke** samle inn detaljerte helseopplysninger. Hun spør kun om tjeneste-kategori (tannrens, kontroll, akutt) og foreslår booking.\n\nHvis pasienten frivillig nevner symptomer, gir Ekspedenten kort empati og foreslår akutt-time uten å spørre om mer detaljer. Helseopplysninger og anamnese tas opp av tannlegen på klinikken, der de hører hjemme.",
            },
            {
              q: "Er dere GDPR-compliant?",
              a: "Ja. Hele stacken er GDPR-compliant fra dag én:\n\n• Data lagret i EU (Frankfurt og Sweden Central)\n• Ekspedenten spør ikke om særlige kategorier (helsedata)\n• DPA tilgjengelig for alle klinikker\n• Klare retningslinjer for sletting og tilgang",
            },
            {
              q: "Hva skjer med samtalene? Lagres de?",
              a: "Som default lagrer vi **kun metadata**: tidspunkt, varighet, tjeneste-type, og om det ble booket. Vi lagrer ikke audio eller transkripsjon.\n\nHvis klinikken ønsker å lagre transkripter for kvalitetssikring, krever det opt-in og pasient-samtykke. Da går teksten gjennom redaksjon som maskerer helsetermer før lagring.",
            },
            {
              q: "Kan vi få databehandleravtale (DPA)?",
              a: "Ja, alltid. DPA er en del av standard kontrakt. Den dekker oss som databehandler og deg som behandlingsansvarlig, med klare ansvarslinjer.",
            },
          ],
        },
        {
          id: "drift",
          icon: "02",
          iconClass: "drift",
          title: "Drift & onboarding",
          count: "5 spørsmål",
          questions: [
            {
              q: "Hvor lang tid tar implementering?",
              a: "Live på 7 dager. Onboardingen består av 3 steg:\n\n1. **Kobling** (Dag 1–2): Vi kobler til kalenderen og e-postsystemet ditt.\n2. **Opplæring** (Dag 3–5): Ekspedenten leser klinikkens egne tjenester, priser og åpningstider, og bygger kunnskapsbasen automatisk.\n3. **Test og live** (Dag 6–7): Pilot-samtaler med teamet før vi går live for ekte pasienter.",
            },
            {
              q: "Trenger vi å lære opp Ekspedenten selv?",
              a: "Nei. Vi gjør hele onboardingen for dere. Ekspedenten leser eksisterende e-poster, FAQ og dokumenter, og bygger kunnskapsbasen automatisk. Dere kan justere regler eller fylle inn hull i kunnskap når som helst etter at dere er live.",
            },
            {
              q: "Integrerer Ekspedenten med vårt journalsystem?",
              a: "Ja. Vi integrerer mot de største nordiske journalsystemene: **Opus, Anita og Muntra**. Andre systemer kan tilpasses etter behov. Kontakt oss for spesifikt oppsett.",
            },
            {
              q: "Hva med vårt eksisterende telefonnummer?",
              a: "Du kan beholde det. Vi enten viderekobler innkommende anrop til Ekspedenten, eller gir dere et nytt +47-nummer som videresender direkte. Begge løsninger fungerer. Du velger hva som passer best.",
            },
            {
              q: "Kan vi pause Ekspedenten midlertidig?",
              a: "Ja. Du kan slå Ekspedenten av og på fra dashbordet, for eksempel når resepsjonen er ekstra bemannet, eller hvis dere har spesielle dager. Tilbakestilling tar ett klikk.",
            },
          ],
        },
        {
          id: "pris",
          icon: "03",
          iconClass: "pris",
          title: "Pris & vilkår",
          count: "5 spørsmål",
          questions: [
            {
              q: "Hva koster Ekspedenten?",
              a: "**AI Resepsjonist** (kjernen): kr 11 000/mnd per klinikk. Inkluderer telefon, SMS, chat, AI-chatbot og CRM-dashboard.\n\nTillegg ved behov:\n• Lead-Oppfølger: kr 7 500/mnd\n• Anmeldelse-motor: kr 2 500/mnd\n• Custom stemme: kr 1 500/mnd\n\nEngangsoppsett: kr 10 000 ved første kontrakt. Alle priser eksklusive mva.",
            },
            {
              q: "Hva er founding-pris?",
              a: "Første 5 klinikker som signerer får 50% rabatt i 3 år. Det er en pris vi gir tidlige kunder fordi de hjelper oss å bygge produktet. Vi får tilbakemeldinger, dere får premium-pris.",
            },
            {
              q: "Er det bindingstid?",
              a: "Nei. Månedsoppsigelse. Vi gir 60 dagers ROI-garanti. Hvis Ekspedenten ikke leverer målbar ROI innen de første 60 dagene, refunderer vi månedsabonnementet.",
            },
            {
              q: "Hva er ROI-garantien?",
              a: "Hvis Ekspedenten ikke betaler seg inn (genererer mer verdi i bookinger enn det koster) i løpet av de første 60 dagene, får du pengene tilbake. Vi måler bookinger, missed calls reddet, og sammenligner med tallene fra før dere installerte.",
            },
            {
              q: "Kan flere klinikker dele én løsning?",
              a: "Ja. Hvis du eier en kjede med flere klinikker får du multi-klinikk-rabatt. Hver klinikk har sin egen Ekspedenten med sine egne tjenester, priser og åpningstider, men alle data og analytics samles i ett dashboard.",
            },
          ],
        },
        {
          id: "pasient",
          icon: "04",
          iconClass: "pasient",
          title: "Pasient-opplevelse",
          count: "5 spørsmål",
          questions: [
            {
              q: "Vet pasienten at de snakker med en AI?",
              a: "Ja. Ekspedenten presenterer seg alltid tydelig som AI-resepsjonist når hun tar telefonen. Vi tror tillit kommer fra åpenhet, ikke fra å late som teknologien er noe den ikke er.",
            },
            {
              q: "Hva hvis pasienten ikke vil snakke med AI?",
              a: "Ekspedenten overfører automatisk til mennesket bak hvis pasienten ber om det, eller hvis samtalen krever menneskelig vurdering. Hun jobber med teamet, ikke i stedet for det.",
            },
            {
              q: "Hva med eldre pasienter som ikke er teknisk?",
              a: "Ekspedenten snakker tydelig norsk, i naturlig tempo, med varm stemme. De fleste eldre opplever ikke at hun er \"annerledes\" enn en menneskelig resepsjonist. Pasienter som strever overføres umiddelbart til klinikken når Ekspedenten merker det.",
            },
            {
              q: "Sender Ekspedenten SMS-bekreftelse?",
              a: "Ja. Etter hver booking sender Ekspedenten automatisk SMS med booking-detaljer og lenke til å bekrefte. Hun sender også påminnelser før timen, multi-touch (1 uke / 1 dag / 2 timer før) for å redusere no-shows.",
            },
            {
              q: "Kan Ekspedenten håndtere klager eller akutte saker?",
              a: "For klager: Ekspedenten tar imot klagen empatisk, logger den, og lover at klinikken ringer tilbake innen kort tid. Hun forsøker ikke å løse selv.\n\nFor akutt-saker: Ekspedenten prioriterer akutt-time umiddelbart hvis pasienten beskriver smerte eller nødssituasjon, og sender klinikken et flagg om sak som krever oppfølging.",
            },
          ],
        },
        {
          id: "teknisk",
          icon: "05",
          iconClass: "teknisk",
          title: "Teknisk",
          count: "4 spørsmål",
          questions: [
            {
              q: "Hva slags teknologi bruker dere?",
              a: "Ekspedenten er bygget på LiveKit (voice AI), Azure OpenAI (Sweden Central) for språkmodellen, og Azure Cognitive Services for norsk tale (nb-NO Pernille). Alt EU-hosted, GDPR-trygt.",
            },
            {
              q: "Hva hvis Ekspedenten gjør en feil?",
              a: "Vi overvåker alle samtaler i sanntid. Hvis Ekspedenten bommer (booker feil tid, glemmer info), flagges det automatisk og en av oss ser på det innen samme dag. Dere får varsel og refusjon hvis det forårsaker reelle tap.",
            },
            {
              q: "Kan vi tilpasse hva Ekspedenten sier?",
              a: "Ja. Klinikkens egen tone, fraseologi og prioriteringer mates inn i Ekspedenten under onboarding. Du kan også justere over tid via dashboardet. Endre hva hun sier i akutt-saker, hvilke spørsmål hun prioriterer, og så videre.",
            },
            {
              q: "Hva hvis nettet eller systemet er nede?",
              a: "Vi har 99.9% uptime-garanti. Hvis Ekspedenten er nede, viderekobles anropene automatisk til klinikkens hovednummer eller en backup. Du mister aldri en samtale fordi vår teknologi feiler.",
            },
          ],
        },
      ],
      cta: {
        title1: "Spørsmålet ditt",
        titleEm: "står ikke på listen",
        titleEnd: "?",
        subtitle: "Bestill en uforpliktende kartleggingssamtale. Vi svarer på alt, og setter et konkret tall på hva Ekspedenten ville være verdt for klinikken din.",
        primary: "Bestill demo",
        secondary: "Send e-post",
        secondaryHref: "mailto:hei@ekspedenten.no",
      },
    },
    booking: {
      tag: "Book en samtale",
      headline1: "La oss snakke",
      headline2: "om din bedrift",
      subtext: "Velg et tidspunkt som passer. Synkronisert med min live kalender — ingen dobbeltbookinger.",
      available: "Tilgjengelige sesjoner",
      freeNote: "100 % gratis · ingen forpliktelser",
      freeDesc: "Bare en samtale. Vi forteller deg nøyaktig hva som er mulig for din bedrift.",
      callTypes: [
        { label: "Oppdagelsessamtale", duration: "15 min", desc: "Lær hva vi kan bygge for deg" },
        { label: "Produktdemo",        duration: "30 min", desc: "Se systemet ditt i aksjon" },
        { label: "Strategiøkt",        duration: "45 min", desc: "Full veikart for din bedrift" },
      ],
      bookNow: "Book en gratis samtale",
      popular: "Mest populær",
    },
    contact: {
      tag: "Ta kontakt",
      headline1: "Klar til å automatisere",
      headline2: "din bedrift?",
      subtext: "Fortell oss hva du trenger. Vi kartlegger nøyaktig hvordan vi kan hjelpe.",
      leftHeadline: "La oss bygge noe som fungerer",
      leftDesc: "Enten du trenger ett verktøy eller en komplett AI-transformasjon — vi starter med en samtale, ikke en kontrakt.",
      perks: ["Svar innen 4 timer", "Ingen spam, aldri", "Strategisamtale inkludert"],
      directTitle: "Eller nå oss direkte",
      bookCallLink: "Book en oppdagelsessamtale →",
      labels: { name: "Navn *", email: "E-post *", phone: "Telefon (valgfritt)", business: "Bedriftsnavn", message: "Hva trenger du? *" },
      placeholders: { name: "Ditt navn", email: "du@bedrift.no", phone: "Ditt telefonnummer", business: "Din bedrift", message: "Fortell oss om bedriften din og hva du ønsker å oppnå..." },
      submit: "Send melding",
      sending: "Sender...",
      successTitle: "Melding sendt!",
      successDesc: "Vi tar kontakt innen 4 timer. Sjekk innboksen din.",
      sendAnother: "Send en ny",
      errorTitle: "Noe gikk galt.",
      errorDesc: "Prøv igjen eller send e-post til hei@ekspedenten.no",
      responseNote: "Vi svarer innen 4 timer i arbeidstiden.",
    },
    footer: {
      tagline: "AI-drevne vekstsystemer for bedrifter som vil bevege seg raskere.",
      rights: "Alle rettigheter reservert.",
      followUs: "Følg oss",
      categories: { Company: "Selskapet" },
      links: {
        Company: [
          { label: "Om oss",       href: "/about" },
          { label: "FAQ",          href: "/faq" },
          { label: "Priser",       href: "/pricing" },
          { label: "Book samtale", href: "https://calendly.com/smartcoreaimeeting/new-meeting", target: "_blank" },
        ],
      },
    },
    chat: {
      welcome: "Hei! Jeg er Ekspedenten, den digitale assistenten her på nettsiden 👋\n\nJeg kan fortelle deg om tjenestene og prisene våre, eller hjelpe deg å finne ut hvilken løsning som passer best for din bedrift.\n\nHva kan jeg hjelpe deg med?",
      quickReplies: ["Hvilke tjenester tilbyr dere?", "Hva koster det?", "Hvor raskt kan vi starte?"],
      placeholder: "Spør meg om hva som helst...",
      poweredBy: "Drevet av Ekspedenten · svar kan variere",
      teaserPre: "Klar for å",
      teaserEm: "fikse lekkasjen",
      teaserPost: "?",
      openLabel: "Åpne chat med Ekspedenten",
      closeLabel: "Lukk chat",
    },
    pricingPage: {
      back: "← Tilbake",
      title: "Velg din plan",
      subtitle: "Minimum 3-måneders partnerskap, deretter månedlig",
      popular: "Mest populær",
      period: "mnd",
      foundingPrice: "Lanseringspris",
      setupFee: "kr 10 000 engangsoppsett",
      setupFeeCustom: "Oppsettgebyr avtales",
      priceCustom: "Skreddersydd pris for hvert prosjekt",
      getStarted: "Book en gratis samtale",
      bookCall: "Book en gratis samtale",
      bottomNote: "Alle planer inkluderer onboardingstøtte · 60 dagers ROI-garanti",
      urgencyBarPrefix: "Kun ",
      urgencyBarSuffix: " grunnleggerplasser tilgjengelig. Prisene går tilbake til standardpris når fylt.",
      heroEyebrow: "PRISER",
      heroHeadline1: "Enkle priser.",
      heroHeadline2: "Ekte verdi.",
      heroSubtitle: "Ingen skjulte kostnader. Ingen lange kontrakter. Bare AI-systemer som betaler seg selv — eller pengene tilbake.",
      trustItems: ["60 dagers ROI-garanti", "Pengene-tilbake-garanti", "Live på 7 dager"],
      foundingBadge: "Lanseringspris",
      planNames: ["AI Resepsjonist", "Lead-Oppfølger", "Full pakke"],
      planTaglines: ["Din alltid-tilgjengelige AI-resepsjonist", "Automatisk oppfølging av leads", "Alt i én pakke"],
      guarantee: {
        items: [
          { title: "60 dagers ROI-garanti",     desc: "Hvis Ekspedenten ikke leverer målbar ROI innen 60 dager, refunderer vi månedsabonnementet." },
          { title: "Pengene-tilbake-garanti",   desc: "Refusjon av månedsabonnementet hvis vi ikke når 60-dagers ROI-målet. Ingen spørsmål, ingen friksjon." },
          { title: "Live på 7 dager",           desc: "Fra signering til produksjon — eller du betaler ikke" },
          { title: "GDPR-kompatibel",           desc: "All data behandles i henhold til GDPR. Du eier dataene." },
        ],
      },
      compare: {
        eyebrow: "SAMMENLIGNING",
        headline: "Med Ekspedenten vs. uten",
        subtitle: "Ekte forskjeller for din bedrift — ikke floskler.",
        colArea: "Område",
        colWithout: "Uten AI",
        colWith: "Med Ekspedenten",
        rows: [
          { area: "Tilgjengelighet",                 without: "Åpningstider",            with: "24/7 uten stopp"           },
          { area: "Responstid på leads",             without: "Timer — dager",           with: "Under 2 sekunder"          },
          { area: "Bookinger utenom arbeidstid",     without: "Går tapt",                with: "Fanges automatisk"         },
          { area: "Oppfølging av leads",             without: "Manuelt, ofte glemt",     with: "Automatisk i 7 dager"      },
          { area: "Oppsett",                         without: "Måneder av utvikling",    with: "Live på 7 dager"           },
          { area: "Kostnad per lead",                without: "Høy og uforutsigbar",     with: "Fast månedspris"           },
        ],
      },
      faqTeaser: {
        headline: "Spørsmål?",
        desc: "Vi har samlet de vanligste spørsmålene om oppsett, data, oppfølging og mer.",
        cta: "Se ofte stilte spørsmål →",
      },
      plans: [
        {
          desc: "Svarer telefon, SMS, chat og e-post 24/7. Inkluderer AI Chatbot på nettsiden.",
          features: ["Svarer telefon 24/7", "Håndterer chat og SMS", "Inkl. AI Chatbot", "Automatisk timebestilling", "CRM-integrasjon", "Samtaleopptak"],
        },
        {
          desc: "Følger automatisk opp alle leads fra første henvendelse til booket time.",
          features: ["Øyeblikkelig lead-fangst", "Automatisk kvalifisering", "E-post og SMS-oppfølging", "Auto-ruting til pipeline", "CRM-integrasjon", "Månedlig ytelsesrapport"],
        },
        {
          desc: "AI Resepsjonist + Lead-Oppfølger + AI Chatbot — vår anbefalte løsning.",
          features: ["Alt fra AI Resepsjonist", "Alt fra Lead-Oppfølger", "Prioritert onboarding", "Dedikert kontaktperson", "SLA-garanti"],
        },
      ],
    },
    thankYou: {
      title: "Takk skal du ha! 🎉",
      subtitle: "Betalingen din var vellykket. Vi tar kontakt innen 4 timer.",
      backButton: "Tilbake til forsiden",
    },
    about: {
      hero: {
        tag: "Vår historie",
        headline1: "To bestekamerater.",
        headline2: "Én misjon.",
        subtext: "Vi startet Ekspedenten fordi vi så det samme problemet igjen og igjen: tannklinikker mistet pasienter til ubesvarte anrop — mens AI-verktøyene som kunne hjulpet var bygget for enterprise-selskaper, ikke for dem.",
      },
      team: {
        tag: "Teamet",
        headline: "Menneskene bak Ekspedenten",
        members: [
          {
            name: "Henrik Andreassen Bøe",
            role: "MEDGRÜNDER & CEO",
            bio: "Entreprenør fra Bergen, opptatt av at teknologi faktisk skal skape resultater — ikke bare imponere. Grunnla Ekspedenten sammen med Aleksander etter å ha sett hvor mange bedrifter som betaler for AI som aldri leverer. Driver det kommersielle: kundekontakt, strategi, vekst.",
            email: "henrik@ekspedenten.no",
            linkedin: "https://www.linkedin.com/in/henrik-andreassen-b%C3%B8e",
          },
          {
            name: "Aleksander Nordeide Bjørndal",
            role: "MEDGRÜNDER & CTO",
            bio: "Selvlært utvikler fra Bergen med en lidenskap for å bygge AI-systemer som faktisk fungerer. Grunnla Ekspedenten sammen med Henrik fordi han var lei av å se bedrifter betale for teknologi som aldri leverte. Driver det tekniske: bygging, integrasjoner, AI-trening.",
            email: "aleksander@ekspedenten.no",
            linkedin: "https://www.linkedin.com/in/aleksander-bj%C3%B8rndal/",
          },
        ],
      },
      story: {
        tag: "Vår historie",
        headline: "Slik startet det",
        paragraphs: [
          "Ekspedenten ble grunnlagt i 2026 i Bergen, Norge av to bestekamerater som så det samme problemet overalt: små og mellomstore bedrifter ble etterlatt i AI-revolusjonen. De store selskapene hadde budsjettene. For alle andre var AI en luksus de ikke hadde råd til.",
          "Vi bygde Ekspedenten for å endre det. Ingen seks måneders implementeringsprosjekter. Ingen teknisk sjargong. Bare AI-systemer som kobles inn i bedriften din og begynner å jobbe — på dager, ikke måneder.",
          "Modellen vår er bygget på forpliktelse: et engangs oppsettgebyr, en fast månedspris, og et minimum tre måneders samarbeid — fordi ekte resultater tar tid. Vi selger ikke raske løsninger. Vi bygger systemer som vokser med deg.",
          "I dag bygger vi AI-chatboter, leadgenereringssystemer og AI-resepsjonister for skandinaviske tannklinikker — alt fra automatisert booking til leadkvalifisering som kjører 24/7.",
          "Teamet vårt er lite med vilje. Vi bygger heller færre systemer som faktisk driver inntekter, enn å selge dashboards ingen åpner. Vi jobber kun med bedrifter der AI kan levere målbar avkastning, fordi fokus er slik man bygger tillit.",
        ],
      },
      values: [
        { title: "Fokus over alt", desc: "Vi jobber med et begrenset antall kunder om gangen, slik at alle bedrifter får vår fulle oppmerksomhet." },
        { title: "Resultater, ikke dashboards", desc: "Vi måler arbeidet vårt i inntekter generert, ikke tomme tall. Ingen fyll, ingen dikkedarer." },
        { title: "Lite team, med vilje", desc: "Vi holder oss slanke med vilje. Færre kunder betyr dypere arbeid og bedre systemer." },
      ],
      cta: {
        headline: "Klar for en samtale?",
        subtitle: "La oss finne ut om AI kan tilføre målbar verdi til din bedrift — ingen salgspress.",
        button: "Book en gratis samtale →",
        trustLine: "3 måneders minimumsperiode · 60 dagers ROI-garanti · Svar innen 4 timer",
      },
    },
    calculator: {
      title: "Hvor mye inntekt taper klinikken din?",
      subtitle: "Oppgi anropsvolum og se den reelle kostnaden av tapte anrop.",
      labelCalls: "Innkommende anrop per uke",
      labelMissed: "Prosent av anropene som ikke besvares",
      labelValue: "Gjennomsnittlig kundeverdi (første besøk, kr)",
      resultMainLabel: "Tapt inntekt per måned (nye pasienter)",
      resultMainSub: "Basert på første-besøksverdi",
      resultLtvLabel: "Potensielt tapt livstidsverdi (LTV)",
      resultLtvLowLabel: "Konservativt:",
      resultLtvHighLabel: "Typisk:",
      resultLtvSub: "Basert på gjennomsnittlig 5-års pasient-LTV for norske tannklinikker (kr 15 000–25 000)",
      breakdownTitle: "Beregningsforklaring",
      breakdownLine1: "Tapte anrop per uke: {calls} × {pct}% = {missed} tapte anrop",
      breakdownLine2: "Tapte nye pasienter per uke: {missed} × 65% = {newPat} nye pasienter",
      breakdownLine2note: "65% av ubesvarte anrop kommer fra nye pasienter som ikke kjenner klinikken og ikke ringer tilbake. (Kilde: bransjeforskning, flere studier)",
      breakdownLine3: "Tapt inntekt per måned: {newPat} × {val} × 4,33 = {monthly}",
      breakdownLine4a: "Konservativt LTV: {monthly_new} × 15 000 = {ltvLow}",
      breakdownLine4b: "Typisk LTV: {monthly_new} × 25 000 = {ltvHigh}",
      breakdownLine4note: "En gjennomsnittlig norsk tannpasient er verdt kr 15 000–25 000 over 5 år.",
      heroHook: "Hvor mye tid bruker du på telefoner, booking og oppfølging i dag?",
      heroParagraph: "En typisk tannklinikk bruker 10–15 timer i uken på telefon, booking og oppfølging. Ekspedenten reduserer det dramatisk.",
      heroCta: "Se hva du kan spare →",
      heroBox1Label: "TIMER SPART PER MÅNED",
      heroBox1Value: "47",
      heroBox1Sub: "timer spart per måned",
      heroBox2Label: "I EKSTRA BOOKINGER",
      heroBox2Value: "kr 51 000",
      heroBox2Sub: "i ekstra bookinger",
      cta: "Book en gratis samtale for å komme i gang →",
      backLink: "← Tilbake",
    },
    diagnose: {
      idle: {
        eyebrow: "Klar når du er",
        introPre: "Vi regner ut",
        introEm: "fire lekkasjekilder",
        introPost: " for klinikken din, og legger sammen til ett årstall. Hva ubesvarte anrop, sovende pasienter, no-shows og webleads utenom åpningstid faktisk koster dere i året.",
        items: [
          { title: "Ubesvarte anrop", desc: "Pasienter som ringer, men ikke får svar, og som typisk ringer neste klinikk på lista." },
          { title: "Sovende pasienter", desc: "Personer i basen som ikke har vært inne på 18+ måneder. En andel kan reaktiveres med strukturert oppfølging." },
          { title: "No-shows", desc: "Bookede pasienter som ikke møter. SMS-bekreftelse og automatisk oppfølging reduserer typisk 38–40%." },
          { title: "Webleads utenom åpningstid", desc: "Henvendelser via skjema/chat når dere er stengt. Flertallet finner en annen klinikk før neste virkedag." },
        ],
        hint: "Trykk «Kjør diagnosen» når du er klar, du får tallet for klinikken din i sekundet etter.",
      },
      showFormula: "Vis hvordan vi regner",
      hideFormula: "Skjul hvordan vi regner",
    },
    personvern: {
      eyebrow: "Juridisk",
      headline: "Personvernerklæring",
      updated: "Sist oppdatert: 12. mai 2026",
      reviewed: "Sist gjennomgått av juridisk: N/A (etter pilot)",
      scope: "Dekker ekspedenten.no og app.ekspedenten.no.",
      tocLabel: "På denne siden",
      toc: [
        { id: "innledning", title: "1. Innledning" },
        { id: "data", title: "2. Hva slags data vi samler" },
        { id: "lagring", title: "3. Hvor data lagres (sub-processors)" },
        { id: "grunnlag", title: "4. Lovlig grunnlag (GDPR Art. 6)" },
        { id: "lagringstid", title: "5. Lagringstid" },
        { id: "rettigheter", title: "6. Dine rettigheter (GDPR)" },
        { id: "cookies", title: "7. Cookies" },
        { id: "endringer", title: "8. Endringer" },
        { id: "datatilsynet", title: "9. Datatilsynet" },
      ],
      intro: {
        title: "1. Innledning",
        paragraphs: [
          "Ekspedenten AS (under registrering) er et norsk selskap med base i Bergen. Vi leverer en AI-basert digital ekspedient til tannklinikker. Ekspedenten svarer på telefon, og en CRM-plattform håndterer leads, oppfølging og bookinger.",
          "Denne erklæringen forklarer hvilke personopplysninger vi behandler, hvorfor, og hvilke rettigheter du har. Den dekker både ekspedenten.no (markedsføring og demo) og app.ekspedenten.no (CRM-plattformen).",
        ],
        contactLabel: "Kontakt:",
        contacts: [
          { label: "Generelt", emails: ["aleksander@ekspedenten.no", "henrik@ekspedenten.no"] },
        ],
      },
      data: {
        title: "2. Hva slags data vi samler",
        groups: [
          {
            heading: "Nettside-besøkende (ekspedenten.no)",
            bullets: [
              "Demo-popup: navn, e-post, telefon, klinikk-navn",
              "Diagnose-skjema: e-post og tallene du fyller inn i kalkulatoren",
            ],
          },
          {
            heading: "CRM-brukere (app.ekspedenten.no)",
            bullets: [
              "Brukerprofil og innloggings-credentials",
              "Klinikk-tilhørighet og rolle",
            ],
          },
          {
            heading: "Pasienter som ringer Ekspedenten",
            bullets: [
              "Telefonnummer (fra anropet)",
              "Tekst-transcript av samtalen (maks 30 dager)",
              "Booking-data (timeønske, valgt time, e.l.)",
              "Lyd lagres ikke, kun tekst-transcript",
            ],
          },
        ],
        role: "Vi behandler pasientdata på vegne av klinikken. Klinikken er behandlingsansvarlig (data controller); Ekspedenten er databehandler (data processor). En databehandleravtale (DPA) signeres med hver klinikk før produksjonssetting.",
      },
      storage: {
        title: "3. Hvor data lagres (sub-processors)",
        intro: "Vi bruker følgende sub-processors. All overføring skjer kryptert (TLS), og pasientdata holdes innenfor EU/EØS.",
        headers: ["Leverandør", "Lokasjon", "Formål"],
        rows: [
          { provider: "Supabase", location: "Frankfurt, EU", purpose: "Database (brukere, leads, CRM, transcripts)" },
          { provider: "Microsoft Azure", location: "Sweden Central, EU", purpose: "AI-språkmodell, tale-til-tekst (STT) og tekst-til-tale (TTS)" },
          { provider: "Leyr.io", location: "EU", purpose: "Booking-integrasjon mot tannlege-journalsystemer" },
          { provider: "Vercel", location: "US (DPF-sertifisert)", purpose: "Statisk nettside-hosting (ingen pasient- eller helsedata)" },
          { provider: "LiveKit Cloud", location: "EU-region", purpose: "Sanntid-audio for Ekspedenten-samtaler" },
          { provider: "DIDWW", location: "Irland, EU", purpose: "Telefoni-leverandør (aktiveres ved første pilot)" },
        ],
      },
      legal: {
        title: "4. Lovlig grunnlag (GDPR Art. 6)",
        intro: "Vi behandler personopplysninger på følgende grunnlag:",
        items: [
          { label: "Nettside-leads (demo, diagnose)", basis: "Samtykke", article: "Art. 6 (1) (a)", desc: "Du fyller frivillig ut skjemaet for å bli kontaktet." },
          { label: "CRM-brukere (klinikk-ansatte)", basis: "Avtale", article: "Art. 6 (1) (b)", desc: "Behandlingen er nødvendig for å levere tjenesten klinikken har bestilt." },
          { label: "Pasientdata (transcripts, booking)", basis: "Klinikkens behandlingsgrunnlag", article: "Art. 6 (1) (b) / (c)", desc: "Typisk avtale om helsehjelp eller rettslig forpliktelse til journalføring. Vi behandler kun på dokumentert instruks fra klinikken." },
        ],
      },
      retention: {
        title: "5. Lagringstid",
        bullets: [
          "Leads (demo, diagnose): inntil 24 måneder hvis ikke konvertert til avtale, deretter slettes de.",
          "Samtale-transcripts: maks 30 dager, deretter automatisk sletting.",
          "Booking-data: så lenge avtalen mellom klinikken og Ekspedenten varer.",
          "Ved avtalens opphør slettes klinikk- og pasientdata innen 90 dager (med mindre lov pålegger lengre lagring).",
        ],
      },
      rights: {
        title: "6. Dine rettigheter (GDPR)",
        intro: "Under GDPR har du rett til:",
        bullets: [
          "Innsyn i hvilke opplysninger vi har om deg",
          "Retting av feil eller ufullstendige data",
          "Sletting (\"retten til å bli glemt\")",
          "Begrensning av behandling",
          "Dataportabilitet: få dataene i et maskinlesbart format",
          "Å protestere mot behandlingen",
        ],
        howBefore: "For pasientdata må forespørsel rettes til klinikken (som er behandlingsansvarlig). For nettside- og CRM-data, send e-post til ",
        email: "aleksander@ekspedenten.no",
        howAfter: ". Vi svarer innen 30 dager.",
        complaint: "Du kan også klage til Datatilsynet hvis du mener vi behandler personopplysninger i strid med GDPR.",
      },
      cookies: {
        title: "7. Cookies",
        body: "Vi bruker kun tekniske cookies for autentisering og nettsidens funksjonalitet. Vi setter ingen sporings-cookies og bruker ikke analytics-verktøy som Google Analytics. Hvis dette endrer seg, vil erklæringen oppdateres og samtykke innhentes der det kreves.",
      },
      changes: {
        title: "8. Endringer",
        body: "Vi kan oppdatere denne erklæringen ved behov. Vesentlige endringer varsles via banner på nettsiden og e-post til registrerte brukere. Den til enhver tid gjeldende versjonen ligger alltid på denne siden, med dato for siste oppdatering.",
      },
      authority: {
        title: "9. Datatilsynet",
        body: "Du har rett til å klage til Datatilsynet hvis du mener vi behandler personopplysninger i strid med GDPR.",
        linkLabel: "datatilsynet.no",
        linkHref: "https://www.datatilsynet.no",
      },
    },
    bookCall: {
      label: "Book en gratis samtale →",
    },
    cookies: {
      banner: {
        title: "Cookies",
        body: "Vi bruker kun nødvendige tekniske cookies for innlogging og nettsidens funksjonalitet. Vi sporer deg ikke.",
        policyLink: "Les mer i personvernerklæringen",
        button: "Forstått",
        ariaLabel: "Cookie-melding",
      },
      settingsLink: "Cookie-innstillinger",
    },
    testimonialWidget: {
      label: "KONTINUERLIG",
      value: "7 DAGER",
      sub: "automatisk oppfølging",
    },
    solutionWidget: {
      label: "Kontinuerlig oppfølging",
      value: "7",
      unit: "dager",
    },
    pricingSize: {
      toggleLabel: "Velg størrelse på din klinikk",
      small: "Liten klinikk",
      medium: "Medium klinikk",
      large: "Stor klinikk",
      inclVat: "ink. MVA",
    },
    offering: {
      brand: "Ekspedenten",
      brandSub: "standard-pakke",
      metaEyebrow: "For norske tannklinikker",
      metaVersion: "Mai 2026 · Versjon 1.0",
      oneLinerLabel: "Det vi gjør",
      oneLinerLead: "AI-resepsjonist for norske tannklinikker. Svarer 24/7, booker direkte i ",
      oneLinerSystems: ["Opus", "Muntra", "Anita"],
      oneLinerJoiner: ", ",
      oneLinerFinalJoiner: " og ",
      oneLinerTail: ", så ingen pasient mistes til konkurrenten.",
      includesTitle: "Dette får dere",
      includes: [
        "Norsktalende AI som tar inngående anrop 24/7 — helger og helligdager",
        "Booking direkte i journalsystemet (Opus, Muntra eller Anita)",
        "Automatisk SMS-bekreftelse til pasient",
        "Dashboard med samtaler, transcripts, bookinger og missed calls",
        "Manuell opplæring fra Henrik eller Aleksander første uke",
      ],
      excludesTitle: "Dette gjør vi ikke",
      excludesTitleEm: "ikke",
      excludes: [
        "Utgående anrop — kun innkommende",
        "Medisinske spørsmål eller symptom-rådgivning",
        "SMS-kampanjer eller markedsføring",
        "Pasient-journal-håndtering (dere eier journalen)",
      ],
      priceHeading: "Pris",
      pricingTag: "Founding",
      pricingMonthlyLabel: "Månedlig — første 10 klinikker",
      pricingStrikethrough: "kr 10 000 / mnd",
      pricingPrice: "kr 6 900",
      pricingPriceSuffix: "/ mnd",
      pricingStartupLabel: "Oppstart",
      pricingStartupPrice: "kr 7 500",
      pricingStartupSuffix: "engangs",
      pricingLockLabel: "Binding",
      pricingLockValue: "3 mnd",
      pricingNote: "Etter 3 måneders binding: månedlig oppsigelse med 30 dagers varsel. Founding-pris låst i 12 måneder fra signering — øker ikke selv etter de 10 første klinikkene er fylt.",
      onboardingHeading: "Onboarding — 7 virkedager fra forutsetninger på plass",
      timelineDays: [
        { label: "Dag 1",    text: "Kickoff-samtale" },
        { label: "Dag 2–3",  text: "AI-trening" },
        { label: "Dag 4",    text: "Journalsystem-integrasjon" },
        { label: "Dag 5",    text: "Telefoni-oppsett" },
        { label: "Dag 6",    text: "Test og finjustering" },
        { label: "Dag 7",    text: "Live" },
        { label: "Dag 8+",   text: "Henrik/Aleksander shadower" },
      ],
      successHeading: "Suksess-milepæler",
      milestones: [
        { day: "Dag 30 · Innfasing",   textStrong: "60%+ av anrop håndtert",         textRest: " av Ekspedenten uten å eskalere til klinikken." },
        { day: "Dag 60 · ROI-sjekk",   textStrong: "Måling vs baseline",             textRest: " — flere bookinger, færre missed calls. Garanti utløper." },
        { day: "Dag 90 · Full rapport", textStrong: "Total verdi generert i kr",     textRest: ", antall bookinger, no-shows redusert." },
      ],
      safetyHeading: "Sikkerhet for klinikken",
      guarantees: [
        { strong: "60 dagers ROI-garanti",       rest: " — refusjon hvis ikke målbar avkastning" },
        { strong: "Live på 7 virkedager",        rest: " — ellers første måned gratis" },
        { strong: "3 mnd binding",               rest: ", deretter månedlig oppsigelse med 30 dagers varsel" },
        { strong: "Pasientdata slettes",         rest: " innen 30 dager etter forespørsel" },
        { strong: "GDPR-trygt",                  rest: " — all data lagret i EU (Frankfurt)" },
        { strong: "Klinikken eier dataen",       rest: " — full eksport ved oppsigelse" },
      ],
      contactLabel: "Kontakt",
      contactCtoLabel: "CTO",
      contact1Name: "Henrik Andreassen Bøe",
      contact1Email: "henrik@ekspedenten.no",
      contact2Name: "Aleksander Bjørndal",
      contact2Email: "aleksander@ekspedenten.no",
      contactCta: "ekspedenten.no →",
    },
  },
} as const;

export type Translations = typeof translations.en | typeof translations.no;

// ─── Context ──────────────────────────────────────────────────────────────────

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");

  useEffect(() => {
    // 1. Respect explicit user choice persisted in localStorage
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "no") {
      setLangState(saved);
      return;
    }
    // 2. Fall back to cookie set by middleware from Accept-Language header
    const cookieLang = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("defaultLang="))
      ?.split("=")[1] as Lang | undefined;
    if (cookieLang === "en" || cookieLang === "no") {
      setLangState(cookieLang);
    }
    // 3. No signal → stays "no" (Norwegian default)
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    // Persist explicit choice in cookie so middleware sees it on next request
    document.cookie = `lang=${l};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations.en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// ─── Price formatter ──────────────────────────────────────────────────────────
// Converts a EUR amount to the display string for the current language.
// lang="en" → "€699"   lang="no" → "kr 8 250"  (1 EUR ≈ 11.80 NOK, rounded to nearest 10)

export function formatPrice(eur: number, lang: Lang): string {
  if (lang === "no") {
    const nok = Math.round((eur * 11.80) / 10) * 10;
    // nb-NO locale uses non-breaking space as thousands separator → replace with regular space
    const formatted = nok.toLocaleString("nb-NO").replace(/\u00A0/g, "\u0020");
    return `kr ${formatted}`;
  }
  return `€${eur.toLocaleString("en-US")}`;
}

export function formatPriceWithPeriod(eur: number, lang: Lang): string {
  const price = formatPrice(eur, lang);
  const period = lang === "no" ? "/mnd" : "/mo";
  return `${price}${period}`;
}
