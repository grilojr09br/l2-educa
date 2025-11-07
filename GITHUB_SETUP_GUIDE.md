# 🐙 Complete GitHub Setup Guide

Step-by-step guide to push your L2 EDUCA project to GitHub for easy deployment.

---

## 📋 Prerequisites

- ✅ Your L2 EDUCA project on your computer
- ✅ Git installed (we'll check/install if needed)
- ✅ Internet connection

---

## Part 1: Check if Git is Installed

Open your terminal/command prompt and run:

```bash
git --version
```

### **If you see a version (like `git version 2.x.x`):**
✅ Git is installed! Skip to Part 2.

### **If you get "command not found" or error:**
Install Git:

#### **Windows:**
1. Download from: https://git-scm.com/download/win
2. Run installer (use default settings)
3. Restart your terminal
4. Verify: `git --version`

#### **Mac:**
```bash
# Install using Homebrew
brew install git

# OR install Xcode Command Line Tools
xcode-select --install
```

#### **Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RHEL
```

---

## Part 2: Create GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click **"Sign up"**
3. Enter your email, create password, choose username
4. Verify email
5. Choose "Free" plan

✅ Done! You now have a GitHub account.

---

## Part 3: Create a New Repository on GitHub

1. **Log in to GitHub**
2. **Click the "+" icon** (top right) → **"New repository"**
3. **Fill in details:**
   - Repository name: `l2-educa` (or whatever you prefer)
   - Description: `Educational platform for students`
   - **Privacy:** 
     - ✅ **Public** (recommended for free deployment)
     - OR Private (if you have GitHub Pro, but some free deployment services need public repos)
   - ⚠️ **DO NOT** check "Initialize with README" (we'll push existing code)
   - **DO NOT** add .gitignore or license yet

4. **Click "Create repository"**

5. **Copy the repository URL** shown on the next page:
   ```
   https://github.com/your-username/l2-educa.git
   ```
   Keep this URL handy!

---

## Part 4: Prepare Your Project

### **Step 1: Open Terminal in Your Project Folder**

Navigate to your project root directory:

```bash
# Windows (PowerShell or CMD)
cd "C:\Users\davie\OneDrive\Área de Trabalho\AI\EDU\Educational web page creator"

# Mac/Linux
cd "/path/to/your/Educational web page creator"
```

Verify you're in the right place:
```bash
# You should see your folders
ls
# Should show: l2-educa, l2-educa-backend, dev-manager.bat, etc.
```

---

### **Step 2: Initialize Git (if not already done)**

Check if git is already initialized:
```bash
git status
```

#### **If you see "not a git repository":**
Initialize git:
```bash
git init
```

#### **If you see files listed:**
✅ Git is already initialized! Continue to next step.

---

### **Step 3: Create .gitignore File**

This tells Git which files to ignore (like node_modules, .env files).

Create a file named `.gitignore` in your project root:

```bash
# Windows
echo. > .gitignore

# Mac/Linux
touch .gitignore
```

Open `.gitignore` and add this content:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env
.env.local
.env.production
.env.*.local

# Build output (we keep dist/ for deployment)
# dist/  # Don't ignore dist/ - we need it for production

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# Temporary files
temp_*/
*.zip

# Cache
.cache/
.temp/
*.tmp

# Test coverage
coverage/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# PM2
.pm2/
```

Save the file.

---

### **Step 4: Configure Git (First Time Only)**

Set your name and email (this appears in commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Example:
```bash
git config --global user.name "Davie Silva"
git config --global user.email "davie@example.com"
```

Verify:
```bash
git config --global --list
```

---

## Part 5: Add Files to Git

### **Step 1: Check Current Status**

```bash
git status
```

You'll see a list of "untracked files" (files not yet added to git).

---

### **Step 2: Add All Files**

```bash
# Add all files (respects .gitignore)
git add .
```

⚠️ **Important:** This adds everything except what's in `.gitignore`.

Verify what was added:
```bash
git status
```

You should see files in green (staged for commit).

---

### **Step 3: Create Your First Commit**

A commit is like a "save point" of your project.

```bash
git commit -m "Initial commit: L2 EDUCA project setup"
```

The `-m` flag adds a message describing what changed.

---

## Part 6: Connect to GitHub

### **Step 1: Add GitHub as Remote**

Use the URL you copied from GitHub earlier:

```bash
git remote add origin https://github.com/your-username/l2-educa.git
```

Replace `your-username` with your actual GitHub username!

Example:
```bash
git remote add origin https://github.com/daviesilva/l2-educa.git
```

Verify:
```bash
git remote -v
```

Should show:
```
origin  https://github.com/your-username/l2-educa.git (fetch)
origin  https://github.com/your-username/l2-educa.git (push)
```

---

### **Step 2: Rename Branch to 'main' (if needed)**

GitHub uses `main` as default branch name:

```bash
# Check current branch name
git branch

# If it shows 'master', rename to 'main'
git branch -M main
```

---

### **Step 3: Push to GitHub!** 🚀

```bash
git push -u origin main
```

**First time pushing?** You'll be asked to authenticate:

#### **Authentication Methods:**

##### **Option A: GitHub Personal Access Token (Recommended)**

If prompted for password:

1. **DO NOT** use your GitHub password (it won't work!)
2. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Click "Generate new token (classic)"
4. Give it a name: "L2 EDUCA Deployment"
5. Select scopes:
   - ✅ `repo` (full control of repositories)
6. Click "Generate token"
7. **COPY THE TOKEN** (you'll only see it once!)
8. Use this token as your password when pushing

##### **Option B: SSH Keys (More Secure)**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for all prompts (default location, no passphrase)

# Copy public key
# Windows
type %USERPROFILE%\.ssh\id_ed25519.pub

# Mac/Linux
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# 1. Go to GitHub → Settings → SSH and GPG keys
# 2. Click "New SSH key"
# 3. Paste your public key
# 4. Click "Add SSH key"

# Change remote to SSH
git remote set-url origin git@github.com:your-username/l2-educa.git

# Push again
git push -u origin main
```

---

### **Step 4: Verify Upload**

1. Go to your GitHub repository: `https://github.com/your-username/l2-educa`
2. You should see all your files!
3. ✅ Success!

---

## Part 7: Make Changes and Push Updates

After you've made changes to your code:

### **Daily Workflow:**

```bash
# 1. Check what changed
git status

# 2. Add changed files
git add .
# OR add specific files
git add l2-educa/src/App.jsx

# 3. Commit with a message
git commit -m "Add user profile feature"

# 4. Push to GitHub
git push
```

That's it! 🎉

---

## 🔧 Common Git Commands Reference

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log
git log --oneline  # Compact view

# Undo changes (before commit)
git restore filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes from GitHub
git pull

# Clone repository to another computer
git clone https://github.com/your-username/l2-educa.git
```

---

## 📚 Typical Commit Messages

Good commit messages help track changes:

```bash
# Features
git commit -m "Add user authentication"
git commit -m "Implement image upload functionality"

# Bug fixes
git commit -m "Fix login redirect issue"
git commit -m "Resolve profile update error"

# Updates
git commit -m "Update dependencies"
git commit -m "Improve error handling"

# Styling
git commit -m "Update sidebar CSS"
git commit -m "Make dashboard mobile responsive"

# Documentation
git commit -m "Add deployment guide"
git commit -m "Update README"
```

---

## 🚨 Troubleshooting

### **Problem: "fatal: not a git repository"**
**Solution:**
```bash
git init
```

### **Problem: "error: failed to push"**
**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push
```

### **Problem: "error: src refspec main does not match any"**
**Solution:**
```bash
# You haven't committed anything yet
git add .
git commit -m "Initial commit"
git push -u origin main
```

### **Problem: "Support for password authentication was removed"**
**Solution:** Use Personal Access Token instead of password (see Authentication section)

### **Problem: "Permission denied (publickey)"**
**Solution:** Set up SSH keys or use HTTPS with token (see Authentication section)

### **Problem: Files not uploading**
**Solution:**
```bash
# Check .gitignore - make sure files aren't ignored
cat .gitignore

# Force add if needed
git add -f filename.js
```

### **Problem: Too large repository**
**Solution:**
```bash
# Check size
du -sh .git

# Large node_modules? Make sure it's in .gitignore
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "Remove node_modules from git"
git push
```

---

## ✅ Verification Checklist

Before deploying, verify:

- [ ] All source code is on GitHub
- [ ] `.env` files are NOT uploaded (should be in .gitignore)
- [ ] `node_modules/` is NOT uploaded (should be in .gitignore)
- [ ] `dist/` folder IS uploaded (needed for production)
- [ ] Repository is Public (or Private with proper access)
- [ ] You can see your files on GitHub.com
- [ ] All folders are present: `l2-educa`, `l2-educa-backend`, etc.

---

## 🎯 Quick Start Summary

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit"

# 4. Connect to GitHub
git remote add origin https://github.com/your-username/l2-educa.git

# 5. Rename branch
git branch -M main

# 6. Push
git push -u origin main
```

---

## 🚀 Next Steps

Once your code is on GitHub:

1. ✅ **Deploy Backend** → Railway.app (import from GitHub)
2. ✅ **Deploy Frontend** → Hostinger (upload dist folder) or Vercel (import from GitHub)
3. ✅ **Auto-deployments** → Every time you push to GitHub, Railway/Vercel auto-updates!

---

## 💡 Pro Tips

1. **Commit often** - Small, frequent commits are better than large ones
2. **Write clear messages** - Future you will thank you
3. **Pull before push** - Avoid conflicts if working from multiple computers
4. **Use branches** for features - Keep main branch stable
5. **Never commit secrets** - Always use .env files (in .gitignore)

---

## 🎉 You're Ready!

Once your code is on GitHub, you can:
- ✅ Deploy to Railway with one click
- ✅ Deploy to Vercel with one click
- ✅ Collaborate with others
- ✅ Track all changes
- ✅ Roll back if needed
- ✅ Auto-deploy on every push!

**Need help with the next step?** Ask me to guide you through Railway or Vercel deployment! 🚀

