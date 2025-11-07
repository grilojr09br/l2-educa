-- =====================================================
-- L2 EDUCA - Avatar Storage Setup
-- =====================================================
-- This script sets up the avatars bucket in Supabase Storage
-- Run this in the Supabase SQL Editor
-- =====================================================

-- Create avatars bucket (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow authenticated users to upload avatars
CREATE POLICY IF NOT EXISTS "Users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Policy 2: Allow public read access
CREATE POLICY IF NOT EXISTS "Avatars are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Policy 3: Allow authenticated users to update their own avatars
CREATE POLICY IF NOT EXISTS "Users can update their avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);

-- Policy 4: Allow authenticated users to delete their own avatars
CREATE POLICY IF NOT EXISTS "Users can delete their avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- Add avatar_url column to users table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.users ADD COLUMN avatar_url TEXT;
  END IF;
END $$;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Avatar storage setup complete!';
  RAISE NOTICE 'Bucket: avatars (public)';
  RAISE NOTICE 'RLS policies: enabled';
  RAISE NOTICE 'Users table: avatar_url column added';
END $$;

