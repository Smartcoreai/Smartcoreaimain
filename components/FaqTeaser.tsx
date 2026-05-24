"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FaqTeaser.module.css";

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "Hvor lagres pasientdataene?", a: <>All pasientdata behandles innenfor EU. CRM-data lagres i <b>Frankfurt</b> via Supabase, voice-AI kjører på Azure i Sweden Central. <b>Ingen pasientdata forlater EU.</b> Databehandleravtale (DPA) følger med som standard.</> },
  { q: "Hvor lang tid tar implementering?", a: <><b>Live på 7 dager.</b> Vi kobler til kalender og e-post (dag 1–2), Ekspedenten leser tjenester, priser og åpningstider og bygger kunnskapsbasen selv (dag 3–5), så pilot-samtaler før vi går live (dag 6–7).</> },
  { q: "Er det bindingstid?", a: <>Ja — <b>3 måneders binding, deretter månedlig.</b> 60 dagers ROI-garanti gir deg tryggheten til å teste risikofritt.</> },
  { q: "Vet pasienten at de snakker med en AI?", a: <>Ja. Ekspedenten presenterer seg alltid tydelig når hun tar telefonen. <b>Tillit kommer fra åpenhet</b>, ikke fra å late som teknologien er noe den ikke er. Ber pasienten om et menneske, overfører hun umiddelbart.</> },
  { q: "Kan Ekspedenten håndtere akutte saker?", a: <>Ja. Beskriver pasienten smerte eller en nødssituasjon, <b>prioriterer hun akutt-time umiddelbart</b> og sender klinikken et flagg. Hun gjetter aldri på noe medisinsk — er hun i tvil, overfører hun til et menneske.</> },
];

export default function FaqTeaser() {
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <section className={styles.faq}>
      <div className={styles.head}>
        <span className={styles.eyebrow}><span className={styles.dot} />De vanligste spørsmålene</span>
        <h2 className={styles.h2}>Det klinikker lurer på <i>før de signerer</i></h2>
        <p className={styles.sub}>De fem tingene vi får oftest — besvart med en gang, før du booker samtalen.</p>
      </div>

      <div className={styles.grid}>
        {FAQS.map((item, i) => {
          const isOpen = open.includes(i);
          const numClass = [styles.n1, styles.n2, styles.n3, styles.n4, styles.n5][i];
          return (
            <div key={i} className={`${styles.box} ${isOpen ? styles.open : ""}`}>
              <button className={styles.row} aria-expanded={isOpen} onClick={() => toggle(i)}>
                <span className={`${styles.num} ${numClass}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.q}>{item.q}</span>
                <span className={styles.toggle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className={styles.ans}><div className={styles.ansInner}>{item.a}</div></div>
            </div>
          );
        })}

        <Link href="/faq" className={styles.ctaCell}>
          <span className={styles.ctaLink}>Se alle spørsmål <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          <span className={styles.ctaSub}>Pris · integrasjoner · sikkerhet · teknisk</span>
        </Link>
      </div>
    </section>
  );
}
