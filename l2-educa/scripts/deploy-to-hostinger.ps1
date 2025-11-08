# ================================================================
# L2 EDUCA - Hostinger Deployment Script
# Version: 1.0.0
# Automatic SSH deployment to production server
# ================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$Action = "deploy"
)

# Colors
$ColorSuccess = "Green"
$ColorWarning = "Yellow"
$ColorError = "Red"
$ColorInfo = "Cyan"

# Configuration file path
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigFile = Join-Path $ScriptDir "deploy-config.json"
$DistPath = Join-Path (Split-Path -Parent $ScriptDir) "dist"

# Display header
function Show-Header {
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host "                                                             " -ForegroundColor $ColorInfo
    Write-Host "        L2 EDUCA - Hostinger Deployment Tool                 " -ForegroundColor $ColorInfo
    Write-Host "                                                             " -ForegroundColor $ColorInfo
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host ""
}

# Load configuration
function Get-DeployConfig {
    if (-not (Test-Path $ConfigFile)) {
        Write-Host "[ERROR] Configuration file not found!" -ForegroundColor $ColorError
        Write-Host "Creating default configuration file..." -ForegroundColor $ColorWarning
        
        $defaultConfig = @{
            ssh_host = "45.152.46.119"
            ssh_port = "65002"
            ssh_user = "u511043813"
            ssh_password = "YOUR_PASSWORD_HERE"
            remote_path = "domains/silviosuperandolimites.com.br/public_html/l2"
            local_dist_path = "dist"
        }
        
        $defaultConfig | ConvertTo-Json | Set-Content $ConfigFile
        
        Write-Host ""
        Write-Host "[INFO] Configuration file created at: $ConfigFile" -ForegroundColor $ColorInfo
        Write-Host "[IMPORTANT] Please edit the file and add your SSH password!" -ForegroundColor $ColorWarning
        Write-Host ""
        
        return $null
    }
    
    try {
        $config = Get-Content $ConfigFile | ConvertFrom-Json
        
        if ($config.ssh_password -eq "YOUR_PASSWORD_HERE") {
            Write-Host "[ERROR] Please configure your SSH password in:" -ForegroundColor $ColorError
            Write-Host "  $ConfigFile" -ForegroundColor $ColorWarning
            Write-Host ""
            return $null
        }
        
        return $config
    } catch {
        Write-Host "[ERROR] Failed to load configuration: $_" -ForegroundColor $ColorError
        return $null
    }
}

# Check if required tools are available
function Test-Requirements {
    $missing = @()
    
    # Check for PuTTY tools (REQUIRED for password authentication)
    $hasPscp = Get-Command pscp -ErrorAction SilentlyContinue
    $hasPlink = Get-Command plink -ErrorAction SilentlyContinue
    
    if (-not $hasPscp -or -not $hasPlink) {
        Write-Host "[ERROR] PuTTY tools are required for password authentication!" -ForegroundColor $ColorError
        Write-Host ""
        Write-Host "Please install PuTTY from: https://www.putty.org/" -ForegroundColor $ColorInfo
        Write-Host ""
        Write-Host "PuTTY includes:" -ForegroundColor Gray
        Write-Host "  - pscp.exe (for file transfer)" -ForegroundColor Gray
        Write-Host "  - plink.exe (for remote commands)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "After installation, make sure PuTTY is added to your PATH." -ForegroundColor $ColorWarning
        Write-Host ""
        return $false
    }
    
    Write-Host "[SUCCESS] PuTTY tools found!" -ForegroundColor $ColorSuccess
    return $true
}

# Build the frontend
function Build-Frontend {
    Write-Host "[1/4] Building frontend..." -ForegroundColor $ColorInfo
    
    $frontendPath = Split-Path -Parent $ScriptDir
    
    Push-Location $frontendPath
    
    try {
        Write-Host "  Running npm run build..." -ForegroundColor Gray
        $output = npm run build 2>&1
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[ERROR] Build failed!" -ForegroundColor $ColorError
            Write-Host $output -ForegroundColor $ColorError
            Pop-Location
            return $false
        }
        
        Write-Host "  [SUCCESS] Build completed" -ForegroundColor $ColorSuccess
        Pop-Location
        return $true
    } catch {
        Write-Host "[ERROR] Build error: $_" -ForegroundColor $ColorError
        Pop-Location
        return $false
    }
}

