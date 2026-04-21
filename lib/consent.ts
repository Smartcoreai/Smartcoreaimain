export type ConsentChoices = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentData = ConsentChoices & { necessary: true };

const COOKIE_NAME = "ekspedenten-consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months

function read(): ConsentData | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.slice(COOKIE_NAME.length + 1)));
  } catch {
    return null;
  }
}

export function getConsent(): ConsentData | null {
  return read();
}

export function setConsent(choices: ConsentChoices): void {
  const data: ConsentData = { necessary: true, ...choices };
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(data)
  )};path=/;max-age=${MAX_AGE};samesite=lax`;
  window.dispatchEvent(new Event("ekspedenten-consent-updated"));
}

export function hasConsent(category: keyof ConsentChoices): boolean {
  const data = read();
  return data ? data[category] : false;
}

export function revokeConsent(): void {
  document.cookie = `${COOKIE_NAME}=;path=/;max-age=0;samesite=lax`;
  window.dispatchEvent(new Event("ekspedenten-consent-updated"));
}
