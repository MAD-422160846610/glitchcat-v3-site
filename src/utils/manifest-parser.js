import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function getManifest() {
  const manifestPath = path.resolve('./src/data/manifest.md');
  const fileContent = fs.readFileSync(manifestPath, 'utf8');
  
  // Extract YAML frontmatter
  const match = fileContent.match(/^---([\s\S]*?)---/);
  if (!match) return null;
  
  try {
    return yaml.load(match[1]);
  } catch (e) {
    console.error('Error parsing manifest YAML:', e);
    return null;
  }
}
