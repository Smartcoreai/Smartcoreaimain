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
      tag: "AI-powered growth systems",
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
      headlineNew: "Your clinic's new receptionist works 24/7 — and never needs time off.",
      subNew: "Ekspedenten builds AI receptionists, chatbots and follow-up systems for service businesses. Live in 7 days.",
      trustLine: "3-month minimum · 14-day money-back guarantee",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      headline: "Service businesses lose customers every day — without knowing it",
      cards: [
        {
          title: "Calls you can't answer",
          stat: "47%",
          desc: "47% of incoming calls to clinics go unanswered. Each one is a potential booking.",
        },
        {
          title: "Slow replies cost bookings",
          stat: "31%",
          desc: "31% of leads book with a competitor if they don't get a reply within 5 minutes.",
        },
        {
          title: "Inquiries lost in the inbox",
          stat: "66%",
          desc: "66% of clinics have no system to automatically follow up on leads.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      headline: "Three systems. One platform. Zero friction.",
      headline1: "Three systems.",
      headline2: "One platform.",
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
          features: ["Automatic for 7 days", "Personal and natural tone", "Synced with CRM", "Multi-channel follow-up"],
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
      subtitle: "Most clinics spend 15+ hours a week. We can cut it to under 2.",
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
        { title: "GDPR-compliant", desc: "All data is processed in accordance with GDPR. Stored in the EU." },
        { title: "Encrypted storage", desc: "End-to-end encryption. Your data is safe." },
        { title: "EU data storage", desc: "All data is stored on EU servers in Frankfurt, Germany." },
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
          desc: "Perfect for service businesses wanting to capture & qualify leads 24/7.",
          features: ["Custom-trained AI assistant", "Unlimited conversations", "Lead capture & qualification", "CRM / email integration", "Booking link integration", "Monthly performance report"],
          cta: "Book a free call",
        },
        {
          desc: "Turn website visitors into booked meetings — fully automated lead generation.",
          features: ["AI lead capture forms", "Instant lead qualification", "Auto-routing to sales pipeline", "CRM integration", "Email & SMS follow-up", "Monthly performance report"],
          cta: "Book a free call",
        },
        {
          desc: "AI receptionist that answers, qualifies and follows up with leads — around the clock.",
          features: ["AI-powered reception", "Lead qualification by phone", "Auto follow-up", "CRM integration", "Call recording & transcripts", "24/7 availability"],
          cta: "Book a free call",
        },
        {
          desc: "We design a fully custom AI layer that plugs into every part of your business.",
          features: ["Custom AI workflow design", "Multi-tool API integrations", "Dedicated AI model training", "White-label option", "Dedicated account manager", "SLA guarantee", "Unlimited revisions"],
          cta: "Book a strategy call",
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
      subtitle: "Everything you need to know about how Ekspedenten works.",
      sections: [
        {
          q: "GDPR and data handling — where is data stored?",
          a: "All data is stored securely on EU servers (Frankfurt, Germany) via AWS. Only you and your team have access to customer data. We are fully GDPR compliant. Upon cancellation, all data is deleted within 30 days, unless you request an export first.",
        },
        {
          q: "Who owns the data?",
          a: "You own all data — conversation logs, customer info, leads, and analytics. We have no rights to your data. Upon cancellation, you can export everything in standard formats (CSV/JSON).",
        },
        {
          q: "Which integrations do you support?",
          a: "We integrate with HubSpot, Pipedrive, Tripletex, Fiken, Google Calendar, Outlook, Slack, and most tools with an API. Have a specific system? We'll customize the integration.",
        },
        {
          q: "Which languages does the chatbot support?",
          a: "The chatbot supports Norwegian, English, Swedish, Danish, and 50+ other languages. It automatically detects which language the customer writes in and responds in the same language.",
        },
        {
          q: "What happens when I cancel?",
          a: "There's a 3-month minimum period. After the minimum period, you can cancel with 30 days notice. Upon cancellation, we export all your data and delete it from our systems within 30 days.",
        },
        {
          q: "What is the uptime guarantee / SLA?",
          a: "We guarantee 99.9% uptime. The chatbot and AI receptionist run 24/7 on redundant infrastructure. In case of downtime, we notify you immediately and resolve it within 4 hours.",
        },
        {
          q: "How does onboarding work? How fast can we go live?",
          a: "Onboarding takes 5-7 business days. Days 1-2: we gather info about your business. Days 3-5: we build and train the AI. Days 6-7: testing and launch. You're live within a week.",
        },
        {
          q: "What if the AI gives a wrong answer?",
          a: "The AI is trained specifically on your business and services. If it's unsure, it automatically escalates to a human. You can review all conversations in the dashboard and adjust responses. We continuously monitor and improve the AI based on real conversations.",
        },
        {
          q: "3-month minimum and 14-day money-back — how do these work together?",
          a: "The 3-month minimum exists because real results take time to build. But we offer a 14-day money-back guarantee — if you're not satisfied within the first 14 days, you get a full refund, no questions asked. After 3 months, the agreement becomes month-to-month.",
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
      planNames: ["AI Chatbot", "AI Receptionist", "Leadgen System"],
      planTaglines: ["Your always-on chat agent", "Your AI front desk", "Your lead-generation engine"],
      guarantee: {
        items: [
          { title: "14-day trial", desc: "Try the full system for free with no commitment" },
          { title: "Money-back guarantee", desc: "Not satisfied within 14 days? Full refund, no questions asked" },
          { title: "Live in 7 days", desc: "From signing to production — or you don't pay" },
          { title: "GDPR compliant", desc: "All data stored securely in the EU. You own your data" },
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
          desc: "A custom-trained AI assistant that handles leads, FAQs, bookings and follow-ups — 24/7.",
          features: ["Custom AI training", "Unlimited conversations", "Lead capture", "CRM integration", "Booking integration", "Monthly report"],
        },
        {
          desc: "Fully automated lead generation that captures and qualifies leads 24/7.",
          features: ["AI lead capture forms", "Instant qualification", "Auto-routing", "CRM integration", "Email & SMS follow-up", "Monthly report"],
        },
        {
          desc: "An AI receptionist that answers, qualifies and books meetings — 24/7.",
          features: ["AI-powered reception", "Lead qualification by phone", "Auto follow-up", "CRM integration", "Call recording", "24/7 availability"],
        },
        {
          desc: "A fully custom AI system tailored to your business.",
          features: ["Custom workflow design", "Multi-tool API integrations", "AI model training", "Dedicated support", "SLA guarantee", "Unlimited revisions"],
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
        subtext: "We started Ekspedenten because we saw the same problem everywhere: small and mid-sized businesses were being left behind in the AI revolution.",
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
          "Today we build AI chatbots, lead generation systems, and AI receptionists for Scandinavian B2C businesses — everything from automated booking to lead qualification running 24/7.",
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
      tag: "AI-drevne vekstsystemer",
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
      headlineNew: "Klinikkens nye resepsjonist jobber 24/7 — og trenger aldri fri.",
      subNew: "Ekspedenten bygger AI-resepsjonister, chatboter og oppfølgingssystemer for norske servicebedrifter. Live på 7 dager.",
      trustLine: "3 måneders minimumsperiode · 14 dagers pengene-tilbake-garanti",
    },
    problem: {
      eyebrow: "PROBLEMET",
      headline: "Servicebedrifter taper kunder hver dag — uten å vite det",
      cards: [
        {
          title: "Telefoner du ikke rekker",
          stat: "47%",
          desc: "47% av innkommende anrop til klinikker blir aldri besvart. Hver av dem er en potensiell booking.",
        },
        {
          title: "Sene svar koster bookinger",
          stat: "31%",
          desc: "31% av leads booker hos konkurrenten hvis de ikke får svar innen 5 minutter.",
        },
        {
          title: "Henvendelser som forsvinner i innboksen",
          stat: "66%",
          desc: "66% av klinikker har ikke et system for å følge opp leads automatisk.",
        },
      ],
    },
    solution: {
      eyebrow: "LØSNINGEN",
      headline: "Tre systemer. Én plattform. Null friksjon.",
      headline1: "Tre systemer.",
      headline2: "Én plattform.",
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
          features: ["Automatisk i 7 dager", "Personlig og naturlig tone", "Synkronisert med CRM", "Flerkanaloppfølging"],
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
      subtitle: "De fleste klinikker bruker 15+ timer i uken. Vi kan kutte det til under 2.",
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
        { title: "GDPR-kompatibel", desc: "All data behandles i henhold til GDPR. Lagret i EU." },
        { title: "Kryptert lagring", desc: "Ende-til-ende-kryptering. Dine data er trygge." },
        { title: "EU datalagring", desc: "All data lagres på EU-servere i Frankfurt, Tyskland." },
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
          desc: "Perfekt for servicebedrifter som ønsker å fange og kvalifisere leads 24/7.",
          features: ["Tilpasset AI-assistent", "Ubegrenset antall samtaler", "Leadfangst og -kvalifisering", "CRM/e-postintegrasjon", "Bookinglenke-integrasjon", "Månedlig ytelsesrapport"],
          cta: "Book en gratis samtale",
        },
        {
          desc: "Gjør nettstedsbesøkende til bookede møter — helt automatisk leadgenerering.",
          features: ["AI-leadfangstskjemaer", "Øyeblikkelig leadkvalifisering", "Auto-ruting til salgspipeline", "CRM-integrasjon", "E-post og SMS-oppfølging", "Månedlig ytelsesrapport"],
          cta: "Book en gratis samtale",
        },
        {
          desc: "AI-resepsjonist som svarer, kvalifiserer og følger opp leads — døgnet rundt.",
          features: ["AI-drevet telefonsvar", "Leadkvalifisering per telefon", "Automatisk oppfølging", "CRM-integrasjon", "Samtaleopptak og transkripsjoner", "Tilgjengelighet 24/7"],
          cta: "Book en gratis samtale",
        },
        {
          desc: "Vi designer et fullt tilpasset AI-lag som kobles inn i alle deler av virksomheten din.",
          features: ["Tilpasset AI-arbeidsflytdesign", "Flerverktøy API-integrasjoner", "Dedikert AI-modelltrening", "Whitelabel-alternativ", "Dedikert kontoadministrator", "SLA-garanti", "Ubegrenset revisjoner"],
          cta: "Book strategisamtale",
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
      subtitle: "Alt du trenger å vite om hvordan Ekspedenten fungerer.",
      sections: [
        {
          q: "GDPR og datahåndtering — hvor lagres dataene?",
          a: "All data lagres sikkert på servere i EU (Frankfurt, Tyskland) via AWS. Kun du og ditt team har tilgang til kundedata. Vi følger GDPR fullt ut. Ved kansellering slettes all data innen 30 dager, med mindre du ber om eksport først.",
        },
        {
          q: "Hvem eier dataene?",
          a: "Du eier all data — samtalelogger, kundeinfo, leads og analyser. Vi har ingen rettigheter til dine data. Ved kansellering kan du eksportere alt i standard format (CSV/JSON).",
        },
        {
          q: "Hvilke integrasjoner støtter dere?",
          a: "Vi integrerer med HubSpot, Pipedrive, Tripletex, Fiken, Google Calendar, Outlook, Slack, og de fleste verktøy med API. Har du et spesifikt system? Vi tilpasser integrasjonen.",
        },
        {
          q: "Hvilke språk støtter chatboten?",
          a: "Chatboten støtter norsk, engelsk, svensk, dansk, og over 50 andre språk. Den oppdager automatisk hvilket språk kunden skriver på og svarer på samme språk.",
        },
        {
          q: "Hva skjer når jeg avslutter?",
          a: "Du har en 3-måneders minimumsperiode. Etter det kan du kansellere når som helst med 30 dagers varsel. Ved kansellering eksporterer vi all data til deg og sletter den fra våre systemer innen 30 dager.",
        },
        {
          q: "Hva er oppetidsgarantien / SLA?",
          a: "Vi garanterer 99.9% oppetid. Chatboten og AI-resepsjonisten kjører 24/7 på redundant infrastruktur. Ved nedetid varsler vi deg umiddelbart og løser det innen 4 timer.",
        },
        {
          q: "Hvordan fungerer onboarding? Hvor raskt kan vi gå live?",
          a: "Onboarding tar 5-7 virkedager. Dag 1-2: vi samler inn info om bedriften din. Dag 3-5: vi bygger og trener AI-en. Dag 6-7: testing og lansering. Du er live innen en uke.",
        },
        {
          q: "Hva skjer hvis AI-en svarer feil?",
          a: "AI-en er trent spesifikt på din bedrift og dine tjenester. Hvis den er usikker, eskalerer den til et menneske automatisk. Du kan se alle samtaler i dashboardet og justere svarene. Vi overvåker kontinuerlig og forbedrer AI-en basert på ekte samtaler.",
        },
        {
          q: "3-måneders minimum og 14-dagers pengene-tilbake — hvordan henger disse sammen?",
          a: "Du binder deg for minimum 3 måneder fordi ekte resultater tar tid å bygge opp. Men vi tilbyr 14-dagers pengene-tilbake-garanti — hvis du ikke er fornøyd i løpet av de første 14 dagene, får du full refusjon, ingen spørsmål stilt. Etter 3 måneder går avtalen over til måned-til-måned.",
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
      planNames: ["AI Chatbot", "AI Resepsjonist", "Leadgen System"],
      planTaglines: ["Din 24/7 chatassistent", "Din alltid-på-jobb resepsjonist", "Din automatiske leadmaskin"],
      guarantee: {
        items: [
          { title: "14 dagers prøveperiode",    desc: "Prøv hele systemet helt gratis uten forpliktelser" },
          { title: "Pengene tilbake-garanti",   desc: "Ikke fornøyd innen 14 dager? Full refusjon, ingen spørsmål" },
          { title: "Live på 7 dager",           desc: "Fra signering til produksjon — eller du betaler ikke" },
          { title: "GDPR-kompatibel",           desc: "All data lagres sikkert i EU. Du eier dataene" },
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
          desc: "En skreddersydd AI-assistent som håndterer leads, spørsmål, bookinger og oppfølging — 24/7.",
          features: ["Skreddersydd AI-opplæring", "Ubegrenset antall samtaler", "Lead-innhenting", "CRM-integrasjon", "Bookingintegrasjon", "Månedlig rapport"],
        },
        {
          desc: "Fullt automatisert leadgenerering som fanger og kvalifiserer leads 24/7.",
          features: ["AI-skjema for leadinnhenting", "Øyeblikkelig kvalifisering", "Automatisk ruting", "CRM-integrasjon", "E-post & SMS-oppfølging", "Månedlig rapport"],
        },
        {
          desc: "En AI-resepsjonist som svarer, kvalifiserer og booker møter — 24/7.",
          features: ["AI-drevet telefonsvar", "Leadkvalifisering på telefon", "Automatisk oppfølging", "CRM-integrasjon", "Samtaleopptak", "Tilgjengelig 24/7"],
        },
        {
          desc: "Et fullt skreddersydd AI-system tilpasset din bedrift.",
          features: ["Skreddersydd arbeidsflyt", "Fler-verktøy API-integrasjoner", "AI-modelltrening", "Dedikert støtte", "SLA-garanti", "Ubegrenset revisjoner"],
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
        subtext: "Vi startet Ekspedenten fordi vi så det samme problemet overalt: små og mellomstore bedrifter ble etterlatt i AI-revolusjonen.",
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
          "I dag bygger vi AI-chatboter, leadgenereringssystemer og AI-resepsjonister for skandinaviske B2C-bedrifter — alt fra automatisert booking til leadkvalifisering som kjører 24/7.",
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
