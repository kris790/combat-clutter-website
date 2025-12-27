#!/usr/bin/env node

/**
 * Combat Clutter LLC - Brand Validation Script
 * 
 * Scans the codebase for incorrect brand usage and reports violations.
 * Run before commits to ensure brand consistency.
 * 
 * Usage:
 *   node scripts/validate-brand.js
 *   npm run validate-brand
 */

const fs = require('fs');
const path = require('path');

// Brand validation rules
const BRAND_RULES = {
  correct: ['Combat Clutter LLC', 'Combat Clutter'],
  incorrect: [
    'combat clutter',        // lowercase
    'CombatClutter',        // no space
    'Combat Clutter llc',   // lowercase llc
    'Combat-Clutter',       // hyphenated
    'COMBAT CLUTTER',       // all caps
    'Combat clutter',       // mixed case
  ],
  contexts: {
    legal: 'Combat Clutter LLC',
    conversational: 'Combat Clutter',
  }
};

// Directories to scan
const SCAN_DIRECTORIES = [
  'src/app',
  'src/components',
  'src/lib',
];

// File extensions to check
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx'];

// Files to ignore
const IGNORE_PATTERNS = [
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  'combat-clutter-spec.json',
];

let violations = [];
let filesScanned = 0;

/**
 * Check if file should be scanned
 */
function shouldScanFile(filePath) {
  const ext = path.extname(filePath);
  if (!FILE_EXTENSIONS.includes(ext)) return false;
  
  for (const pattern of IGNORE_PATTERNS) {
    if (filePath.includes(pattern)) return false;
  }
  
  return true;
}

/**
 * Scan file for brand violations
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, lineNumber) => {
    BRAND_RULES.incorrect.forEach(incorrectTerm => {
      // Case-sensitive check for specific violations
      if (line.includes(incorrectTerm)) {
        // Allow social media handles (e.g., CombatClutterLLC for Facebook/Instagram)
        const isSocialHandle = /['"]CombatClutter[A-Z]*['"]/.test(line) && 
          (line.includes('facebook') || line.includes('instagram') || 
           line.includes('twitter') || line.includes('linkedin') || 
           line.includes('social') || line.includes('Social'));
        
        if (!isSocialHandle) {
          violations.push({
            file: filePath,
            line: lineNumber + 1,
            incorrectTerm,
            lineContent: line.trim(),
            suggestion: detectContext(line) === 'legal' 
              ? BRAND_RULES.contexts.legal 
              : BRAND_RULES.contexts.conversational
          });
        }
      }
    });
  });
  
  filesScanned++;
}

/**
 * Detect if context is legal or conversational
 */
function detectContext(line) {
  const legalKeywords = ['copyright', '©', 'terms', 'privacy', 'legal', 'LLC'];
  const lowerLine = line.toLowerCase();
  
  for (const keyword of legalKeywords) {
    if (lowerLine.includes(keyword.toLowerCase())) {
      return 'legal';
    }
  }
  
  return 'conversational';
}

/**
 * Recursively scan directory
 */
function scanDirectory(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        if (!IGNORE_PATTERNS.some(pattern => fullPath.includes(pattern))) {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile() && shouldScanFile(fullPath)) {
        scanFile(fullPath);
      }
    });
  } catch (err) {
    // Directory doesn't exist, skip silently
  }
}

/**
 * Format and print violations
 */
function printViolations() {
  if (violations.length === 0) {
    console.log('✅ Brand validation passed! No violations found.');
    console.log(`   Scanned ${filesScanned} files.`);
    return true;
  }
  
  console.log('❌ Brand validation failed!\n');
  console.log(`Found ${violations.length} violation(s) in ${filesScanned} files:\n`);
  
  violations.forEach((violation, index) => {
    console.log(`${index + 1}. ${violation.file}:${violation.line}`);
    console.log(`   Incorrect: "${violation.incorrectTerm}"`);
    console.log(`   Should be: "${violation.suggestion}"`);
    console.log(`   Line: ${violation.lineContent}`);
    console.log();
  });
  
  console.log('Fix these violations and run validation again.');
  return false;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning codebase for Combat Clutter brand violations...\n');
  
  // Check if directories exist
  const existingDirs = SCAN_DIRECTORIES.filter(dir => {
    try {
      return fs.existsSync(dir);
    } catch {
      return false;
    }
  });
  
  if (existingDirs.length === 0) {
    console.log('⚠️  No source directories found. Skipping validation.');
    console.log('   Expected directories:', SCAN_DIRECTORIES.join(', '));
    return;
  }
  
  // Scan each directory
  existingDirs.forEach(dir => {
    console.log(`Scanning ${dir}/...`);
    scanDirectory(dir);
  });
  
  console.log();
  const success = printViolations();
  
  // Exit with error code if violations found
  process.exit(success ? 0 : 1);
}

// Run the script
main();
