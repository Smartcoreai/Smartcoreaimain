# Ekspedenten – Favicon & Logo Pack

Generert fra `logo_smooth.png` (3000x3000 master) med trim + 8% padding
slik at ugle-merket fyller flaten skarpt ned til 16x16 px.

## Filer – hvor skal de?

### `/public` (eller static-mappen i prosjektet)
| Fil | Formål |
|---|---|
| `favicon.ico` | Browser-tab (16/32/48 multi-size) |
| `favicon-16x16.png` | Moderne browsere |
| `favicon-32x32.png` | Moderne browsere – **fikser det pikselerte tab-ikonet** |
| `favicon-96x96.png` | Windows tiles / snarveier |
| `apple-touch-icon.png` | iOS home screen (180x180, hvit bakgrunn) |
| `android-chrome-192x192.png` | Android |
| `android-chrome-512x512.png` | Android / PWA splash |
| `site.webmanifest` | PWA-manifest |

### `/public` som vanlig bilde-asset
| Fil | Formål |
|---|---|
| `ekspedenten-logo.png` | Header/footer-logo, 512x512 |
| `ekspedenten-logo@2x.png` | Retina-versjon, 1024x1024 |

## HTML `<head>`-snutt

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1a1f3a">
```

## For Next.js (app router)
Legg i stedet disse filene i `app/`:
- `app/icon.png` ← bruk `favicon-32x32.png`
- `app/apple-icon.png` ← bruk `apple-touch-icon.png`
- `app/favicon.ico` ← bruk `favicon.ico`

Next.js genererer da `<link>`-taggene automatisk.
