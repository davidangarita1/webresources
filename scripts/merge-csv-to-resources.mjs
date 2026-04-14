import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const resources = JSON.parse(readFileSync(join(dataDir, 'resources.json'), 'utf-8'));
const existingUrls = new Set(resources.map(r => r.url));
let nextId = Math.max(...resources.map(r => parseInt(r.id))) + 1;

const createdAt = new Date().toISOString().replace(/\.\d{3}Z$/, '.000000Z');

const csvFiles = [
  'NETWORKING.csv', 'PORTFOLIOS.csv', 'PYTHON.csv', 'REACT.csv', 'RESEARCHING.csv',
  'RESOURCES.csv', 'SECURITY.csv', 'TESTING.csv', 'TOOLS.csv', 'UI_UX.csv', 'VOLUNTEER.csv',
];

const categoryMap = {
  '3D': '3D',
  'ARTIFICIAL INTELLIGENCE': 'ARTIFICIAL INTELLIGENCE',
  'CHALLENGES': 'CHALLENGES',
  'COURSES': 'COURSES',
  'ANIMATIONS': 'ANIMATIONS',
  'COLORS': 'COLORS',
  'CSS': 'CSS',
  'FONT': 'FONT',
  'FRAMEWORKS': 'FRAMEWORKS',
  'TEMPLATES': 'TEMPLATES',
  'DEPLOYMENT': 'DEPLOYMENT',
  'DOCS': 'DOCS',
  'EDUCATION': 'EDUCATION',
  'FINANCE': 'FINANCE',
  'INVESTMENT': 'INVESTMENT',
  'FREELANCE': 'FREELANCE',
  'GAMING': 'GAMING',
  'GITHUB': 'GITHUB',
  'GIT': 'GIT',
  'HEALTHY': 'HEALTHY',
  'HTML': 'HTML',
  'ICONS': 'ICONS',
  'ILLUSTRATIONS': 'ILLUSTRATIONS',
  'IMAGES': 'IMAGES',
  'JAVA': 'JAVA',
  'JAVASCRIPT': 'JAVASCRIPT',
  'JOBS': 'JOBS',
  'ENGLISH': 'ENGLISH',
  'FRENCH': 'FRENCH',
  'JAPANESE': 'JAPANESE',
  'MIGRATE': 'MIGRATE',
  'NETWORKING': 'NETWORKING',
  'PORTFOLIOS': 'PORTFOLIOS',
  'PYTHON': 'PYTHON',
  'REACT': 'REACT',
  'RESEARCHING': 'RESEARCHING',
  'RESOURCES': 'RESOURCES',
  'SECURITY': 'SECURITY',
  'TESTING': 'TESTING',
  'TOOLS': 'TOOLS',
  'UI/UX': 'UI/UX',
  'VOLUNTEER': 'VOLUNTEER',
};

const tagMap = {
  '3D': ['3d'],
  'ARTIFICIAL INTELLIGENCE': ['ai'],
  'CHALLENGES': ['challenges'],
  'COURSES': ['courses'],
  'ANIMATIONS': ['animations'],
  'COLORS': ['colors'],
  'CSS': ['css'],
  'FONT': ['font'],
  'FRAMEWORKS': ['frameworks'],
  'TEMPLATES': ['templates'],
  'DEPLOYMENT': ['deployment'],
  'DOCS': ['docs'],
  'EDUCATION': ['education'],
  'FINANCE': ['finance'],
  'INVESTMENT': ['investment'],
  'FREELANCE': ['freelance'],
  'GAMING': ['gaming'],
  'GITHUB': ['github'],
  'GIT': ['git'],
  'HEALTHY': ['healthy'],
  'HTML': ['html'],
  'ICONS': ['icons'],
  'ILLUSTRATIONS': ['illustrations'],
  'IMAGES': ['images'],
  'JAVA': ['java'],
  'JAVASCRIPT': ['javascript'],
  'JOBS': ['jobs'],
  'ENGLISH': ['english'],
  'FRENCH': ['french'],
  'JAPANESE': ['japanese'],
  'MIGRATE': ['migrate'],
  'NETWORKING': ['networking'],
  'PORTFOLIOS': ['portfolios'],
  'PYTHON': ['python'],
  'REACT': ['react'],
  'RESEARCHING': ['researching'],
  'RESOURCES': ['resources'],
  'SECURITY': ['security'],
  'TESTING': ['testing'],
  'TOOLS': ['tools'],
  'UI/UX': ['ui', 'ux'],
  'VOLUNTEER': ['volunteer'],
};

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] || '').trim()]));
  });
}

let addedCount = 0;
let skippedCount = 0;

for (const csvFile of csvFiles) {
  const content = readFileSync(join(dataDir, csvFile), 'utf-8');
  const rows = parseCSV(content);

  for (const row of rows) {
    const url = row.url;
    const name = row.name || row[' '] || row[''];
    const category = categoryMap[row.category] || row.category;

    if (!url || !name) continue;

    if (existingUrls.has(url)) {
      console.log(`SKIP (duplicate): ${name} [${url}]`);
      skippedCount++;
      continue;
    }

    const newResource = {
      id: String(nextId++),
      title: name,
      url,
      description: '',
      category,
      tags: tagMap[category] || [category.toLowerCase()],
      createdAt,
    };

    resources.push(newResource);
    existingUrls.add(url);
    console.log(`ADD: ${name} → ${category}`);
    addedCount++;
  }
}

writeFileSync(join(dataDir, 'resources.json'), JSON.stringify(resources, null, 2), 'utf-8');
console.log(`\nDone! Added ${addedCount} resources, skipped ${skippedCount} duplicates. Total: ${resources.length}`);
