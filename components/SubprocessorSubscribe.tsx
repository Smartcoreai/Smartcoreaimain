"use client";

import { useState } from "react";

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
    <div className="lp-subscribe">
      <div className="lp-subscribe-txt">
        <div className="lp-subscribe-lab">Få varsel ved endringer</div>
        <div className="lp-subscribe-h">Vi sender e-post når vi legger til eller bytter en underleverandør.</div>
      </div>

      {status === "success" ? (
        <p className="lp-subscribe-success">Takk! Vi varsler deg når listen endres.</p>
      ) : (
        <form className="lp-subscribe-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="navn@klinikk.no"
            disabled={status === "sending"}
            aria-label="E-postadresse"
          />
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sender..." : "Abonner"}
          </button>
          {status === "error" && <p className="lp-subscribe-error">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}