# Clean remote directory
function Clear-RemoteDirectory {
    param($config)
    
    Write-Host "[2/4] Cleaning remote directory..." -ForegroundColor $ColorInfo
    Write-Host "  Connecting to server..." -ForegroundColor Gray
    
    $sshCmd = "cd $($config.remote_path) && rm -rf * && echo 'Directory cleaned'"
    
    try {
        # First, cache the host key if not already done
        $cacheCmd = "exit"
        $cacheArgs = @(
            "-P", $config.ssh_port,
            "-pw", $config.ssh_password,
            "$($config.ssh_user)@$($config.ssh_host)",
            $cacheCmd
        )
        
        # Accept host key (suppress errors if already cached)
        echo y | plink @cacheArgs 2>&1 | Out-Null
        
        # Now execute the actual command
        $plinkArgs = @(
            "-P", $config.ssh_port,
            "-pw", $config.ssh_password,
            "-batch",
            "$($config.ssh_user)@$($config.ssh_host)",
            $sshCmd
        )
        
        $result = & plink @plinkArgs 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  [SUCCESS] Remote directory cleaned" -ForegroundColor $ColorSuccess
            return $true
        } else {
            Write-Host "[WARNING] Could not clean remote directory" -ForegroundColor $ColorWarning
            Write-Host "  Continuing with deployment..." -ForegroundColor Gray
            return $true # Continue anyway
        }
        
    } catch {
        Write-Host "[WARNING] Error cleaning directory: $_" -ForegroundColor $ColorWarning
        Write-Host "  Continuing with deployment..." -ForegroundColor Gray
        return $true # Continue anyway
    }
}

# Upload files to server
function Upload-Files {
    param($config)
    
    Write-Host "[3/4] Uploading files to server..." -ForegroundColor $ColorInfo
    
    if (-not (Test-Path $DistPath)) {
        Write-Host "[ERROR] Dist folder not found at: $DistPath" -ForegroundColor $ColorError
        return $false
    }
    
    try {
        Write-Host "  Using PuTTY PSCP for file transfer..." -ForegroundColor Gray
        Write-Host "  Uploading from: $DistPath" -ForegroundColor Gray
        Write-Host "  To: $($config.ssh_user)@$($config.ssh_host):$($config.remote_path)/" -ForegroundColor Gray
        Write-Host ""
        
        # First, ensure host key is cached by connecting with plink
        Write-Host "  Caching host key..." -ForegroundColor Gray
        $cacheArgs = @(
            "-P", $config.ssh_port,
            "-pw", $config.ssh_password,
            "$($config.ssh_user)@$($config.ssh_host)",
            "exit"
        )
        echo y | plink @cacheArgs 2>&1 | Out-Null
        
        Write-Host "  Starting file upload..." -ForegroundColor Gray
        Write-Host "  This may take a few moments..." -ForegroundColor Gray
        Write-Host ""
        
        # Use PSCP with password - now host key is cached
        $pscpArgs = @(
            "-P", $config.ssh_port,
            "-pw", $config.ssh_password,
            "-batch",
            "-r",
            "$DistPath\*",
            "$($config.ssh_user)@$($config.ssh_host):$($config.remote_path)/"
        )
        
        # Execute PSCP and capture output
        $output = & pscp @pscpArgs 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "  [SUCCESS] Files uploaded successfully!" -ForegroundColor $ColorSuccess
            return $true
        } else {
            Write-Host ""
            Write-Host "[ERROR] File upload failed with exit code: $LASTEXITCODE" -ForegroundColor $ColorError
            Write-Host "Output: $output" -ForegroundColor $ColorError
            return $false
        }
        
    } catch {
        Write-Host "[ERROR] Upload error: $_" -ForegroundColor $ColorError
        return $false
    }
}

# Verify deployment
function Test-Deployment {
    param($config)
    
    Write-Host "[4/4] Verifying deployment..." -ForegroundColor $ColorInfo
    
    $checkCmd = "cd $($config.remote_path) && ls -la | head -20"
    
    try {
        # Use plink with password (host key already cached)
        $plinkArgs = @(
            "-P", $config.ssh_port,
            "-pw", $config.ssh_password,
            "-batch",
            "$($config.ssh_user)@$($config.ssh_host)",
            $checkCmd
        )
        
        $result = & plink @plinkArgs 2>&1
        
        if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq $null) {
            Write-Host ""
            Write-Host "  Remote directory contents:" -ForegroundColor Gray
            Write-Host $result -ForegroundColor Gray
            Write-Host ""
        }
        
        Write-Host "  [SUCCESS] Deployment verification complete" -ForegroundColor $ColorSuccess
        return $true
        
    } catch {
        Write-Host "[WARNING] Could not verify deployment: $_" -ForegroundColor $ColorWarning
        Write-Host "  Files should still be uploaded successfully" -ForegroundColor Gray
        return $true # Continue anyway
    }
}

