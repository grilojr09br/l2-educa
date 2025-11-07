-- ================================================
-- ENHANCE USER PROFILES FOR CHAT FUNCTIONALITY
-- ================================================
-- This script adds chat-ready fields to user_profiles table
-- Run this in Supabase SQL Editor before deploying chat feature
-- ================================================

-- Add chat-related fields to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'away')),
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS show_online_status BOOLEAN DEFAULT true;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.display_name IS 'Display name for chat (can be different from full_name)';
COMMENT ON COLUMN user_profiles.status IS 'User online status: online, offline, or away';
COMMENT ON COLUMN user_profiles.last_seen IS 'Last time user was active on the platform';
COMMENT ON COLUMN user_profiles.show_online_status IS 'Privacy setting: whether to show online status to other users';

-- Create indexes for performance (chat queries)
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(status) WHERE show_online_status = true;
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_seen ON user_profiles(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_display_name ON user_profiles(display_name);

-- Update existing rows to have default display_name (from full_name if exists)
UPDATE user_profiles 
SET display_name = COALESCE(full_name, 'Usuário')
WHERE display_name IS NULL;

-- Add trigger to automatically update last_seen when profile is updated
CREATE OR REPLACE FUNCTION update_last_seen_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_seen = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_last_seen ON user_profiles;
CREATE TRIGGER trigger_update_last_seen
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_last_seen_timestamp();

-- Grant necessary permissions (if using RLS)
-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can update own status" ON user_profiles;
DROP POLICY IF EXISTS "Users can view public online status" ON user_profiles;

-- Users can update their own status and last_seen
CREATE POLICY "Users can update own status"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can view online status of others (if show_online_status is true)
CREATE POLICY "Users can view public online status"
ON user_profiles FOR SELECT
USING (show_online_status = true OR auth.uid() = user_id);

-- ================================================
-- VERIFICATION QUERIES
-- ================================================
-- Run these to verify the migration was successful:

-- Check if columns exist
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'user_profiles' 
-- AND column_name IN ('display_name', 'status', 'last_seen', 'show_online_status');

-- Check indexes
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename = 'user_profiles' 
-- AND indexname LIKE 'idx_user_profiles_%';

-- Count users by status
-- SELECT status, COUNT(*) 
-- FROM user_profiles 
-- GROUP BY status;

-- ================================================
-- ROLLBACK (if needed)
-- ================================================
-- Uncomment and run if you need to rollback changes:

-- DROP TRIGGER IF EXISTS trigger_update_last_seen ON user_profiles;
-- DROP FUNCTION IF EXISTS update_last_seen_timestamp();
-- DROP POLICY IF EXISTS "Users can update own status" ON user_profiles;
-- DROP POLICY IF EXISTS "Users can view public online status" ON user_profiles;
-- DROP INDEX IF EXISTS idx_user_profiles_status;
-- DROP INDEX IF EXISTS idx_user_profiles_last_seen;
-- DROP INDEX IF EXISTS idx_user_profiles_display_name;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS display_name;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS status;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS last_seen;
-- ALTER TABLE user_profiles DROP COLUMN IF EXISTS show_online_status;

