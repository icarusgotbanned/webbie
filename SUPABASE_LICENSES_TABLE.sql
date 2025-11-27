-- Create the licenses table for storing license keys
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS licenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  license_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_licenses_user_email ON licenses(user_email);
CREATE INDEX IF NOT EXISTS idx_licenses_license_hash ON licenses(license_hash);
CREATE INDEX IF NOT EXISTS idx_licenses_expires_at ON licenses(expires_at);

-- Optional: Add RLS (Row Level Security) policies if needed
-- For now, the service role key will bypass RLS

