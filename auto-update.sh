#!/bin/sh
set -e

node <<'EOF'
const fs = require('fs');
const pendingsPath = 'src/data/pendings.json';
const resourcesPath = 'src/data/resources.json';

const pendings = JSON.parse(fs.readFileSync(pendingsPath, 'utf8'));
const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'));

if (pendings.length === 0) {
  console.error("faltan recursos en el archivo");
  process.exit(1);
}

const item = pendings.shift();
resources.unshift(item);

fs.writeFileSync(pendingsPath, JSON.stringify(pendings, null, 2));
fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2));

console.log(item.name);
EOF

NAME=$(jq -r '.[0].name' src/data/resources.json)

git add src/data/pendings.json src/data/resources.json
git commit -m "Add new resource ${NAME}" || echo "No changes to commit"
git push origin main
