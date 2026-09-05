const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
// Compile TypeScript in memory to exercise real React rendering without a browser or writes.
for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (module, filename) => {
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
    });
    module._compile(compiled.outputText, filename);
  };
}
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const App = require('../src/App.tsx').default;
const recipes = require('../src/data/official/recipes.json');
const functions = require('../src/data/manual/functions.json');
const articles = require('../src/data/manual/articles.json');
const routes = ['home', 'manual', 'recipes', 'charts', 'tips', 'settings', 'sources', 'source-review', 'about', 'privacy', 'disclaimer', 'search', 'favorites', ...recipes.map(r => `recipe/${r.id}`), ...functions.map(f => f.id), ...articles.map(a => a.id)];
global.localStorage = { getItem: () => 'large' };
for (const route of routes) {
  global.location = { hash: '#/' + route };
  const html = renderToString(createElement(App));
  assert.ok(html.includes('bottom-nav') && html.includes('<main'), route);
  assert.ok(!html.includes('????'), route + ' encoding');
  if (route.startsWith('recipe/')) {
    assert.ok(html.includes('官方食材') && html.includes('官方做法'), route);
    assert.ok(html.includes('中式烹饪理解（非官方）'), route);
    assert.ok(html.includes('/sources/'), route);
  }
  if (route === 'recipe/short-ribs') assert.ok(html.includes('4 磅'));
  if (route === 'recipe/coconut-chicken') assert.ok(html.includes('菠菜') && html.includes('做法没有明确说明'));
  if (route === 'source-review') assert.ok(html.includes('SR-22') && html.includes('SOURCE_REVIEW_REQUIRED'));
  if (route === 'sear-saute') assert.ok(html.indexOf('请先阅读安全警告') < html.indexOf('官方操作步骤'));
}
console.log(`PASS: ${routes.length} real React route renders; recipe content, source links, review notices and safety priority.`);
module.exports = { routes, App, createElement, renderToString };
