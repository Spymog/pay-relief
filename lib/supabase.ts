import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function initializeDatabase() {
  try {
    // Create signups table if it doesn't exist
    const { error } = await supabase.rpc('exec', {
      sql: `
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

        CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
        CREATE INDEX IF NOT EXISTS idx_signups_type ON signups(signup_type);

        ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

        CREATE POLICY IF NOT EXISTS "Allow public signups" ON signups
          FOR INSERT
          WITH CHECK (true);

        CREATE POLICY IF NOT EXISTS "Allow reading own signups" ON signups
          FOR SELECT
          USING (true);
      `
    })

    if (error) {
      console.error('Database initialization error:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Failed to initialize database:', err)
    return false
  }
}