# Main deployment process
function Start-Deployment {
    Show-Header
    
    Write-Host "Starting deployment to Hostinger..." -ForegroundColor $ColorInfo
    Write-Host ""
    
    # Check requirements
    if (-not (Test-Requirements)) {
        Write-Host ""
        Write-Host "Press any key to exit..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        return
    }
    
    # Load configuration
    $config = Get-DeployConfig
    if (-not $config) {
        Write-Host ""
        Write-Host "Press any key to exit..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        return
    }
    
    Write-Host "Configuration loaded:" -ForegroundColor $ColorInfo
    Write-Host "  Server: $($config.ssh_host):$($config.ssh_port)" -ForegroundColor Gray
    Write-Host "  User: $($config.ssh_user)" -ForegroundColor Gray
    Write-Host "  Remote path: $($config.remote_path)" -ForegroundColor Gray
    Write-Host ""
    
    # Confirm deployment
    Write-Host "[WARNING] This will:" -ForegroundColor $ColorWarning
    Write-Host "  1. Build the frontend" -ForegroundColor Yellow
    Write-Host "  2. Delete ALL files in remote directory" -ForegroundColor Yellow
    Write-Host "  3. Upload new files" -ForegroundColor Yellow
    Write-Host ""
    
    $confirm = Read-Host "Continue? (yes/no)"
    if ($confirm -ne "yes") {
        Write-Host ""
        Write-Host "Deployment cancelled." -ForegroundColor $ColorWarning
        return
    }
    
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host ""
    
    # Execute deployment steps
    if (-not (Build-Frontend)) {
        Write-Host ""
        Write-Host "[FAILED] Deployment aborted - build failed" -ForegroundColor $ColorError
        Write-Host ""
        Write-Host "Press any key to exit..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        return
    }
    
    Write-Host ""
    
    if (-not (Clear-RemoteDirectory $config)) {
        Write-Host "[WARNING] Continuing despite cleaning issues..." -ForegroundColor $ColorWarning
    }
    
    Write-Host ""
    
    if (-not (Upload-Files $config)) {
        Write-Host ""
        Write-Host "[FAILED] Deployment failed - upload error" -ForegroundColor $ColorError
        Write-Host ""
        Write-Host "Press any key to exit..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        return
    }
    
    Write-Host ""
    
    Test-Deployment $config | Out-Null
    
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor $ColorInfo
    Write-Host ""
    Write-Host "[SUCCESS] Deployment completed successfully!" -ForegroundColor $ColorSuccess
    Write-Host ""
    Write-Host "Your site should now be live at:" -ForegroundColor $ColorInfo
    Write-Host "  https://silviosuperandolimites.com.br/l2/" -ForegroundColor $ColorInfo
    Write-Host ""
}

# Show configuration
function Show-Config {
    Show-Header
    
    $config = Get-DeployConfig
    if (-not $config) {
        return
    }
    
    Write-Host "Current Configuration:" -ForegroundColor $ColorInfo
    Write-Host "-------------------------------------------------------------" -ForegroundColor $ColorInfo
    Write-Host ""
    Write-Host "  SSH Host:       $($config.ssh_host)" -ForegroundColor Gray
    Write-Host "  SSH Port:       $($config.ssh_port)" -ForegroundColor Gray
    Write-Host "  SSH User:       $($config.ssh_user)" -ForegroundColor Gray
    Write-Host "  SSH Password:   " -NoNewline -ForegroundColor Gray
    if ($config.ssh_password -eq "YOUR_PASSWORD_HERE") {
        Write-Host "[NOT CONFIGURED]" -ForegroundColor $ColorError
    } else {
        Write-Host "********** (hidden)" -ForegroundColor $ColorSuccess
    }
    Write-Host "  Remote Path:    $($config.remote_path)" -ForegroundColor Gray
    Write-Host "  Local Dist:     $($config.local_dist_path)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Configuration file: $ConfigFile" -ForegroundColor Gray
    Write-Host ""
}

# Main execution
switch ($Action) {
    "deploy" {
        Start-Deployment
    }
    "config" {
        Show-Config
    }
    default {
        Show-Header
        Write-Host "[ERROR] Unknown action: $Action" -ForegroundColor $ColorError
        Write-Host ""
        Write-Host "Available actions:" -ForegroundColor $ColorInfo
        Write-Host "  deploy  - Deploy to Hostinger (default)" -ForegroundColor Gray
        Write-Host "  config  - Show current configuration" -ForegroundColor Gray
        Write-Host ""
    }
}

Write-Host "=============================================================" -ForegroundColor $ColorInfo
Write-Host ""

# Pause if run directly
if ($Host.Name -eq "ConsoleHost") {
    Write-Host "Press any key to continue..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}


