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
      headline1: "Your business,",
      headline2: "runs itself.",
      subtext: "AI chatbots, booking automation, CRM systems — fully integrated, deployed in days. Not months.",
      ctaPrimary: "Book a free call",
      ctaSecondary: "See how it works",
      ctaTryAria: "Try Aria →",
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
      subNew: "Aria answers the phone, sends reminders to existing patients, and follows up with website visitors who didn't book. Live in 7 days.",
      trustLine: "3-month minimum · 14-day money-back guarantee",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      headline: "Service businesses lose customers every day — without knowing it",
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
    solution: {
      eyebrow: "THE SOLUTION",
      headline: "Zero missed enquiries. Zero lost patients.",
      headline1: "Zero missed enquiries.",
      headline2: "Zero lost patients.",
      subtitle: "Responds in your business's tone, qualifies leads automatically — with full visibility into everything.",
      modules: [
        {
          label: "AI Receptionist",
          title: "Your customers get answers in seconds. Not hours.",
          desc: "Aria answers incoming calls in your business's tone — checks availability, books appointments and confirms with the customer. Your team only steps in when needed.",
          features: ["Responds within 2 seconds", "Books directly into the calendar", "Sends SMS confirmation", "Transfers to you when needed"],
        },
        {
          label: "AI Chatbot",
          title: "Capture leads from your website — around the clock.",
          desc: "Answers questions, qualifies inquiries and books meetings automatically. Without you lifting a finger.",
          features: ["Tailored to your business", "Multi-channel (web, Instagram, SMS)", "CRM integration", "Unlimited conversations"],
        },
        {
          label: "Lead Follow-up",
          title: "Automatic follow-up until they book — or say no.",
          desc: "SMS, email and chat for 7 days. Personal tone, synced with CRM. No leads fall through the cracks.",
          features: ["Personal and natural tone", "Synced with CRM", "Multi-channel follow-up"],
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
      headline: "How much time do you spend on calls, booking and follow-ups today?",
      subtitle: "A typical dental clinic spends 10–15 hours per week on calls, bookings, and follow-ups. Ekspedenten dramatically reduces that.",
      savingValue: "47",
      savingLabel: "hours saved per month",
      bookingValue: "kr 51 000",
      bookingLabel: "in extra bookings",
      cta: "See what you can save →",
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
      trustLine: "3-month minimum · 14-day money-back guarantee · Response within 4 hours",
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
          desc: "Go live with a 14-day free trial. If you're not satisfied, you get a full refund — no questions asked.",
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
      bottomNote: "All plans include onboarding support · 14-day money-back guarantee · ",
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
      title: "Frequently Asked Questions",
      subtitle: "Honest answers to everything your dental clinic needs to know before getting started.",
      sections: [
        {
          q: "What does it cost, and what do we get?",
          a: "We offer three packages for dental clinics. AI Chatbot at NOK 4,710/mo captures leads from your website 24/7. AI Receptionist at NOK 9,430/mo answers incoming calls, books appointments and follows up with patients automatically. Leadgen System at NOK 5,890/mo automates the full lead process from enquiry to booked appointment. All packages include a one-time setup fee of NOK 10,000. What you get in return: fewer missed calls, more booked appointments, and a reception that never takes a break. Most clinics recoup the investment within the first month through appointments that would otherwise have been lost.",
        },
        {
          q: "What if the AI answers incorrectly or misunderstands?",
          a: "Aria is trained specifically for your clinic — your services, opening hours, prices and procedures. If Aria is uncertain about something, she automatically escalates to a human instead of guessing. You have full visibility into all conversations in the dashboard and can adjust responses and rules at any time. We continuously monitor and improve the AI based on real conversations. During the first weeks we actively fine-tune together with you to make sure Aria answers correctly.",
        },
        {
          q: "How quickly are we up and running?",
          a: "7 business days from signing to a live system. Days 1–2: we gather information about your clinic — services, prices, opening hours, common questions. Days 3–5: we build and train Aria on your clinic. Days 6–7: testing together with you and launch. You don't need to do anything technical — we handle everything.",
        },
        {
          q: "What if it doesn't work — can we cancel?",
          a: "We offer a 14-day money-back guarantee. If you're not satisfied within the first 14 days, you get a full refund — no questions asked. After that there is a 3-month minimum period, because real results take time to build. After the minimum period you can cancel with 30 days' notice. We believe in proving value, not locking you in.",
        },
        {
          q: "Which systems do you integrate with?",
          a: "We integrate with most systems used by Norwegian dental clinics. For appointment booking and practice management we have experience with Opus Dental and can adapt integrations for other systems such as Dentica and Plandent. We also connect with Google Calendar, Outlook, and most calendar solutions. For CRM we support HubSpot, Pipedrive and others via API. Have a specific system? Contact us and we'll confirm compatibility — it takes 5 minutes.",
        },
        {
          q: "What about GDPR, patient data and confidentiality?",
          a: "Important clarification: Aria does NOT handle patient records, diagnoses or medical information. Aria handles only administrative communication — appointment booking, opening hours, prices and general questions. All data is processed in accordance with GDPR. For clinics with strict requirements for data storage within the EU/EEA we recommend an individual assessment — we are happy to help with this.",
        },
        {
          q: "Who owns the data, and what happens to it when we leave?",
          a: "You own all data — conversation logs, contact information, booking history and reports. We have no rights to your data. Upon cancellation we export all data to you in standard format (CSV/JSON) and delete it from our systems within 30 days. No data is retained after cancellation.",
        },
        {
          q: "What does Aria sound like? Can we hear a demo?",
          a: "Aria communicates primarily via text — website chat, SMS and email. For voice-based reception, Aria uses a natural Norwegian voice adapted to the clinic's tone. The best way to experience Aria is to try our chatbot directly — click the chat icon at the bottom right of this page. For a full demo of the voice system, book a free 15-minute call with us.",
        },
        {
          q: "What about older or technology-averse patients?",
          a: "Aria is designed to be simple and natural to talk to — just like a regular receptionist. Patients don't need to download anything or learn new technology. They call the clinic as usual, and Aria answers and books the appointment. For chat enquiries the interface is as simple as sending an SMS. And if a patient prefers to speak with a human, Aria transfers the call immediately. No one is left behind.",
        },
        {
          q: "Will this take the receptionist's job?",
          a: "No — Aria doesn't replace the receptionist, she takes the load off. Most clinics we speak to have receptionists drowning in phone calls, repetitive questions and booking admin. Aria takes over that routine work so the receptionist can focus on the patients in the clinic, handle complex enquiries and provide better service. Think of Aria as an extra colleague who is never sick, never takes lunch, and never forgets to follow up.",
        },
        {
          q: "Which languages are supported?",
          a: "Aria supports Norwegian (bokmål and nynorsk), English, and over 50 other languages. She automatically detects which language the patient is writing or speaking in and responds in the same language. For dental clinics in Norway, Norwegian and English are the most common, but Aria also handles Arabic, Polish, Somali and other languages that are common among patients in Norway.",
        },
        {
          q: "What is the uptime guarantee / SLA?",
          a: "We guarantee 99.9% uptime. Aria runs 24/7 on redundant infrastructure. In the unlikely event of downtime, we notify you immediately and work to resolve it within 4 hours. In practice this means Aria is available to your patients around the clock, all year — including weekends, public holidays and vacations.",
        },
        {
          q: "Can we control what Aria answers and what she doesn't?",
          a: "Absolutely. You have full control. You decide which services Aria can book, which questions she answers, and when she should escalate to a human. We set up rules together during onboarding — for example that Aria should never give medical advice, that certain types of enquiry should always go to the receptionist, or that booking is only available for specific treatments. You can adjust the rules at any time via the dashboard.",
        },
        {
          q: "What happens with emergency enquiries (pain, swelling, trauma)?",
          a: "Aria is trained to recognise acute enquiries. If a patient describes acute symptoms such as severe pain, swelling, bleeding or trauma, Aria will NOT attempt to handle this herself. She immediately escalates to the clinic via SMS alert to the responsible person and gives the patient a clear message to call the clinic directly or visit the emergency room if it is outside opening hours. Emergency handling is always priority one in the system.",
        },
      ],
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
      welcome: "Hey! I'm Aria, Ekspedenten's assistant 👋\n\nI can tell you about our services and pricing, or help you figure out which solution fits your business best.\n\nWhat can I help you with?",
      quickReplies: ["What services do you offer?", "How much does it cost?", "How fast can we get started?"],
      placeholder: "Ask me anything...",
      poweredBy: "Powered by Ekspedenten · responses may vary",
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
      bottomNote: "All plans include onboarding support · 14-day money-back guarantee",
      urgencyBarPrefix: "Only ",
      urgencyBarSuffix: " founding-client spots available. Prices revert to standard pricing once filled.",
      heroEyebrow: "PRICING",
      heroHeadline1: "Simple pricing.",
      heroHeadline2: "Real value.",
      heroSubtitle: "No hidden costs. No long contracts. Just AI systems that pay for themselves — or your money back.",
      trustItems: ["14-day trial", "Money-back guarantee", "Live in 7 days"],
      foundingBadge: "Founding price",
      planNames: ["AI Receptionist", "Lead Follow-up", "Full Package"],
      planTaglines: ["Your always-on AI receptionist", "Automatic lead follow-up", "Everything in one package"],
      guarantee: {
        items: [
          { title: "14-day trial", desc: "Try the full system for free with no commitment" },
          { title: "Money-back guarantee", desc: "Not satisfied within 14 days? Full refund, no questions asked" },
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
        trustLine: "No commitment · 14-day money-back guarantee · Response within 4 hours",
      },
    },
    calculator: {
      title: "How much can your business save?",
      subtitle: "Answer 4 simple questions and get a concrete estimate.",
      labelCalls: "How many incoming calls do you receive per week?",
      labelMissed: "What percentage of calls go unanswered?",
      labelValue: "What is the average value of a customer? (NOK)",
      labelHours: "How many hours do you spend on booking and follow-up per week?",
      resultsTitle: "Your savings estimate",
      resultHeading: "You can save",
      resultSuffix: "per year with Ekspedenten",
      resultBookings: "Bookings recovered",
      resultBookingsUnit: "per month",
      resultRevenue: "Extra revenue",
      resultRevenueUnit: "per month",
      resultHours: "Hours saved",
      resultHoursUnit: "per month",
      resultTotal: "Total annual value",
      cta: "Book a free call to get started →",
      backLink: "← Back",
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
      headline1: "Din bedrift,",
      headline2: "driver seg selv.",
      subtext: "AI-chatboter, bookingautomatisering, CRM-systemer — fullt integrert, klart på dager. Ikke måneder.",
      ctaPrimary: "Book gratis samtale",
      ctaSecondary: "Se hvordan det fungerer",
      ctaTryAria: "Prøv Aria →",
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
      subNew: "Aria tar telefonen, sender påminnelser til eksisterende pasienter, og følger opp nettbesøkende som ikke booket. Live på 7 dager.",
      trustLine: "3 måneders minimumsperiode · 14 dagers pengene-tilbake-garanti",
    },
    problem: {
      eyebrow: "PROBLEMET",
      headline: "Servicebedrifter taper kunder hver dag — uten å vite det",
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
    solution: {
      eyebrow: "LØSNINGEN",
      headline: "Null tapte henvendelser. Null tapte pasienter.",
      headline1: "Null tapte henvendelser.",
      headline2: "Null tapte pasienter.",
      subtitle: "Svarer i din bedrifts tone, kvalifiserer leads automatisk — med full oversikt over alt som skjer.",
      modules: [
        {
          label: "AI-resepsjonist",
          title: "Kundene dine får svar på sekunder. Ikke timer.",
          desc: "Aria svarer innkommende samtaler i din bedrifts tone — sjekker tilgjengelighet, booker timer og bekrefter med kunden. Teamet ditt trår bare inn når det trengs.",
          features: ["Svarer innen 2 sekunder", "Booker direkte i kalenderen", "Sender bekreftelse på SMS", "Overfører til deg ved behov"],
        },
        {
          label: "AI-chatbot",
          title: "Fang leads fra nettsiden din — døgnet rundt.",
          desc: "Svarer på spørsmål, kvalifiserer henvendelser og booker møter automatisk. Uten at du løfter en finger.",
          features: ["Tilpasset din bedrift", "Flerkanal (web, Instagram, SMS)", "CRM-integrasjon", "Ubegrenset samtaler"],
        },
        {
          label: "Lead-oppfølging",
          title: "Automatisk oppfølging til de booker — eller sier nei.",
          desc: "SMS, e-post og chat i 7 dager. Personlig tone, synkronisert med CRM. Ingen leads faller mellom stolene.",
          features: ["Personlig og naturlig tone", "Synkronisert med CRM", "Flerkanaloppfølging"],
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
      headline: "Hvor mye tid bruker du på telefoner, booking og oppfølging i dag?",
      subtitle: "En typisk tannklinikk bruker 10–15 timer i uken på telefon, booking og oppfølging. Ekspedenten reduserer det dramatisk.",
      savingValue: "47",
      savingLabel: "timer spart per måned",
      bookingValue: "kr 51 000",
      bookingLabel: "i ekstra bookinger",
      cta: "Se hva du kan spare →",
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
      trustLine: "3 måneders minimumsperiode · 14 dagers pengene-tilbake-garanti · Svar innen 4 timer",
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
          desc: "Gå live med 14 dagers gratis prøveperiode. Ikke fornøyd? Full refusjon — ingen spørsmål stilt.",
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
      bottomNote: "Alle planer inkluderer onboarding-støtte · 14-dagers pengene-tilbake-garanti · ",
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
      title: "Ofte stilte spørsmål",
      subtitle: "Ærlige svar på alt tannklinikken din trenger å vite før dere kommer i gang.",
      sections: [
        {
          q: "Hva koster det, og hva får vi igjen?",
          a: "Vi har tre pakker tilpasset tannklinikker. AI Chatbot til kr 4 490/mnd fanger leads fra nettsiden din 24/7. AI Resepsjonist til kr 8 590/mnd svarer innkommende samtaler, booker timer og følger opp pasienter automatisk. Leadgen System til kr 5 790/mnd automatiserer hele leadprosessen fra henvendelse til booket time. Alle pakker har et engangs oppsettgebyr på kr 9 000. Det du får igjen: færre tapte anrop, flere bookede timer, og en resepsjon som aldri tar pause. De fleste klinikker tjener inn investeringen allerede første måned gjennom timer som ellers ville gått tapt.",
        },
        {
          q: "Hva skjer hvis AI-en svarer feil eller misforstår?",
          a: "Aria er trent spesifikt på din klinikk — dine tjenester, åpningstider, priser og rutiner. Hvis Aria er usikker på noe, eskalerer hun automatisk til et menneske i stedet for å gjette. Du har full oversikt over alle samtaler i dashboardet og kan justere svar og regler når som helst. Vi overvåker kontinuerlig og forbedrer AI-en basert på ekte samtaler. De første ukene finjusterer vi aktivt sammen med deg for å sikre at Aria svarer riktig.",
        },
        {
          q: "Hvor raskt er vi oppe og kjører?",
          a: "7 virkedager fra signering til live system. Dag 1–2: vi samler inn informasjon om klinikken din — tjenester, priser, åpningstider, vanlige spørsmål. Dag 3–5: vi bygger og trener Aria på din klinikk. Dag 6–7: testing sammen med deg og lansering. Du trenger ikke gjøre noe teknisk — vi håndterer alt.",
        },
        {
          q: "Hva om det ikke fungerer — kan vi si opp?",
          a: "Vi har 14 dagers pengene-tilbake-garanti. Er du ikke fornøyd i løpet av de første 14 dagene, får du full refusjon — ingen spørsmål stilt. Etter det har vi en 3 måneders minimumsperiode fordi ekte resultater tar tid å bygge opp. Etter minimumsperioden kan du si opp med 30 dagers varsel. Vi tror på å bevise verdien, ikke å låse deg inne.",
        },
        {
          q: "Hvilke systemer integrerer dere med?",
          a: "Vi integrerer med de fleste systemer norske tannklinikker bruker. For timebestilling og journalsystemer har vi erfaring med Opus Dental og kan tilpasse integrasjoner med andre systemer som Dentica og Plandent. Vi kobler oss også til Google Calendar, Outlook, og de fleste kalenderløsninger. For CRM støtter vi HubSpot, Pipedrive og andre via API. Har du et spesifikt system? Ta kontakt så avklarer vi kompatibilitet — det tar 5 minutter.",
        },
        {
          q: "Hva med GDPR, pasientdata og taushetsplikt?",
          a: "Viktig avklaring: Aria håndterer IKKE pasientjournaler, diagnoser eller medisinsk informasjon. Aria håndterer kun administrativ kommunikasjon — timebestilling, åpningstider, priser og generelle spørsmål. All data behandles i henhold til GDPR. For klinikker med strenge krav til datalagring innenfor EU/EØS anbefaler vi en individuell vurdering — vi bistår gjerne med dette.",
        },
        {
          q: "Hvem eier dataen, og hva skjer med den når vi avslutter?",
          a: "Du eier all data — samtalelogger, kontaktinformasjon, bookinghistorikk og rapporter. Vi har ingen rettigheter til dine data. Ved avslutning eksporterer vi all data til deg i standard format (CSV/JSON) og sletter den fra våre systemer innen 30 dager. Ingen data beholdes etter avslutning.",
        },
        {
          q: "Hvordan høres Aria ut? Kan vi høre en demo?",
          a: "Aria kommuniserer primært via tekst — chat på nettsiden, SMS og e-post. For talebasert resepsjon bruker Aria en naturlig norsk stemme som er tilpasset klinikkens tone. Den beste måten å oppleve Aria på er å prøve chatboten vår direkte — klikk på chat-ikonet nede til høyre på denne siden. For en full demo av talesystemet, book en gratis 15-minutters samtale med oss.",
        },
        {
          q: "Hva med eldre eller teknologi-fiendtlige pasienter?",
          a: "Aria er designet for å være enkel og naturlig å snakke med — akkurat som en vanlig resepsjonist. Pasienter trenger ikke laste ned noe eller lære ny teknologi. De ringer klinikken som vanlig, og Aria svarer og booker timen. For chat-henvendelser er grensesnittet like enkelt som å sende en SMS. Og hvis en pasient foretrekker å snakke med et menneske, overfører Aria samtalen umiddelbart. Ingen faller utenfor.",
        },
        {
          q: "Tar dette jobben fra resepsjonisten vår?",
          a: "Nei — Aria erstatter ikke resepsjonisten, hun avlaster. De fleste klinikker vi snakker med har resepsjonister som drukner i telefoner, repetitive spørsmål og booking-administrasjon. Aria tar over det rutinearbeidet slik at resepsjonisten kan fokusere på pasientene som er i klinikken, håndtere komplekse henvendelser og gi bedre service. Tenk på Aria som en ekstra kollega som aldri er syk, aldri tar lunsj, og aldri glemmer å følge opp.",
        },
        {
          q: "Hvilke språk støttes?",
          a: "Aria støtter norsk (bokmål og nynorsk), engelsk, og over 50 andre språk. Hun oppdager automatisk hvilket språk pasienten skriver eller snakker på og svarer på samme språk. For tannklinikker i Norge er norsk og engelsk de mest brukte, men Aria håndterer også arabisk, polsk, somali og andre språk som er vanlige blant pasienter i Norge.",
        },
        {
          q: "Hva er oppetidsgarantien / SLA?",
          a: "Vi garanterer 99.9% oppetid. Aria kjører 24/7 på redundant infrastruktur. Hvis det mot formodning skulle oppstå nedetid, varsler vi deg umiddelbart og jobber med å løse det innen 4 timer. I praksis betyr dette at Aria er tilgjengelig for pasientene dine hele døgnet, hele året — inkludert helger, helligdager og ferier.",
        },
        {
          q: "Kan vi styre hva Aria svarer på og ikke?",
          a: "Absolutt. Du har full kontroll. Du bestemmer hvilke tjenester Aria kan booke, hvilke spørsmål hun svarer på, og når hun skal eskalere til et menneske. Vi setter opp regler sammen under onboarding — for eksempel at Aria aldri skal gi medisinske råd, at visse typer henvendelser alltid skal gå til resepsjonisten, eller at booking kun er tilgjengelig for bestemte behandlinger. Du kan justere reglene når som helst via dashboardet.",
        },
        {
          q: "Hva skjer ved akutt-henvendelser (vondt, hevelse, trauma)?",
          a: "Aria er trent til å gjenkjenne akutte henvendelser. Hvis en pasient beskriver akutte symptomer som sterk smerte, hevelse, blødning eller traume, vil Aria IKKE forsøke å håndtere dette selv. Hun eskalerer umiddelbart til klinikken via SMS-varsling til ansvarlig person og gir pasienten tydelig beskjed om å ringe klinikken direkte eller oppsøke legevakt hvis det er utenfor åpningstid. Akutt-håndtering er alltid prioritet én i systemet.",
        },
      ],
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
      welcome: "Hei! Jeg er Aria, Ekspedenten sin assistent 👋\n\nJeg kan fortelle deg om tjenestene og prisene våre, eller hjelpe deg å finne ut hvilken løsning som passer best for din bedrift.\n\nHva kan jeg hjelpe deg med?",
      quickReplies: ["Hvilke tjenester tilbyr dere?", "Hva koster det?", "Hvor raskt kan vi starte?"],
      placeholder: "Spør meg om hva som helst...",
      poweredBy: "Drevet av Ekspedenten · svar kan variere",
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
      bottomNote: "Alle planer inkluderer onboardingstøtte · 14-dagers pengene-tilbake-garanti",
      urgencyBarPrefix: "Kun ",
      urgencyBarSuffix: " grunnleggerplasser tilgjengelig. Prisene går tilbake til standardpris når fylt.",
      heroEyebrow: "PRISER",
      heroHeadline1: "Enkle priser.",
      heroHeadline2: "Ekte verdi.",
      heroSubtitle: "Ingen skjulte kostnader. Ingen lange kontrakter. Bare AI-systemer som betaler seg selv — eller pengene tilbake.",
      trustItems: ["14 dagers prøveperiode", "Pengene tilbake-garanti", "Live på 7 dager"],
      foundingBadge: "Lanseringspris",
      planNames: ["AI Resepsjonist", "Lead-Oppfølger", "Full pakke"],
      planTaglines: ["Din alltid-tilgjengelige AI-resepsjonist", "Automatisk oppfølging av leads", "Alt i én pakke"],
      guarantee: {
        items: [
          { title: "14 dagers prøveperiode",    desc: "Prøv hele systemet helt gratis uten forpliktelser" },
          { title: "Pengene tilbake-garanti",   desc: "Ikke fornøyd innen 14 dager? Full refusjon, ingen spørsmål" },
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
        trustLine: "3 måneders minimumsperiode · 14 dagers pengene-tilbake-garanti · Svar innen 4 timer",
      },
    },
    calculator: {
      title: "Hvor mye kan din bedrift spare?",
      subtitle: "Svar på 4 enkle spørsmål og få et konkret estimat.",
      labelCalls: "Hvor mange innkommende anrop får dere per uke?",
      labelMissed: "Hvor mange prosent av anropene blir ikke besvart?",
      labelValue: "Hva er gjennomsnittsverdien av en kunde? (kr)",
      labelHours: "Hvor mange timer bruker dere på booking og oppfølging per uke?",
      resultsTitle: "Ditt besparingsestimat",
      resultHeading: "Du kan spare",
      resultSuffix: "per år med Ekspedenten",
      resultBookings: "Tapte bookinger gjenvunnet",
      resultBookingsUnit: "stk/måned",
      resultRevenue: "Ekstra inntekt",
      resultRevenueUnit: "per måned",
      resultHours: "Timer spart",
      resultHoursUnit: "per måned",
      resultTotal: "Total årlig verdi",
      cta: "Book en gratis samtale for å komme i gang →",
      backLink: "← Tilbake",
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
