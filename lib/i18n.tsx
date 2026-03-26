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
      stats: [
        { value: "340%", label: "Avg revenue lift" },
        { value: "12h",  label: "Setup time" },
        { value: "98%",  label: "Client satisfaction" },
        { value: "500+", label: "Businesses automated" },
      ],
      floatingBadges: [
        { icon: "💬", text: "Lead captured",     sub: "via AI chat" },
        { icon: "📅", text: "Booking confirmed", sub: "Tue 2:00 PM" },
        { icon: "💰", text: "$4,200 revenue",    sub: "this week" },
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
      monthNote: "month · no long-term contract",
      getStarted: "Get started",
      liveDemo: "Live interactive demo",
      items: [
        {
          label: "AI Chatbot",
          tag: "Most Popular",
          headline: "Convert visitors to clients while you sleep",
          desc: "A trained AI assistant that handles leads, FAQs, bookings, and follow-ups — 24/7. No scripts, no delays.",
          features: ["Instant lead capture", "Custom AI training", "CRM integration", "Multi-channel (web, SMS, IG)"],
        },
        {
          label: "Booking System",
          tag: "Time-saver",
          headline: "Zero back-and-forth. Instant bookings.",
          desc: "Automated scheduling with confirmations, reminders, and calendar sync. Your clients book, you just show up.",
          features: ["Real-time availability", "Auto SMS/email reminders", "Payment integration", "Google & Outlook sync"],
        },
        {
          label: "CRM System",
          tag: "Revenue driver",
          headline: "Track every deal. Close more clients.",
          desc: "A full CRM dashboard tailored to your pipeline — with AI scoring, automated follow-ups, and revenue tracking.",
          features: ["AI lead scoring", "Pipeline automation", "Revenue forecasting", "Team collaboration"],
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
      subtext: "No setup fees. No long-term contracts. Cancel anytime.",
      popular: "Most Popular",
      period: "month",
      bottomNote: "All plans include onboarding support · 14-day money-back guarantee · ",
      customBundles: "Custom bundles available",
      plans: [
        {
          desc: "Perfect for service businesses wanting to capture & qualify leads 24/7.",
          features: ["Custom-trained AI assistant", "Unlimited conversations", "Lead capture & qualification", "CRM / email integration", "Booking link integration", "Monthly performance report"],
          cta: "Get started",
        },
        {
          desc: "End back-and-forth scheduling. Your clients book instantly, automatically.",
          features: ["Online booking portal", "Calendar sync (Google/Outlook)", "Auto reminders via SMS & email", "Payment collection", "Cancellation handling", "No-show protection"],
          cta: "Get started",
        },
        {
          desc: "A full CRM pipeline purpose-built for small teams that move fast.",
          features: ["Custom CRM dashboard", "AI lead scoring & routing", "Pipeline automation", "Revenue forecasting", "Team collaboration tools", "API access", "Priority support"],
          cta: "Get the CRM",
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
        { q: "I need to think about it.", a: "Totally fair. While you think, your competitors are automating. We're here when you're ready." },
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
      labels: { name: "Name *", email: "Email *", business: "Business name", message: "What do you need? *" },
      placeholders: { name: "Your name", email: "you@company.com", business: "Your company", message: "Tell us about your business and what you're trying to achieve..." },
      submit: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successDesc: "We'll be in touch within 4 hours. Check your inbox.",
      sendAnother: "Send another",
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
          { label: "Objections", href: "/objections" },
          { label: "Contact",    href: "#contact" },
          { label: "Book a call", href: "#booking" },
          { label: "Pricing",    href: "#pricing" },
        ],
        Resources: [
          { label: "FAQ",     href: "#objections" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
        Legal: [
          { label: "Privacy Policy",  href: "#" },
          { label: "Terms of Service", href: "#" },
          { label: "Cookie Policy",   href: "#" },
        ],
      },
    },
    chat: {
      welcome: "Hey! I'm Aria, SmartcoreAI's assistant 👋\n\nI can tell you about our services and pricing, or help you figure out which solution fits your business best.\n\nWhat can I help you with?",
      quickReplies: ["What services do you offer?", "How much does it cost?", "How fast can we get started?"],
      placeholder: "Ask me anything...",
      poweredBy: "Powered by SmartcoreAI · responses may vary",
    },
  },

  no: {
    nav: {
      services: "Tjenester",
      pricing: "Priser",
      faq: "FAQ",
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
      stats: [
        { value: "340%", label: "Gjennomsnittlig inntektsvekst" },
        { value: "12t",  label: "Oppsettid" },
        { value: "98%",  label: "Kundetilfredshet" },
        { value: "500+", label: "Bedrifter automatisert" },
      ],
      floatingBadges: [
        { icon: "💬", text: "Lead fanget",        sub: "via AI-chat" },
        { icon: "📅", text: "Booking bekreftet",  sub: "Tir 14:00" },
        { icon: "💰", text: "42 000 kr inntekt",  sub: "denne uken" },
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
      monthNote: "måned · ingen langtidskontrakt",
      getStarted: "Kom i gang",
      liveDemo: "Live interaktiv demo",
      items: [
        {
          label: "AI-chatbot",
          tag: "Mest populær",
          headline: "Konverter besøkende til kunder mens du sover",
          desc: "En trent AI-assistent som håndterer leads, FAQ, bookinger og oppfølginger — 24/7. Ingen skript, ingen forsinkelser.",
          features: ["Øyeblikkelig leadfangst", "Tilpasset AI-trening", "CRM-integrasjon", "Flerkanal (web, SMS, IG)"],
        },
        {
          label: "Bookingsystem",
          tag: "Tidsbesparende",
          headline: "Null frem og tilbake. Øyeblikkelige bookinger.",
          desc: "Automatisert planlegging med bekreftelser, påminnelser og kalendersynk. Kundene booker, du møter bare opp.",
          features: ["Sanntidstilgjengelighet", "Auto SMS/e-postpåminnelser", "Betalingsintegrasjon", "Google & Outlook-synk"],
        },
        {
          label: "CRM-system",
          tag: "Inntektsdrivende",
          headline: "Følg alle avtaler. Lukk flere kunder.",
          desc: "Et komplett CRM-dashboard tilpasset din pipeline — med AI-scoring, automatiserte oppfølginger og inntektssporing.",
          features: ["AI-leadscoring", "Pipeline-automatisering", "Inntektsprognoser", "Teamsamarbeid"],
        },
        {
          label: "Tilpassede AI-integrasjoner",
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
      subtext: "Ingen oppstartsgebyr. Ingen langtidskontrakter. Avslutt når som helst.",
      popular: "Mest populær",
      period: "måned",
      bottomNote: "Alle planer inkluderer onboarding-støtte · 14-dagers pengene-tilbake-garanti · ",
      customBundles: "Tilpassede pakker tilgjengelig",
      plans: [
        {
          desc: "Perfekt for servicebedrifter som ønsker å fange og kvalifisere leads 24/7.",
          features: ["Tilpasset AI-assistent", "Ubegrenset antall samtaler", "Leadfangst og -kvalifisering", "CRM/e-postintegrasjon", "Bookinglenke-integrasjon", "Månedlig ytelsesrapport"],
          cta: "Kom i gang",
        },
        {
          desc: "Avslutt frem-og-tilbake-planleggingen. Kundene booker øyeblikkelig, automatisk.",
          features: ["Online bookingportal", "Kalendersynk (Google/Outlook)", "Auto-påminnelser via SMS og e-post", "Betalingsinnkreving", "Avbestillingshåndtering", "Beskyttelse mot uteblivelse"],
          cta: "Kom i gang",
        },
        {
          desc: "En komplett CRM-pipeline bygget for små team som beveger seg raskt.",
          features: ["Tilpasset CRM-dashboard", "AI-leadscoring og -ruting", "Pipeline-automatisering", "Inntektsprognoser", "Teamsamarbeidsverktøy", "API-tilgang", "Prioritert support"],
          cta: "Få CRM-en",
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
        { q: "Jeg trenger å tenke meg om.", a: "Helt forståelig. Mens du tenker, automatiserer konkurrentene dine. Vi er her når du er klar." },
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
      labels: { name: "Navn *", email: "E-post *", business: "Bedriftsnavn", message: "Hva trenger du? *" },
      placeholders: { name: "Ditt navn", email: "du@bedrift.no", business: "Din bedrift", message: "Fortell oss om bedriften din og hva du ønsker å oppnå..." },
      submit: "Send melding",
      sending: "Sender...",
      successTitle: "Melding sendt!",
      successDesc: "Vi tar kontakt innen 4 timer. Sjekk innboksen din.",
      sendAnother: "Send en ny",
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
          { label: "Innvendinger", href: "/objections" },
          { label: "Kontakt",      href: "#contact" },
          { label: "Book samtale", href: "#booking" },
          { label: "Priser",       href: "#pricing" },
        ],
        Resources: [
          { label: "FAQ",     href: "#objections" },
          { label: "Priser",  href: "#pricing" },
          { label: "Kontakt", href: "#contact" },
        ],
        Legal: [
          { label: "Personvern",        href: "#" },
          { label: "Vilkår for bruk",   href: "#" },
          { label: "Informasjonskapsler", href: "#" },
        ],
      },
    },
    chat: {
      welcome: "Hei! Jeg er Aria, SmartcoreAI sin assistent 👋\n\nJeg kan fortelle deg om tjenestene og prisene våre, eller hjelpe deg å finne ut hvilken løsning som passer best for din bedrift.\n\nHva kan jeg hjelpe deg med?",
      quickReplies: ["Hvilke tjenester tilbyr dere?", "Hva koster det?", "Hvor raskt kan vi starte?"],
      placeholder: "Spør meg om hva som helst...",
      poweredBy: "Drevet av SmartcoreAI · svar kan variere",
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
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "no") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
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
// Converts a USD amount to the display string for the current language.
// lang="en" → "$399"   lang="no" → "3 990 kr"  (1 USD = 10 NOK, space separator)

export function formatPrice(usd: number, lang: Lang): string {
  if (lang === "no") {
    const nok = usd * 10;
    // nb-NO locale uses non-breaking space as thousands separator → replace with regular space
    const formatted = nok.toLocaleString("nb-NO").replace(/\u00A0/g, "\u0020");
    return `${formatted} kr`;
  }
  return `$${usd.toLocaleString("en-US")}`;
}

export function formatPriceWithPeriod(usd: number, lang: Lang): string {
  const price = formatPrice(usd, lang);
  const period = lang === "no" ? "/mnd" : "/mo";
  return `${price}${period}`;
}
