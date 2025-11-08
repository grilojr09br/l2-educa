# ================================================================
# L2 EDUCA - Email Verification Settings Manager
# Version: 1.0.0
# ================================================================

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("enable", "disable", "status", "help")]
    [string]$Action = "help"
)

# Configuration
$ConfigFile = Join-Path $PSScriptRoot "..\src\config\emailVerification.js"
$Encoding = [System.Text.UTF8Encoding]::new($false) # UTF-8 without BOM

# Colors
$ColorSuccess = "Green"
$ColorWarning = "Yellow"
$ColorError = "Red"
$ColorInfo = "Cyan"

# Helper function to display header
function Show-Header {
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host "                                                             " -ForegroundColor $ColorInfo
    Write-Host "        L2 EDUCA - Email Verification Manager                " -ForegroundColor $ColorInfo
    Write-Host "                                                             " -ForegroundColor $ColorInfo
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host ""
}

# Helper function to read current configuration
function Get-CurrentConfig {
    if (-not (Test-Path $ConfigFile)) {
        Write-Host "[ERROR] Configuration file not found: $ConfigFile" -ForegroundColor $ColorError
        exit 1
    }
    
    $content = Get-Content $ConfigFile -Raw -Encoding UTF8
    
    # Extract current settings using regex
    $requireVerification = $content -match 'REQUIRE_EMAIL_VERIFICATION:\s*(true|false)' | Out-Null
    $require = if ($requireVerification) { $Matches[1] -eq "true" } else { $false }
    
    $showLoginNotice = $content -match 'SHOW_LOGIN_NOTICE:\s*(true|false)' | Out-Null
    $login = if ($showLoginNotice) { $Matches[1] -eq "true" } else { $false }
    
    $showBanner = $content -match 'SHOW_BANNER_WHEN_LOGGED_IN:\s*(true|false)' | Out-Null
    $banner = if ($showBanner) { $Matches[1] -eq "true" } else { $false }
    
    $blockAccess = $content -match 'BLOCK_ACCESS_UNTIL_VERIFIED:\s*(true|false)' | Out-Null
    $block = if ($blockAccess) { $Matches[1] -eq "true" } else { $false }
    
    return @{
        RequireVerification = $require
        ShowLoginNotice = $login
        ShowBanner = $banner
        BlockAccess = $block
    }
}

# Helper function to update configuration
function Set-EmailVerificationConfig {
    param(
        [bool]$Enable
    )
    
    if (-not (Test-Path $ConfigFile)) {
        Write-Host "[ERROR] Configuration file not found: $ConfigFile" -ForegroundColor $ColorError
        exit 1
    }
    
    $content = Get-Content $ConfigFile -Raw -Encoding UTF8
    
    # Convert bool to string
    $value = if ($Enable) { "true" } else { "false" }
    
    # Update all settings
    $content = $content -replace '(REQUIRE_EMAIL_VERIFICATION:\s*)(true|false)', "`$1$value"
    $content = $content -replace '(SHOW_LOGIN_NOTICE:\s*)(true|false)', "`$1$value"
    $content = $content -replace '(SHOW_BANNER_WHEN_LOGGED_IN:\s*)(true|false)', "`$1$value"
    $content = $content -replace '(BLOCK_ACCESS_UNTIL_VERIFIED:\s*)(true|false)', "`$1$value"
    
    # Write back to file with UTF-8 encoding (no BOM)
    [System.IO.File]::WriteAllText($ConfigFile, $content, $Encoding)
    
    Write-Host "[SUCCESS] Configuration updated successfully!" -ForegroundColor $ColorSuccess
}

