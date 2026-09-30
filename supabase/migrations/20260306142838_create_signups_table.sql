
CREATE TABLE IF NOT EXISTS signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  signup_type VARCHAR(50) NOT NULL CHECK (signup_type IN ('debtor', 'counselor', 'lender')),
  full_name VARCHAR(255),
  certification VARCHAR(255),
  specializations TEXT,
  experience TEXT,
  reason_for_joining TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);

-- Enable Row Level Security
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: allow inserts (public can sign up)
CREATE POLICY "Allow public signups" ON signups
  FOR INSERT
  WITH CHECK (true);

-- Create RLS policy: allow service role to read all signups
CREATE POLICY "Service role can read signups" ON signups
  FOR SELECT
  USING (auth.role() = 'service_role');
;
