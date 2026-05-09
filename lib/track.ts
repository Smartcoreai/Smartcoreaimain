/**
 * Lightweight analytics shim.
 *
 * No-op until Plausible / PostHog / GA4 / GTM is loaded on window. Once any of
 * them are wired in (e.g. via a script tag in app/layout.tsx), events fire
 * automatically without changing call sites.
 */

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    posthog?: { capture?: (event: string, props?: Props) => void };
    gtag?: (command: "event", action: string, params?: Props) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;

  try { window.plausible?.(event, props ? { props } : undefined); } catch { /* noop */ }
  try { window.posthog?.capture?.(event, props); } catch { /* noop */ }
  try { window.gtag?.("event", event, props); } catch { /* noop */ }
  try { window.dataLayer?.push?.({ event, ...(props ?? {}) }); } catch { /* noop */ }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[track]", event, props ?? "");
  }
}
