-- =====================================================
-- L2 EDUCA - Username Management Setup
-- =====================================================
-- This script sets up username functionality with rate limiting
-- Run this in the Supabase SQL Editor
-- =====================================================

-- Add username column to users table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'username'
  ) THEN
    ALTER TABLE public.users ADD COLUMN username TEXT;
  END IF;
END $$;

-- Create unique index on username (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique_idx 
ON public.users (LOWER(username));

-- Create username_change_log table for rate limiting
CREATE TABLE IF NOT EXISTS public.username_change_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  old_username TEXT,
  new_username TEXT NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS username_change_log_user_id_idx 
ON public.username_change_log (user_id, changed_at DESC);

-- Enable RLS
ALTER TABLE public.username_change_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own change history
CREATE POLICY IF NOT EXISTS "Users can view their own username changes"
ON public.username_change_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Function to check username change eligibility (2 changes per week)
CREATE OR REPLACE FUNCTION check_username_change_eligibility(user_uuid UUID)
RETURNS TABLE(
  can_change BOOLEAN,
  changes_count INTEGER,
  days_until_reset NUMERIC
) AS $$
DECLARE
  changes_in_week INTEGER;
  oldest_change TIMESTAMPTZ;
BEGIN
  -- Count changes in the last 7 days
  SELECT COUNT(*), MIN(changed_at)
  INTO changes_in_week, oldest_change
  FROM public.username_change_log
  WHERE user_id = user_uuid
  AND changed_at > NOW() - INTERVAL '7 days';

  -- Calculate days until oldest change expires
  RETURN QUERY SELECT
    (changes_in_week < 2) AS can_change,
    changes_in_week AS changes_count,
    CASE
      WHEN changes_in_week >= 2 AND oldest_change IS NOT NULL THEN
        EXTRACT(EPOCH FROM (oldest_change + INTERVAL '7 days' - NOW())) / 86400
      ELSE
        0
    END AS days_until_reset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Username management setup complete!';
  RAISE NOTICE 'Users table: username column added';
  RAISE NOTICE 'Rate limiting: 2 changes per week';
  RAISE NOTICE 'Change log: enabled';
END $$;

