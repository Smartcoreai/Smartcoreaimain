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
      bookCall: "Book a call",
    },
    hero: {
      tag: "AI-powered growth systems",
      headline1: "Your business,",
      headline2: "running itself.",
      subtext: "AI chatbots, booking automation, CRM systems — fully integrated, deployed in days. Not months.",
      ctaPrimary: "Book a free call",
      ctaSecondary: "See what we build",
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
    },
    ticker: [
      "AI Chatbot", "Booking Automation", "CRM System", "Lead Capture",
      "Custom Integrations", "24/7 Support", "Revenue Growth", "AI Workflows",
      "Instant Setup", "Smart Automation", "Real-time Analytics", "Client Portal",
    ],
    services: {
      tag: "What we build",
      headline1: "Tools that",
      headline2: "pay for themselves",
      subtext: "Each product is built to generate revenue, not just look good. Try the live demos below.",
      monthNote: "month · 3-month minimum",
      getStarted: "Get started",
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
          cta: "Get started",
        },
        {
          desc: "Turn website visitors into booked meetings — fully automated lead generation.",
          features: ["AI lead capture forms", "Instant lead qualification", "Auto-routing to sales pipeline", "CRM integration", "Email & SMS follow-up", "Monthly performance report"],
          cta: "Get started",
        },
        {
          desc: "AI receptionist that answers, qualifies and follows up with leads — around the clock.",
          features: ["AI-powered reception", "Lead qualification by phone", "Auto follow-up", "CRM integration", "Call recording & transcripts", "24/7 availability"],
          cta: "Get started",
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
      subtitle: "Everything you need to know about how SmartcoreAI works.",
      sections: [
        {
          q: "GDPR and data handling — where is data stored?",
          a: "All data is processed and stored within the EU/EEA in compliance with GDPR. TODO: insert specific data center location and compliance certifications. Data is encrypted in transit and at rest. On cancellation, we export all your data to you and delete it from our systems within 30 days.",
        },
        {
          q: "Who owns the data?",
          a: "You do. All conversation logs, lead data, and customer information collected through your AI system belong entirely to you. SmartcoreAI does not sell, share, or use your customer data for any purpose other than delivering your service.",
        },
        {
          q: "Which integrations do you support?",
          a: "We support HubSpot, Pipedrive, Tripletex, Fiken, and custom API integrations with any platform that has a public API. TODO: confirm full integration list. If your CRM is not listed, contact us — most tools can be connected via webhook or Zapier.",
        },
        {
          q: "Which languages does the chatbot support?",
          a: "TODO: insert full list of supported languages. The chatbot is trained in the language(s) you specify during onboarding. Norwegian and English are fully supported out of the box.",
        },
        {
          q: "What happens when I cancel?",
          a: "All plans require a 3-month minimum partnership. After that, you can cancel with 30 days' notice. On cancellation you receive a full export of all your data (conversation logs, leads, reports). Your data is permanently deleted from our systems within 30 days of cancellation.",
        },
        {
          q: "What is the uptime guarantee / SLA?",
          a: "TODO: insert specific SLA numbers and response-time commitments. All paid plans include monitoring and incident response. Downtime is communicated proactively via email.",
        },
        {
          q: "How does onboarding work? How fast can we go live?",
          a: "After signing, we schedule an onboarding call within 48 hours. We collect your business details, train the AI on your content, and handle all technical setup. Most clients are live within 7 business days. You don't need to do anything technical.",
        },
        {
          q: "What if the AI gives a wrong answer?",
          a: "TODO: insert specific fallback process. The AI is trained specifically on your business content, which minimises errors. When it encounters a question outside its scope, it escalates to a human or asks the visitor to contact you directly. You can review all conversations in your dashboard.",
        },
        {
          q: "3-month minimum and 14-day money-back — how do these work together?",
          a: "The 14-day money-back guarantee means that if you are not satisfied within the first 14 days of going live, we refund you in full — no questions asked. After 14 days the 3-month minimum applies, after which you can cancel month-to-month with 30 days' notice.",
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
      bookNow: "Book now →",
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
      errorDesc: "Please try again or email us at hei@smartcoreai.no",
      responseNote: "We respond within 4 hours during business hours.",
    },
    footer: {
      tagline: "AI-powered growth systems for businesses that want to move faster.",
      ctaHeadline: "Ready to automate your business?",
      ctaSub: "Start with a free 30-min discovery call.",
      ctaButton: "Book a free call",
      rights: "All rights reserved.",
      builtWith: "Built with AI · Deployed in days · Not months.",
      categories: { Services: "Services", Company: "Company", Resources: "Resources", Legal: "Legal" },
      links: {
        Services: [
          { label: "AI Chatbot",              href: "#services" },
          { label: "Booking System",          href: "#services" },
          { label: "CRM System",              href: "#services" },
          { label: "Custom AI Integrations",  href: "#services" },
        ],
        Company: [
          { label: "About",      href: "/about" },
          { label: "Objections", href: "/objections" },
          { label: "Contact",    href: "#contact" },
          { label: "Book a call", href: "#booking" },
          { label: "Pricing",    href: "#pricing" },
        ],
        Resources: [
          { label: "FAQ",     href: "/faq" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "/#contact" },
        ],
        Legal: [
          { label: "Privacy Policy",   href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Cookie Policy",    href: "/cookies" },
        ],
      },
    },
    chat: {
      welcome: "Hey! I'm Aria, SmartcoreAI's assistant 👋\n\nI can tell you about our services and pricing, or help you figure out which solution fits your business best.\n\nWhat can I help you with?",
      quickReplies: ["What services do you offer?", "How much does it cost?", "How fast can we get started?"],
      placeholder: "Ask me anything...",
      poweredBy: "Powered by SmartcoreAI · responses may vary",
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
      getStarted: "Get started →",
      bookCall: "Book a call →",
      bottomNote: "All plans include onboarding support · 14-day money-back guarantee",
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
        subtext: "We started SmartcoreAI because we saw the same problem everywhere: small and mid-sized businesses were being left behind in the AI revolution.",
      },
      team: {
        tag: "The team",
        headline: "The people behind SmartcoreAI",
        members: [
          {
            name: "Aleksander Nordeide Bjørndal",
            role: "Co-Founder & CEO",
            bio: "20-year-old entrepreneur from Bergen. Built SmartcoreAI from scratch with his best friend. Aleksander's philosophy is simple: AI should only cost you money when it makes you money.",
            email: "aleksander@smartcoreai.no",
          },
          {
            name: "Henrik Andreassen Bøe",
            role: "Co-Founder & CEO",
            bio: "20-year-old entrepreneur from Bergen. Started building AI solutions while studying Economics at UiA. Founded SmartcoreAI with a simple conviction: every business deserves AI that works from day one — no tech team required, just results.",
            email: "henrik@smartcoreai.no",
          },
        ],
      },
      story: {
        tag: "Our story",
        headline: "How we got here",
        paragraphs: [
          "SmartcoreAI was founded in 2026 in Bergen, Norway by two best friends who saw the same problem everywhere: small and mid-sized businesses were being left behind in the AI revolution. Enterprises had the budgets. For everyone else, AI was a luxury they couldn't afford.",
          "We built SmartcoreAI to change that. No six-month implementation projects. No technical jargon. Just AI systems that plug into your business and start working — in days, not months.",
          "Our model is built on commitment. A one-time setup fee, a fixed monthly price, and a minimum three-month partnership — because real results take time to compound. We don't sell quick fixes. We build systems that grow with you.",
          "Today we build AI chatbots, lead generation systems, and AI receptionists for Scandinavian B2C businesses — everything from automated booking to lead qualification running 24/7.",
          "Our team is lean by choice. We'd rather build fewer systems that actually drive revenue than sell dashboards nobody opens. We only work with businesses where AI can deliver a measurable return, because focus is how you build trust.",
        ],
      },
      cta: {
        headline: "Ready for a conversation?",
        button: "Book a free call →",
      },
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
      bookCall: "Book samtale",
    },
    hero: {
      tag: "AI-drevne vekstsystemer",
      headline1: "Din bedrift,",
      headline2: "driver seg selv.",
      subtext: "AI-chatboter, bookingautomatisering, CRM-systemer — fullt integrert, klart på dager. Ikke måneder.",
      ctaPrimary: "Book gratis samtale",
      ctaSecondary: "Se hva vi bygger",
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
    },
    ticker: [
      "AI-chatbot", "Bookingautomatisering", "CRM-system", "Leadfangst",
      "Tilpassede integrasjoner", "24/7 support", "Inntektsvekst", "AI-arbeidsflyter",
      "Rask oppsett", "Smart automatisering", "Sanntidsanalyse", "Kundeportal",
    ],
    services: {
      tag: "Hva vi bygger",
      headline1: "Verktøy som",
      headline2: "betaler seg selv",
      subtext: "Hvert produkt er bygget for å generere inntekter, ikke bare se bra ut. Prøv de live demoene nedenfor.",
      monthNote: "måned · 3 måneders minimum",
      getStarted: "Kom i gang",
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
          cta: "Kom i gang",
        },
        {
          desc: "Gjør nettstedsbesøkende til bookede møter — helt automatisk leadgenerering.",
          features: ["AI-leadfangstskjemaer", "Øyeblikkelig leadkvalifisering", "Auto-ruting til salgspipeline", "CRM-integrasjon", "E-post og SMS-oppfølging", "Månedlig ytelsesrapport"],
          cta: "Kom i gang",
        },
        {
          desc: "AI-resepsjonist som svarer, kvalifiserer og følger opp leads — døgnet rundt.",
          features: ["AI-drevet telefonsvar", "Leadkvalifisering per telefon", "Automatisk oppfølging", "CRM-integrasjon", "Samtaleopptak og transkripsjoner", "Tilgjengelighet 24/7"],
          cta: "Kom i gang",
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
      subtitle: "Alt du trenger å vite om hvordan SmartcoreAI fungerer.",
      sections: [
        {
          q: "GDPR og datahåndtering — hvor lagres dataene?",
          a: "All data behandles og lagres innenfor EU/EØS i samsvar med GDPR. TODO: legg inn spesifikt datasenter og sertifiseringer. Data krypteres under overføring og lagring. Ved kansellering eksporterer vi alle dataene dine og sletter dem fra systemene våre innen 30 dager.",
        },
        {
          q: "Hvem eier dataene?",
          a: "Det gjør du. Alle samtalelogger, leads og kundeopplysninger samlet inn via AI-systemet ditt tilhører deg. SmartcoreAI selger ikke, deler ikke, eller bruker kundedataene dine til noe annet enn å levere tjenesten din.",
        },
        {
          q: "Hvilke integrasjoner støtter dere?",
          a: "Vi støtter HubSpot, Pipedrive, Tripletex, Fiken og skreddersydde API-integrasjoner med alle plattformer som har et åpent API. TODO: bekreft full integrasjonsliste. Hvis CRM-en din ikke er listet opp, ta kontakt — de fleste verktøy kan kobles til via webhook eller Zapier.",
        },
        {
          q: "Hvilke språk støtter chatboten?",
          a: "TODO: legg inn full liste over støttede språk. Chatboten trenes på språket/språkene du spesifiserer under onboarding. Norsk og engelsk støttes fullt ut.",
        },
        {
          q: "Hva skjer når jeg avslutter?",
          a: "Alle planer krever et minimum 3-måneders partnerskap. Etter det kan du avslutte med 30 dagers varsel. Ved kansellering mottar du en fullstendig eksport av alle dine data (samtalelogger, leads, rapporter). Dataene dine slettes permanent fra systemene våre innen 30 dager etter kansellering.",
        },
        {
          q: "Hva er oppetidsgarantien / SLA?",
          a: "TODO: legg inn spesifikke SLA-tall og responstidsforpliktelser. Alle betalte planer inkluderer overvåking og hendelseshåndtering. Nedetid kommuniseres proaktivt via e-post.",
        },
        {
          q: "Hvordan fungerer onboarding? Hvor raskt kan vi gå live?",
          a: "Etter signering setter vi opp et onboarding-møte innen 48 timer. Vi samler inn informasjon om bedriften din, trener AI-en på innholdet ditt og håndterer all teknisk oppsett. De fleste kunder er live innen 7 virkedager. Du trenger ikke gjøre noe teknisk selv.",
        },
        {
          q: "Hva skjer hvis AI-en svarer feil?",
          a: "TODO: legg inn spesifikk fallback-prosess. AI-en trenes spesifikt på innholdet fra din bedrift, noe som minimerer feil. Når den møter et spørsmål utenfor sitt område, eskalerer den til et menneske eller ber besøkende ta kontakt direkte. Du kan se alle samtaler i dashbordet ditt.",
        },
        {
          q: "3-måneders minimum og 14-dagers pengene-tilbake — hvordan henger disse sammen?",
          a: "14-dagers pengene-tilbake-garantien betyr at hvis du ikke er fornøyd innen de første 14 dagene etter go-live, refunderer vi deg fullt ut — uten spørsmål. Etter 14 dager gjelder 3-månedersminimum, etter det kan du avslutte månedlig med 30 dagers varsel.",
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
      bookNow: "Book nå →",
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
      errorDesc: "Prøv igjen eller send e-post til hei@smartcoreai.no",
      responseNote: "Vi svarer innen 4 timer i arbeidstiden.",
    },
    footer: {
      tagline: "AI-drevne vekstsystemer for bedrifter som vil bevege seg raskere.",
      ctaHeadline: "Klar til å automatisere bedriften din?",
      ctaSub: "Start med en gratis 30-minutters oppdagelsessamtale.",
      ctaButton: "Book gratis samtale",
      rights: "Alle rettigheter forbeholdt.",
      builtWith: "Bygget med AI · Klart på dager · Ikke måneder.",
      categories: { Services: "Tjenester", Company: "Selskap", Resources: "Ressurser", Legal: "Juridisk" },
      links: {
        Services: [
          { label: "AI-chatbot",                href: "#services" },
          { label: "Bookingsystem",             href: "#services" },
          { label: "CRM-system",                href: "#services" },
          { label: "Tilpassede AI-integrasjoner", href: "#services" },
        ],
        Company: [
          { label: "Om oss",       href: "/about" },
          { label: "Innvendinger", href: "/objections" },
          { label: "Kontakt",      href: "#contact" },
          { label: "Book samtale", href: "#booking" },
          { label: "Priser",       href: "#pricing" },
        ],
        Resources: [
          { label: "FAQ",     href: "/faq" },
          { label: "Priser",  href: "/pricing" },
          { label: "Kontakt", href: "/#contact" },
        ],
        Legal: [
          { label: "Personvern",          href: "/privacy" },
          { label: "Vilkår for bruk",     href: "/terms" },
          { label: "Informasjonskapsler", href: "/cookies" },
        ],
      },
    },
    chat: {
      welcome: "Hei! Jeg er Aria, SmartcoreAI sin assistent 👋\n\nJeg kan fortelle deg om tjenestene og prisene våre, eller hjelpe deg å finne ut hvilken løsning som passer best for din bedrift.\n\nHva kan jeg hjelpe deg med?",
      quickReplies: ["Hvilke tjenester tilbyr dere?", "Hva koster det?", "Hvor raskt kan vi starte?"],
      placeholder: "Spør meg om hva som helst...",
      poweredBy: "Drevet av SmartcoreAI · svar kan variere",
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
      getStarted: "Kom i gang →",
      bookCall: "Book samtale →",
      bottomNote: "Alle planer inkluderer onboardingstøtte · 14-dagers pengene-tilbake-garanti",
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
        subtext: "Vi startet SmartcoreAI fordi vi så det samme problemet overalt: små og mellomstore bedrifter ble etterlatt i AI-revolusjonen.",
      },
      team: {
        tag: "Teamet",
        headline: "Menneskene bak SmartcoreAI",
        members: [
          {
            name: "Aleksander Nordeide Bjørndal",
            role: "Co-Founder & CEO",
            bio: "20 år gammel entreprenør fra Bergen som har lyst å hjelpe bedrifter med AI. Bygde SmartcoreAI fra bunnen av med sin bestekamerat. Aleksanders filosofi er enkel: AI skal bare koste deg penger når den tjener deg penger.",
            email: "aleksander@smartcoreai.no",
          },
          {
            name: "Henrik Andreassen Bøe",
            role: "Co-Founder & CEO",
            bio: "20 år gammel entreprenør fra Bergen. Begynte å bygge AI-løsninger mens han studerte økonomi ved UiA. Grunnla SmartcoreAI med en enkel overbevisning: alle bedrifter fortjener AI som fungerer fra dag én — ingen tech-team nødvendig, bare resultater.",
            email: "henrik@smartcoreai.no",
          },
        ],
      },
      story: {
        tag: "Vår historie",
        headline: "Slik startet det",
        paragraphs: [
          "SmartcoreAI ble grunnlagt i 2026 i Bergen, Norge av to bestekamerater som så det samme problemet overalt: små og mellomstore bedrifter ble etterlatt i AI-revolusjonen. De store selskapene hadde budsjettene. For alle andre var AI en luksus de ikke hadde råd til.",
          "Vi bygde SmartcoreAI for å endre det. Ingen seks måneders implementeringsprosjekter. Ingen teknisk sjargong. Bare AI-systemer som kobles inn i bedriften din og begynner å jobbe — på dager, ikke måneder.",
          "Modellen vår er bygget på forpliktelse: et engangs oppsettgebyr, en fast månedspris, og et minimum tre måneders samarbeid — fordi ekte resultater tar tid. Vi selger ikke raske løsninger. Vi bygger systemer som vokser med deg.",
          "I dag bygger vi AI-chatboter, leadgenereringssystemer og AI-resepsjonister for skandinaviske B2C-bedrifter — alt fra automatisert booking til leadkvalifisering som kjører 24/7.",
          "Teamet vårt er lite med vilje. Vi bygger heller færre systemer som faktisk driver inntekter, enn å selge dashboards ingen åpner. Vi jobber kun med bedrifter der AI kan levere målbar avkastning, fordi fokus er slik man bygger tillit.",
        ],
      },
      cta: {
        headline: "Klar for en samtale?",
        button: "Book en gratis samtale →",
      },
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
