!/usr/bin/env node

/**
 * Enterprise Thinking Indicator - Test Script
 * Automated verification of all system components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.bright}${colors.blue}${'='.repeat(60)}${colors.reset}`),
};

// Test results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

/**
 * Test 1: Check if all required files exist
 */
function testFilesExist() {
  log.section();
  console.log(`${colors.bright}Test 1: File Existence Check${colors.reset}\n`);
  
  const requiredFiles = [
    'src/hooks/useAIStreamingState.js',
    'src/components/EnterpriseThinkingIndicator.jsx',
    'src/components/ThinkingIndicatorFallback.css',
    'src/components/AIChatWidget.jsx',
    'src/components/ThinkingIndicator.css',
  ];
  
  let allExist = true;
  
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      log.success(`Found: ${file}`);
      results.passed++;
    } else {
      log.error(`Missing: ${file}`);
      results.failed++;
      allExist = false;
    }
  });
  
  return allExist;
}

/**
 * Test 2: Check imports in AIChatWidget
 */
function testImports() {
  log.section();
  console.log(`${colors.bright}Test 2: Import Verification${colors.reset}\n`);
  
  const filePath = path.join(__dirname, '..', 'src/components/AIChatWidget.jsx');
  
  if (!fs.existsSync(filePath)) {
    log.error('AIChatWidget.jsx not found');
    results.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  const requiredImports = [
    { name: 'useAIStreamingState', pattern: /import.*useAIStreamingState.*from.*hooks\/useAIStreamingState/ },
    { name: 'EnterpriseThinkingIndicator', pattern: /import.*EnterpriseThinkingIndicator.*from.*EnterpriseThinkingIndicator/ },
  ];
  
  let allImported = true;
  
  requiredImports.forEach(({ name, pattern }) => {
    if (pattern.test(content)) {
      log.success(`Import found: ${name}`);
      results.passed++;
    } else {
      log.error(`Import missing: ${name}`);
      results.failed++;
      allImported = false;
    }
  });
  
  return allImported;
}

/**
 * Test 3: Check hook implementation
 */
function testHookImplementation() {
  log.section();
  console.log(`${colors.bright}Test 3: Hook Implementation${colors.reset}\n`);
  
  const filePath = path.join(__dirname, '..', 'src/hooks/useAIStreamingState.js');
  
  if (!fs.existsSync(filePath)) {
    log.error('useAIStreamingState.js not found');
    results.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  const requiredFeatures = [
    { name: 'AI_STATES constant', pattern: /AI_STATES\s*=\s*{/ },
    { name: 'useAIStreamingState hook', pattern: /export.*useAIStreamingState/ },
    { name: 'shouldShowThinking function', pattern: /shouldShowThinking/ },
    { name: 'State machine logic', pattern: /setAiState/ },
    { name: 'Log state transition', pattern: /logStateTransition/ },
  ];
  
  let allImplemented = true;
  
  requiredFeatures.forEach(({ name, pattern }) => {
    if (pattern.test(content)) {
      log.success(`Feature found: ${name}`);
      results.passed++;
    } else {
      log.error(`Feature missing: ${name}`);
      results.failed++;
      allImplemented = false;
    }
  });
  
  return allImplemented;
}

/**
 * Test 4: Check component implementation
 */
function testComponentImplementation() {
  log.section();
  console.log(`${colors.bright}Test 4: Component Implementation${colors.reset}\n`);
  
  const filePath = path.join(__dirname, '..', 'src/components/EnterpriseThinkingIndicator.jsx');
  
  if (!fs.existsSync(filePath)) {
    log.error('EnterpriseThinkingIndicator.jsx not found');
    results.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  const requiredFeatures = [
    { name: 'Mode prop', pattern: /mode\s*=\s*['"]primary['"]/ },
    { name: 'Primary mode rendering', pattern: /mode\s*===\s*['"]primary['"]/ },
    { name: 'Simplified fallback', pattern: /mode\s*===\s*['"]simplified['"]/ },
    { name: 'Minimal fallback', pattern: /mode\s*===\s*['"]minimal['"]/ },
    { name: 'Text-only fallback', pattern: /enterprise-mode-text/ },
    { name: 'SVG brain icon', pattern: /thinking-brain-icon/ },
    { name: 'Render tracking', pattern: /renderAttempts/ },
  ];
  
  let allImplemented = true;
  
  requiredFeatures.forEach(({ name, pattern }) => {
    if (pattern.test(content)) {
      log.success(`Feature found: ${name}`);
      results.passed++;
    } else {
      log.error(`Feature missing: ${name}`);
      results.failed++;
      allImplemented = false;
    }
  });
  
  return allImplemented;
}

/**
 * Test 5: Check CSS fallback styles
 */
function testCSSFallback() {
  log.section();
  console.log(`${colors.bright}Test 5: CSS Fallback Styles${colors.reset}\n`);
  
  const filePath = path.join(__dirname, '..', 'src/components/ThinkingIndicatorFallback.css');
  
  if (!fs.existsSync(filePath)) {
    log.error('ThinkingIndicatorFallback.css not found');
    results.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  const requiredStyles = [
    { name: 'Simplified mode styles', pattern: /\.enterprise-mode-simplified/ },
    { name: 'Minimal mode styles', pattern: /\.enterprise-mode-minimal/ },
    { name: 'Text-only mode styles', pattern: /\.enterprise-mode-text/ },
    { name: 'Visibility enforcement', pattern: /visibility:\s*visible\s*!important/ },
    { name: 'Enterprise container', pattern: /\.enterprise-thinking-container/ },
  ];
  
  let allPresent = true;
  
  requiredStyles.forEach(({ name, pattern }) => {
    if (pattern.test(content)) {
      log.success(`Style found: ${name}`);
      results.passed++;
    } else {
      log.error(`Style missing: ${name}`);
      results.failed++;
      allPresent = false;
    }
  });
  
  return allPresent;
}

/**
 * Test 6: Check integration in AIChatWidget
 */
function testIntegration() {
  log.section();
  console.log(`${colors.bright}Test 6: Integration Check${colors.reset}\n`);
  
  const filePath = path.join(__dirname, '..', 'src/components/AIChatWidget.jsx');
  
  if (!fs.existsSync(filePath)) {
    log.error('AIChatWidget.jsx not found');
    results.failed++;
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  const integrationChecks = [
    { name: 'useAIStreamingState hook usage', pattern: /useAIStreamingState\(/ },
    { name: 'EnterpriseThinkingIndicator rendering', pattern: /<EnterpriseThinkingIndicator/ },
    { name: 'shouldShowThinking condition', pattern: /shouldShowThinking/ },
    { name: 'Enterprise container wrapper', pattern: /enterprise-thinking-container/ },
  ];
  
  let allIntegrated = true;
  
  integrationChecks.forEach(({ name, pattern }) => {
    if (pattern.test(content)) {
      log.success(`Integration found: ${name}`);
      results.passed++;
    } else {
      log.error(`Integration missing: ${name}`);
      results.failed++;
      allIntegrated = false;
    }
  });
  
  return allIntegrated;
}

/**
 * Main test runner
 */
function runTests() {
  console.log(`\n${colors.bright}${colors.cyan}╔${'═'.repeat(58)}╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║  ENTERPRISE THINKING INDICATOR - AUTOMATED TESTS         ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚${'═'.repeat(58)}╝${colors.reset}\n`);
  
  const tests = [
    testFilesExist,
    testImports,
    testHookImplementation,
    testComponentImplementation,
    testCSSFallback,
    testIntegration,
  ];
  
  tests.forEach(test => test());
  
  // Final summary
  log.section();
  console.log(`${colors.bright}Test Summary${colors.reset}\n`);
  
  const total = results.passed + results.failed;
  const percentage = Math.round((results.passed / total) * 100);
  
  console.log(`${colors.green}Passed:  ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed:  ${results.failed}${colors.reset}`);
  console.log(`${colors.yellow}Warnings: ${results.warnings}${colors.reset}`);
  console.log(`\n${colors.bright}Success Rate: ${percentage}%${colors.reset}\n`);
  
  if (results.failed === 0) {
    log.success('ALL TESTS PASSED! 🎉');
    console.log('\n✨ Enterprise Thinking Indicator is ready for deployment!\n');
    process.exit(0);
  } else {
    log.error('SOME TESTS FAILED');
    console.log('\n⚠️  Please review the errors above and fix them before deployment.\n');
    process.exit(1);
  }
}

// Run all tests
runTests();

