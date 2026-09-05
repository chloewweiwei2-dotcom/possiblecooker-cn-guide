const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const dist = path.resolve('dist');
const base = '/possiblecooker-cn-guide/';
const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'manifest.webmanifest'), 'utf8'));
const serviceWorker = fs.readFileSync(path.join(dist, 'sw.js'), 'utf8');
const index = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

assert.equal(manifest.start_url, `${base}#/home`);
assert.equal(manifest.scope, base);
assert.ok(manifest.icons.every(icon => icon.src.startsWith(base)));
assert.ok(index.includes(`${base}manifest.webmanifest`));
assert.ok(serviceWorker.includes(`${base}index.html`));
const assets = JSON.parse(serviceWorker.match(/const ASSETS=(\[.*\]);/)[1]);
assert.ok(assets.every(asset => !asset.toLowerCase().endsWith('.pdf')));
assert.equal(fs.readdirSync(path.join(dist, 'sources')).filter(file => file.toLowerCase().endsWith('.pdf')).length, 0);
assert.ok(fs.existsSync(path.join(dist, 'images', 'recipes', 'frittata.jpg')));
console.log('Public release check passed: Pages base, PWA paths, recipe images, and PDF exclusion.');
