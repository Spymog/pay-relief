# PayRelief Database Setup Guide

## Overview

The signup forms on PayRelief use Supabase to store user email signups. This guide walks you through setting up the required database tables.

## Setup Steps

### 1. Go to Supabase Console

1. Visit [https://app.supabase.com](https://app.supabase.com)
2. Select your PayRelief project
3. Navigate to the SQL Editor

### 2. Create the Signups Table

Copy and paste the following SQL into the SQL Editor and run it:

```sql
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

-- Create policy to allow inserts from anyone (for public signups)
CREATE POLICY "Allow public signups" ON signups
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading all signups (you can restrict this later)
CREATE POLICY "Allow reading signups" ON signups
  FOR SELECT
  USING (true);
```

### 3. Verify Environment Variables

Make sure your `.env.local` file (or Vercel environment variables) contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

You can find these values in:
- Supabase Console → Project Settings → API

## API Endpoint

The signup form submissions are handled by the API endpoint:
- **POST** `/api/signups`

### Request Body

```json
{
  "email": "user@example.com",
  "signup_type": "debtor|counselor|lender",
  "full_name": "Optional for debtors",
  "certification": "Optional for counselors",
  "specializations": "Optional for counselors",
  "experience": "Optional for counselors",
  "reason_for_joining": "Optional for counselors/lenders"
}
```

### Response

- **201 Created**: Signup saved successfully
- **400 Bad Request**: Invalid email or missing required fields
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Database error

## Database Schema

### signups Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| email | TEXT | User email (UNIQUE) |
| signup_type | TEXT | One of: 'debtor', 'counselor', 'lender' |
| full_name | TEXT | Full name (optional) |
| certification | TEXT | Counselor certification (optional) |
| specializations | TEXT | Counselor specializations (optional) |
| experience | TEXT | Years of experience (optional) |
| reason_for_joining | TEXT | Reason for joining (optional) |
| created_at | TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | Updated timestamp |

## Testing

### Using curl

```bash
curl -X POST http://localhost:3000/api/signups \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "signup_type": "debtor"
  }'
```

### Using the UI

1. Visit http://localhost:3000/for-debtors
2. Scroll to the signup form
3. Enter your email and click "Join Now"
4. Check Supabase console to verify the signup was recorded

## Troubleshooting

### "Missing Supabase environment variables"
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Restart your development server after adding environment variables

### "This email is already registered"
- The email exists in the database
- Use a different email address for testing

### Table doesn't exist
- Make sure you ran the SQL setup script in step 2
- Check the Supabase SQL Editor for any errors
