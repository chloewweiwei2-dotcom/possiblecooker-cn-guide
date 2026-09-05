import { readdir, readFile, rm, writeFile } from 'node:fs/promises';

const repository = process.env.VITE_GITHUB_PAGES_REPO || 'possiblecooker-cn-guide';
const base = `/${repository}/`;
const pdfs = [
  'dist/sources/ninja-foodi-possiblecooker-pro-mc1001-a-manual.pdf',
  'dist/sources/ninja-foodi-possiblecooker-pro-recipes-and-cooking-charts.pdf',
];

for (const pdf of pdfs) await rm(pdf, { force: true });

const manifestPath = 'dist/manifest.webmanifest';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.id = base;
manifest.start_url = `${base}#/home`;
manifest.scope = base;
manifest.icons = manifest.icons.map(icon => ({ ...icon, src: `${base}icons/${icon.src.split('/').pop()}` }));
await writeFile(manifestPath, `${JSON.stringify(manifest)}\n`);

const remaining = (await readdir('dist/sources', { withFileTypes: true }).catch(() => [])).filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'));
if (remaining.length) throw new Error(`Public build still contains PDF: ${remaining.map(entry => entry.name).join(', ')}`);
console.log(`Public release prepared for ${base}; official PDFs excluded.`);
