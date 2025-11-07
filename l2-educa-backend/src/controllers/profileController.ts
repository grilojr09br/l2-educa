/**
 * Profile Controller
 * Handles user profile updates including username changes
 */

import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

/**
 * PATCH /api/profile/username
 * Update user's username (rate limited to 2 changes per week)
 */
export async function updateUsername(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required',
      });
      return;
    }

    const { username } = req.body;

    // Validate username
    if (!username || typeof username !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Username is required',
      });
      return;
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
      });
      return;
    }

    // Check if username is already taken
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('username', username)
      .neq('id', req.user.id)
      .single();

    if (existingUser) {
      res.status(409).json({
        success: false,
        error: 'Conflict',
        message: 'Username is already taken',
      });
      return;
    }

    // Attempt to update username
    // The trigger will automatically check the rate limit
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ username })
      .eq('id', req.user.id)
      .select('username, username_changes, last_username_change')
      .single();

    if (error) {
      // Check if it's a rate limit error
      if (error.message?.includes('limit exceeded')) {
        res.status(429).json({
          success: false,
          error: 'Too Many Requests',
          message: 'You can only change your username twice per week. Please try again later.',
        });
        return;
      }

      throw error;
    }

    console.log('✅ Username updated:', {
      userId: req.user.id,
      newUsername: username,
      changes: data.username_changes,
    });

    res.json({
      success: true,
      message: 'Username updated successfully',
      data: {
        username: data.username,
        changesRemaining: Math.max(0, 2 - (data.username_changes || 0)),
        lastChange: data.last_username_change,
      },
    });
  } catch (error: any) {
    console.error('Username update error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to update username',
    });
  }
}

/**
 * GET /api/profile/username-status
 * Check username change status (how many changes remaining this week)
 */
export async function getUsernameStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('username, username_changes, last_username_change')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    // Check if more than 7 days have passed since last change
    const daysSinceChange = data.last_username_change
      ? Math.floor((Date.now() - new Date(data.last_username_change).getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    const changesThisWeek = daysSinceChange >= 7 ? 0 : (data.username_changes || 0);
    const changesRemaining = Math.max(0, 2 - changesThisWeek);

    res.json({
      success: true,
      data: {
        username: data.username,
        changesThisWeek,
        changesRemaining,
        lastChange: data.last_username_change,
        canChange: changesRemaining > 0,
      },
    });
  } catch (error) {
    console.error('Username status error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
}

