"use client";

import { useState } from "react";
import styles from "./FaqTeaser.module.css";

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "Hvor lagres pasientdataene?", a: <>All pasientdata behandles innenfor EU. CRM-data lagres i <b>Frankfurt</b> via Supabase, voice-AI kjører på Azure i Sweden Central. <b>Ingen pasientdata forlater EU.</b> Databehandleravtale (DPA) følger med som standard.</> },
  { q: "Hvor lang tid tar implementering?", a: <><b>Live på 7 dager.</b> Vi kobler til kalender og e-post (dag 1–2), Ekspedenten leser tjenester, priser og åpningstider og bygger kunnskapsbasen selv (dag 3–5), så pilot-samtaler før vi går live (dag 6–7).</> },
  { q: "Er det bindingstid?", a: <>Vi gir <b>60 dagers ROI-garanti.</b> Leverer ikke Ekspedenten målbar avkastning innen de første 60 dagene, refunderer vi abonnementet. Vi måler mot tallene fra før dere installerte.</> },
  { q: "Vet pasienten at de snakker med en AI?", a: <>Ja. Ekspedenten presenterer seg alltid tydelig når hun tar telefonen. <b>Tillit kommer fra åpenhet</b>, ikke fra å late som teknologien er noe den ikke er. Ber pasienten om et menneske, overfører hun umiddelbart.</> },
  { q: "Kan Ekspedenten håndtere akutte saker?", a: <>Ja. Beskriver pasienten smerte eller en nødssituasjon, <b>prioriterer hun akutt-time umiddelbart</b> og sender klinikken et flagg. Hun gjetter aldri på noe medisinsk — er hun i tvil, overfører hun til et menneske.</> },
];

export default function FaqTeaser() {
  const [open, setOpen] = useState<number[]>([0, 1]);
  const toggle = (i: number) =>
    setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <section className={styles.faqt}>
      <div className={styles.band}>
        <span className={styles.eyebrow}><span className={styles.dot} />De vanligste spørsmålene</span>
        <h2 className={styles.h2}>Det klinikker lurer på <i>før de signerer</i></h2>
        <p className={styles.sub}>De fem tingene vi får oftest — besvart med en gang, før du booker samtalen.</p>

        <div className={styles.list}>
          {FAQS.map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
                <button className={styles.q} aria-expanded={isOpen} onClick={() => toggle(i)}>
                  {item.q}
                  <svg className={styles.chev} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div className={styles.a}><div className={styles.aInner}>{item.a}</div></div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.note}>Flere spørsmål om pris, integrasjoner, sikkerhet og teknologi?</span>
          <a href="/faq" className={styles.link}>Se alle spørsmål <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
