#!/usr/bin/env node

/**
 * This script updates version numbers in README and other project files
 * to match the current version in package.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get current version from package.json
const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
const version = packageJson.version;

console.log(`Updating version references to ${version}...`);

// Files to update
const filesToUpdate = [
  'README.md',
  'examples/demo/index.html'
];

filesToUpdate.forEach(file => {
  try {
    const filePath = resolve(__dirname, '..', file);
    if (existsSync(filePath)) {
      let content = readFileSync(filePath, 'utf8');

      // Update version references
      content = content.replace(
        /form-to-url-to-form@\d+\.\d+\.\d+/g,
        `form-to-url-to-form@${version}`
      );

      // For HTML files, update meta tags
      if (file.endsWith('.html')) {
        content = content.replace(
          /<meta name="version" content=".*?">/,
          `<meta name="version" content="${version}">`
        );
      }

      writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`File not found: ${file}`);
    }
  } catch (err) {
    console.error(`Error updating ${file}:`, err);
  }
});

console.log('Version update complete!');
