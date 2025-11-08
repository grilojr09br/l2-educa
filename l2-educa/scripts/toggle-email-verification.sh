#!/bin/bash
# ================================================================
# L2 EDUCA - Email Verification Settings Manager (Linux/Unix)
# Version: 1.0.0
# Works with SSH on Hostinger or any Linux server
# ================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/../src/config/emailVerification.js"

# Display header
show_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                            ║${NC}"
    echo -e "${CYAN}║        L2 EDUCA - Email Verification Manager              ║${NC}"
    echo -e "${CYAN}║                    (SSH Version)                           ║${NC}"
    echo -e "${CYAN}║                                                            ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Read current configuration
get_current_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        echo -e "${RED}❌ Configuration file not found: $CONFIG_FILE${NC}"
        exit 1
    fi
    
    # Extract settings using grep and sed
    REQUIRE=$(grep "REQUIRE_EMAIL_VERIFICATION:" "$CONFIG_FILE" | sed 's/.*:\s*\(true\|false\).*/\1/')
    LOGIN_NOTICE=$(grep "SHOW_LOGIN_NOTICE:" "$CONFIG_FILE" | sed 's/.*:\s*\(true\|false\).*/\1/')
    BANNER=$(grep "SHOW_BANNER_WHEN_LOGGED_IN:" "$CONFIG_FILE" | sed 's/.*:\s*\(true\|false\).*/\1/')
    BLOCK=$(grep "BLOCK_ACCESS_UNTIL_VERIFIED:" "$CONFIG_FILE" | sed 's/.*:\s*\(true\|false\).*/\1/')
}

# Update configuration
set_config() {
    local enable=$1
    
    if [ ! -f "$CONFIG_FILE" ]; then
        echo -e "${RED}❌ Configuration file not found: $CONFIG_FILE${NC}"
        exit 1
    fi
    
    # Create backup
    cp "$CONFIG_FILE" "$CONFIG_FILE.bak"
    
    # Update settings using sed
    if [ "$enable" = "true" ]; then
        sed -i 's/REQUIRE_EMAIL_VERIFICATION:\s*false/REQUIRE_EMAIL_VERIFICATION: true/g' "$CONFIG_FILE"
        sed -i 's/SHOW_LOGIN_NOTICE:\s*false/SHOW_LOGIN_NOTICE: true/g' "$CONFIG_FILE"
        sed -i 's/SHOW_BANNER_WHEN_LOGGED_IN:\s*false/SHOW_BANNER_WHEN_LOGGED_IN: true/g' "$CONFIG_FILE"
        sed -i 's/BLOCK_ACCESS_UNTIL_VERIFIED:\s*false/BLOCK_ACCESS_UNTIL_VERIFIED: true/g' "$CONFIG_FILE"
    else
        sed -i 's/REQUIRE_EMAIL_VERIFICATION:\s*true/REQUIRE_EMAIL_VERIFICATION: false/g' "$CONFIG_FILE"
        sed -i 's/SHOW_LOGIN_NOTICE:\s*true/SHOW_LOGIN_NOTICE: false/g' "$CONFIG_FILE"
        sed -i 's/SHOW_BANNER_WHEN_LOGGED_IN:\s*true/SHOW_BANNER_WHEN_LOGGED_IN: false/g' "$CONFIG_FILE"
        sed -i 's/BLOCK_ACCESS_UNTIL_VERIFIED:\s*true/BLOCK_ACCESS_UNTIL_VERIFIED: false/g' "$CONFIG_FILE"
    fi
    
    echo -e "${GREEN}✅ Configuration updated successfully!${NC}"
    echo -e "${YELLOW}💡 Backup saved at: $CONFIG_FILE.bak${NC}"
}

# Display status
show_status() {
    get_current_config
    
    echo -e "${CYAN}┌────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│                    Current Settings                        │${NC}"
    echo -e "${CYAN}└────────────────────────────────────────────────────────────┘${NC}"
    echo ""
    
    if [ "$REQUIRE" = "true" ]; then
        echo -e "  Email Verification: ${GREEN}✅ ENABLED${NC}"
    else
        echo -e "  Email Verification: ${YELLOW}❌ DISABLED${NC}"
    fi
    echo ""
    
    echo -e "  ${BLUE}Detailed Settings:${NC}"
    if [ "$REQUIRE" = "true" ]; then
        echo -e "    • Require Verification:  ${GREEN}ON${NC}"
    else
        echo -e "    • Require Verification:  ${YELLOW}OFF${NC}"
    fi
    
    if [ "$LOGIN_NOTICE" = "true" ]; then
        echo -e "    • Show Login Notice:     ${GREEN}ON${NC}"
    else
        echo -e "    • Show Login Notice:     ${YELLOW}OFF${NC}"
    fi
    
    if [ "$BANNER" = "true" ]; then
        echo -e "    • Show Banner:           ${GREEN}ON${NC}"
    else
        echo -e "    • Show Banner:           ${YELLOW}OFF${NC}"
    fi
    
    if [ "$BLOCK" = "true" ]; then
        echo -e "    • Block Access:          ${GREEN}ON${NC}"
    else
        echo -e "    • Block Access:          ${YELLOW}OFF${NC}"
    fi
    
    echo ""
}

# Show help
show_help() {
    echo -e "${CYAN}Usage:${NC}"
    echo "  ./toggle-email-verification.sh [action]"
    echo ""
    echo -e "${CYAN}Actions:${NC}"
    echo "  enable   - Enable email verification (users must verify email)"
    echo "  disable  - Disable email verification (default, no verification needed)"
    echo "  status   - Show current settings"
    echo "  help     - Show this help message"
    echo ""
    echo -e "${CYAN}Examples:${NC}"
    echo "  ./toggle-email-verification.sh enable"
    echo "  ./toggle-email-verification.sh disable"
    echo "  ./toggle-email-verification.sh status"
    echo ""
    echo -e "${CYAN}SSH Usage (Hostinger):${NC}"
    echo "  ssh user@yourserver.com 'bash -s' < toggle-email-verification.sh enable"
    echo ""
}

# Main execution
ACTION="${1:-help}"

show_header

case "$ACTION" in
    enable)
        echo -e "${CYAN}🔐 Enabling email verification...${NC}"
        echo ""
        set_config "true"
        echo ""
        echo -e "${CYAN}📋 What this means:${NC}"
        echo "  ✓ Users must verify their email before accessing the app"
        echo "  ✓ Verification notices will be shown"
        echo "  ✓ Verification banner will appear for unverified users"
        echo "  ✓ Access will be blocked until email is verified"
        echo ""
        show_status
        echo ""
        echo -e "${YELLOW}⚠️  Important: Restart your frontend server or rebuild for changes to take effect!${NC}"
        ;;
    
    disable)
        echo -e "${CYAN}🔓 Disabling email verification...${NC}"
        echo ""
        set_config "false"
        echo ""
        echo -e "${CYAN}📋 What this means:${NC}"
        echo "  ✓ Users can access the app without verifying email"
        echo "  ✓ No verification notices will be shown"
        echo "  ✓ No verification banners will appear"
        echo "  ✓ Access is granted immediately after registration"
        echo ""
        show_status
        echo ""
        echo -e "${YELLOW}⚠️  Important: Restart your frontend server or rebuild for changes to take effect!${NC}"
        ;;
    
    status)
        show_status
        ;;
    
    help|--help|-h)
        show_help
        ;;
    
    *)
        echo -e "${RED}❌ Invalid action: $ACTION${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""

exit 0

