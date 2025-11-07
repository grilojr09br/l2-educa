-- =====================================================
-- L2 EDUCA - Fix Avatar RLS Policies
-- =====================================================
-- This script fixes common RLS policy issues for avatars
-- Run this if you're experiencing permission errors
-- =====================================================

-- Drop ALL existing avatar-related policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their avatars" ON storage.objects;
DROP POLICY IF EXISTS "Avatars are publicly accessible" ON storage.objects;

-- Ensure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow authenticated users to upload avatars (simplified)
CREATE POLICY "Users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Policy 2: Allow public read access
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Policy 3: Allow authenticated users to update their own avatars
CREATE POLICY "Users can update their avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);

-- Policy 4: Allow authenticated users to delete their own avatars
CREATE POLICY "Users can delete their avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- Verify bucket exists and is public
UPDATE storage.buckets
SET public = true
WHERE id = 'avatars';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Avatar RLS policies fixed!';
  RAISE NOTICE 'Upload: ✅ All authenticated users';
  RAISE NOTICE 'Read: ✅ Public access';
  RAISE NOTICE 'Update/Delete: ✅ Owner only';
END $$;

