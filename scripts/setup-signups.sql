-- Create signups table for all user types
CREATE TABLE IF NOT EXISTS signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  signup_type TEXT NOT NULL CHECK (signup_type IN ('debtor', 'counselor', 'lender')),
  full_name TEXT,
  certification TEXT,
  specializations TEXT,
  experience TEXT,
  reason_for_joining TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);

-- Create index on signup_type for filtering
CREATE INDEX IF NOT EXISTS idx_signups_type ON signups(signup_type);

-- Enable Row Level Security
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users and public (for signups)
CREATE POLICY "Allow public signups" ON signups
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading own signups (if authenticated)
CREATE POLICY "Allow reading own signups" ON signups
  FOR SELECT
  USING (auth.uid() IS NULL OR auth.uid()::text = id::text);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_signups_updated_at
  BEFORE UPDATE ON signups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
