/**
 * ============================================================================
 * EMAIL VERIFICATION CONFIGURATION - DEACTIVATED
 * ============================================================================
 * 
 * STATUS: FULLY DISABLED (November 8, 2025)
 * 
 * This file controls email verification requirements for the application.
 * Currently, ALL email verification features are DISABLED.
 * 
 * HOW TO CHANGE:
 * - Use the dev-manager.bat script (option 11: Email Verification Settings)
 * - Or manually edit this file:
 *   - Set REQUIRE_EMAIL_VERIFICATION to true to enable
 *   - Set REQUIRE_EMAIL_VERIFICATION to false to disable
 * 
 * WHAT IT CONTROLS:
 * - Whether users need to verify email before accessing the app
 * - Whether verification banners/notices are shown
 * - Whether email verification checks are enforced
 * 
 * DEACTIVATION NOTES:
 * - All related UI components are imported but not rendered
 * - Components remain in codebase for future reactivation
 * - No breaking changes to authentication flow
 * 
 * ============================================================================
 */

export const EMAIL_VERIFICATION_CONFIG = {
  // Main toggle: Set to false to disable all email verification
  REQUIRE_EMAIL_VERIFICATION: false, // ⚠️ DISABLED
  
  // Show verification notice on login page after registration
  SHOW_LOGIN_NOTICE: false, // ⚠️ DISABLED
  
  // Show banner for logged-in users with unverified email
  SHOW_BANNER_WHEN_LOGGED_IN: false, // ⚠️ DISABLED
  
  // Block access to protected routes until email is verified
  BLOCK_ACCESS_UNTIL_VERIFIED: false, // ⚠️ DISABLED
};

// Helper function to check if email verification is required
export const isEmailVerificationRequired = () => {
  return EMAIL_VERIFICATION_CONFIG.REQUIRE_EMAIL_VERIFICATION;
};

// Helper function to check if verification notice should show on login
export const shouldShowLoginNotice = () => {
  return EMAIL_VERIFICATION_CONFIG.SHOW_LOGIN_NOTICE && 
         EMAIL_VERIFICATION_CONFIG.REQUIRE_EMAIL_VERIFICATION;
};

// Helper function to check if banner should show when logged in
export const shouldShowVerificationBanner = () => {
  return EMAIL_VERIFICATION_CONFIG.SHOW_BANNER_WHEN_LOGGED_IN && 
         EMAIL_VERIFICATION_CONFIG.REQUIRE_EMAIL_VERIFICATION;
};

// Helper function to check if access should be blocked
export const shouldBlockAccessUntilVerified = () => {
  return EMAIL_VERIFICATION_CONFIG.BLOCK_ACCESS_UNTIL_VERIFIED && 
         EMAIL_VERIFICATION_CONFIG.REQUIRE_EMAIL_VERIFICATION;
};

export default EMAIL_VERIFICATION_CONFIG;