# Helper function to display status
function Show-Status {
    $config = Get-CurrentConfig
    
    Write-Host "-------------------------------------------------------------" -ForegroundColor $ColorInfo
    Write-Host "                    Current Settings                         " -ForegroundColor $ColorInfo
    Write-Host "-------------------------------------------------------------" -ForegroundColor $ColorInfo
    Write-Host ""
    
    $status = if ($config.RequireVerification) { "[ENABLED]" } else { "[DISABLED]" }
    $statusColor = if ($config.RequireVerification) { $ColorSuccess } else { $ColorWarning }
    
    Write-Host "  Email Verification: " -NoNewline
    Write-Host $status -ForegroundColor $statusColor
    Write-Host ""
    
    Write-Host "  Detailed Settings:" -ForegroundColor Gray
    Write-Host "    - Require Verification:  " -NoNewline -ForegroundColor Gray
    Write-Host $(if ($config.RequireVerification) { "ON" } else { "OFF" }) -ForegroundColor $(if ($config.RequireVerification) { $ColorSuccess } else { $ColorWarning })
    
    Write-Host "    - Show Login Notice:     " -NoNewline -ForegroundColor Gray
    Write-Host $(if ($config.ShowLoginNotice) { "ON" } else { "OFF" }) -ForegroundColor $(if ($config.ShowLoginNotice) { $ColorSuccess } else { $ColorWarning })
    
    Write-Host "    - Show Banner:           " -NoNewline -ForegroundColor Gray
    Write-Host $(if ($config.ShowBanner) { "ON" } else { "OFF" }) -ForegroundColor $(if ($config.ShowBanner) { $ColorSuccess } else { $ColorWarning })
    
    Write-Host "    - Block Access:          " -NoNewline -ForegroundColor Gray
    Write-Host $(if ($config.BlockAccess) { "ON" } else { "OFF" }) -ForegroundColor $(if ($config.BlockAccess) { $ColorSuccess } else { $ColorWarning })
    
    Write-Host ""
}

# Helper function to show help
function Show-Help {
    Write-Host "Usage:" -ForegroundColor $ColorInfo
    Write-Host "  powershell -ExecutionPolicy Bypass -File toggle-email-verification.ps1 [action]" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor $ColorInfo
    Write-Host "  enable   - Enable email verification (users must verify email)" -ForegroundColor Gray
    Write-Host "  disable  - Disable email verification (default, no verification needed)" -ForegroundColor Gray
    Write-Host "  status   - Show current settings" -ForegroundColor Gray
    Write-Host "  help     - Show this help message" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $ColorInfo
    Write-Host "  .\toggle-email-verification.ps1 enable" -ForegroundColor Gray
    Write-Host "  .\toggle-email-verification.ps1 disable" -ForegroundColor Gray
    Write-Host "  .\toggle-email-verification.ps1 status" -ForegroundColor Gray
    Write-Host ""
}

# Main execution
Show-Header

switch ($Action) {
    "enable" {
        Write-Host "[*] Enabling email verification..." -ForegroundColor $ColorInfo
        Write-Host ""
        Set-EmailVerificationConfig -Enable $true
        Write-Host ""
        Write-Host "[INFO] What this means:" -ForegroundColor $ColorInfo
        Write-Host "  + Users must verify their email before accessing the app" -ForegroundColor Gray
        Write-Host "  + Verification notices will be shown" -ForegroundColor Gray
        Write-Host "  + Verification banner will appear for unverified users" -ForegroundColor Gray
        Write-Host "  + Access will be blocked until email is verified" -ForegroundColor Gray
        Write-Host ""
        Show-Status
    }
    
    "disable" {
        Write-Host "[*] Disabling email verification..." -ForegroundColor $ColorInfo
        Write-Host ""
        Set-EmailVerificationConfig -Enable $false
        Write-Host ""
        Write-Host "[INFO] What this means:" -ForegroundColor $ColorInfo
        Write-Host "  + Users can access the app without verifying email" -ForegroundColor Gray
        Write-Host "  + No verification notices will be shown" -ForegroundColor Gray
        Write-Host "  + No verification banners will appear" -ForegroundColor Gray
        Write-Host "  + Access is granted immediately after registration" -ForegroundColor Gray
        Write-Host ""
        Show-Status
    }
    
    "status" {
        Show-Status
    }
    
    "help" {
        Show-Help
    }
}

Write-Host "=============================================================" -ForegroundColor $ColorInfo
Write-Host ""

# Pause if run directly (not from dev-manager)
if ($Host.Name -eq "ConsoleHost") {
    Write-Host "Press any key to continue..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

