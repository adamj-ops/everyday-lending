#!/usr/bin/env node

/**
 * Setup Verification Script
 *
 * Verifies that all environment variables and services are properly configured
 */

import { exec } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color codes for console output
const colors = {
  green: '\x1B[32m',
  red: '\x1B[31m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  reset: '\x1B[0m',
  bold: '\x1B[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  log('\n🔍 Checking Environment Configuration...', 'blue');

  try {
    const envPath = join(__dirname, '..', '.env.local');
    const envContent = readFileSync(envPath, 'utf8');

    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'ARCJET_KEY',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'STRIPE_SECRET_KEY',
      'PLAID_CLIENT_ID',
      'PLAID_SECRET',
      'UPSTASH_REDIS_REST_URL',
      'UPSTASH_REDIS_REST_TOKEN',
      'RESEND_API_KEY',
    ];

    const missingVars = [];
    const configuredVars = [];

    requiredVars.forEach((varName) => {
      if (envContent.includes(`${varName}=`) && !envContent.includes(`${varName}="your-`)) {
        configuredVars.push(varName);
      } else {
        missingVars.push(varName);
      }
    });

    log(`✅ Configured: ${configuredVars.length}/${requiredVars.length}`, 'green');

    if (missingVars.length > 0) {
      log(`❌ Missing or not configured:`, 'red');
      missingVars.forEach((varName) => {
        log(`   - ${varName}`, 'red');
      });
      return false;
    }

    return true;
  } catch (error) {
    log(`❌ Error reading .env.local: ${error.message}`, 'red');
    log(`   Make sure to copy .env.example to .env.local and configure it`, 'yellow');
    return false;
  }
}

function checkPackageJson() {
  log('\n📦 Checking Dependencies...', 'blue');

  try {
    const packagePath = join(__dirname, '..', 'package.json');
    const packageContent = JSON.parse(readFileSync(packagePath, 'utf8'));

    const requiredDeps = [
      '@supabase/supabase-js',
      '@clerk/nextjs',
      '@arcjet/next',
      'stripe',
      'plaid',
      '@upstash/redis',
      'xstate',
      'inngest',
      'resend',
      '@sendgrid/mail',
      'react-email',
    ];

    const missingDeps = [];
    const installedDeps = [];

    requiredDeps.forEach((dep) => {
      if (packageContent.dependencies[dep] || packageContent.devDependencies[dep]) {
        installedDeps.push(dep);
      } else {
        missingDeps.push(dep);
      }
    });

    log(`✅ Installed: ${installedDeps.length}/${requiredDeps.length}`, 'green');

    if (missingDeps.length > 0) {
      log(`❌ Missing dependencies:`, 'red');
      missingDeps.forEach((dep) => {
        log(`   - ${dep}`, 'red');
      });
      return false;
    }

    return true;
  } catch (error) {
    log(`❌ Error reading package.json: ${error.message}`, 'red');
    return false;
  }
}

function checkDirectories() {
  log('\n📁 Checking Directory Structure...', 'blue');

  const requiredDirs = [
    'src/services',
    'src/state-machines',
    'src/jobs',
    'src/lib/cache',
    'src/lib/email',
    'src/lib/storage',
    'tests/unit',
    'tests/integration',
  ];

  const missingDirs = [];
  const existingDirs = [];

  requiredDirs.forEach((dir) => {
    try {
      const dirPath = join(__dirname, '..', dir);
      readFileSync(join(dirPath, '.gitkeep'), 'utf8');
      existingDirs.push(dir);
    } catch {
      missingDirs.push(dir);
    }
  });

  log(`✅ Existing: ${existingDirs.length}/${requiredDirs.length}`, 'green');

  if (missingDirs.length > 0) {
    log(`❌ Missing directories:`, 'red');
    missingDirs.forEach((dir) => {
      log(`   - ${dir}`, 'red');
    });
    return false;
  }

  return true;
}

function checkConfigFiles() {
  log('\n⚙️  Checking Configuration Files...', 'blue');

  const requiredFiles = [
    'vitest.config.mts',
    'playwright.config.ts',
    'next.config.ts',
    'drizzle.config.ts',
    'components.json',
  ];

  const missingFiles = [];
  const existingFiles = [];

  requiredFiles.forEach((file) => {
    try {
      const filePath = join(__dirname, '..', file);
      readFileSync(filePath, 'utf8');
      existingFiles.push(file);
    } catch {
      missingFiles.push(file);
    }
  });

  log(`✅ Existing: ${existingFiles.length}/${requiredFiles.length}`, 'green');

  if (missingFiles.length > 0) {
    log(`❌ Missing files:`, 'red');
    missingFiles.forEach((file) => {
      log(`   - ${file}`, 'red');
    });
    return false;
  }

  return true;
}

async function runTests() {
  log('\n🧪 Running Tests...', 'blue');

  try {
    const execAsync = promisify(exec);

    const { stdout, stderr } = await execAsync('npm test -- --run --reporter=verbose');

    if (stderr) {
      log(`⚠️  Test warnings:`, 'yellow');
      console.log(stderr);
    }

    log(`✅ Tests completed successfully`, 'green');
    return true;
  } catch (error) {
    log(`❌ Tests failed: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('🚀 Everyday Lending Setup Verification', 'bold');
  log('=====================================', 'bold');

  const checks = [
    { name: 'Environment Configuration', fn: checkEnvFile },
    { name: 'Dependencies', fn: checkPackageJson },
    { name: 'Directory Structure', fn: checkDirectories },
    { name: 'Configuration Files', fn: checkConfigFiles },
    { name: 'Tests', fn: runTests },
  ];

  let passedChecks = 0;

  for (const check of checks) {
    try {
      const result = await check.fn();
      if (result) {
        passedChecks++;
        log(`✅ ${check.name}: PASSED`, 'green');
      } else {
        log(`❌ ${check.name}: FAILED`, 'red');
      }
    } catch (error) {
      log(`❌ ${check.name}: ERROR - ${error.message}`, 'red');
    }
  }

  log('\n📊 Summary', 'bold');
  log('===========', 'bold');
  log(`Passed: ${passedChecks}/${checks.length}`, passedChecks === checks.length ? 'green' : 'yellow');

  if (passedChecks === checks.length) {
    log('\n🎉 All checks passed! Your setup is ready.', 'green');
    log('Next steps:', 'blue');
    log('1. Set up external services (Supabase, Vercel, etc.)', 'blue');
    log('2. Configure environment variables', 'blue');
    log('3. Deploy to production', 'blue');
  } else {
    log('\n⚠️  Some checks failed. Please fix the issues above.', 'yellow');
    log('Refer to docs/environment-setup-guide.md for detailed instructions.', 'blue');
  }
}

// Run the verification
main().catch((error) => {
  log(`❌ Verification failed: ${error.message}`, 'red');
  process.exit(1);
});
