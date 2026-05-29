"use client";

import { useState } from "react";
import styles from "./SubprocessorSubscribe.module.css";

type Status = "idle" | "sending" | "success" | "error";

export default function SubprocessorSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subprocessor-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Noe gikk galt. Prøv igjen, eller send e-post til aleksander@ekspedenten.no.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Noe gikk galt. Prøv igjen, eller send e-post til aleksander@ekspedenten.no.");
      setStatus("error");
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Få beskjed når listen endres</h2>
      <p className={styles.sub}>
        Vi varsler alle berørte klinikker direkte, men du kan også få e-post når noe oppdateres.
      </p>

      {status === "success" ? (
        <p className={styles.success}>Takk! Vi varsler deg når listen endres.</p>
      ) : (
        <>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@klinikk.no"
              className={styles.input}
              disabled={status === "sending"}
              aria-label="E-postadresse"
            />
            <button type="submit" className={styles.btn} disabled={status === "sending"}>
              {status === "sending" ? "Sender..." : "Få varsel"}
            </button>
          </form>
          {status === "error" && <p className={styles.error}>{errorMsg}</p>}
          <p className={styles.fine}>
            Brukes kun til oppdateringer om denne listen. Avmeld når som helst.
          </p>
        </>
      )}
    </div>
  );
}
