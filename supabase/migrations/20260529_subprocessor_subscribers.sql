-- Subprocessor subscribers: e-postlister for varsel når underleverandører endres.
-- Kjøres manuelt i Supabase SQL editor (eller via psql/CLI).

CREATE TABLE IF NOT EXISTS subprocessor_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  unsubscribe_token text DEFAULT encode(gen_random_bytes(16), 'hex'),
  is_active boolean NOT NULL DEFAULT true
);
