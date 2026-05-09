"use client";
import "../landing.css";
import "../faq.css";
import { useEffect, useState, Fragment, type ReactNode } from "react";
import Link from "next/link";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import ChatWidget from "@/components/ChatWidget";
import { DemoPopup } from "@/components/DemoPopup";
import { useLanguage } from "@/lib/i18n";

function renderAnswer(text: string): ReactNode {
  const paragraphs = text.split("\n\n");
  return paragraphs.map((para, pi) => (
    <p key={pi}>
      {para.split("\n").map((line, li, lines) => {
        const segments = line.split(/(\*\*[^*]+\*\*)/g);
        const inline = segments.map((seg, si) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return <strong key={si}>{seg.slice(2, -2)}</strong>;
          }
          return <Fragment key={si}>{seg}</Fragment>;
        });
        return (
          <Fragment key={li}>
            {inline}
            {li < lines.length - 1 && <br />}
          </Fragment>
        );
      })}
    </p>
  ));
}

export default function FAQPage() {
  const { t } = useLanguage();
  const f = t.faq;
  const [activeId, setActiveId] = useState<string>(f.categories[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = f.categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { threshold: [0.15, 0.5], rootMargin: "-96px 0px -50% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [f.categories]);

  return (
    <div className="lp-root faq-root">
      <LandingNavbar />
      <main>
        <section className="faq-hero">
          <div className="faq-container">
            <span className="faq-pill lavender">{f.hero.pill}</span>
            <h1>
              {f.hero.title1}
              <br />
              <em>{f.hero.titleEm}</em>
              {f.hero.titleEnd}
            </h1>
            <p>{f.hero.subtitle}</p>
          </div>
        </section>

        <div className="faq-container">
          <div className="faq-tabs">
            {f.categories.map((c) => (
              <Link
                key={c.id}
                href={`#${c.id}`}
                className={`faq-tab${activeId === c.id ? " active" : ""}`}
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>

        <section className="faq-section">
          <div className="faq-container faq-narrow">
            {f.categories.map((cat) => (
              <div key={cat.id} className="faq-category" id={cat.id}>
                <div className="faq-cat-head">
                  <div className={`faq-cat-icon ${cat.iconClass}`}>{cat.icon}</div>
                  <div className="faq-cat-title">{cat.title}</div>
                  <div className="faq-cat-count">{cat.count}</div>
                </div>
                <div className="faq-list">
                  {cat.questions.map((qa, qi) => (
                    <details
                      className="faq-qa"
                      key={`${cat.id}-${qi}`}
                      {...(cat.id === f.categories[0].id && qi === 0 ? { open: true } : {})}
                    >
                      <summary>
                        <span className="faq-q">{qa.q}</span>
                        <span className="faq-toggle" aria-hidden="true">+</span>
                      </summary>
                      <div className="faq-a">{renderAnswer(qa.a)}</div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-cta">
          <div className="faq-container">
            <h2>
              {f.cta.title1}
              <br />
              <em>{f.cta.titleEm}</em>
              {f.cta.titleEnd}
            </h2>
            <p>{f.cta.subtitle}</p>
            <div className="faq-cta-row">
              <DemoPopup triggerText={f.cta.primary} className="lp-btn-primary" />
              <a href={f.cta.secondaryHref} className="faq-btn-secondary">
                {f.cta.secondary} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
      <ChatWidget />
    </div>
  );
}
