const {createElement,renderToString}=require('./render-content.cjs');
const {RecipeContent,RecipeList}=require('../src/components/ContentViews.tsx');
const {recipes}=require('../src/data/content.ts');
const images=require('../src/data/recipe-images.json');
const fs=require('node:fs');
const assert=require('node:assert/strict');
assert.equal(Object.keys(images).length,15);
assert.equal(Object.values(images).filter(i=>i.status==='OFFICIAL_IMAGE').length,9);
assert.equal(Object.values(images).filter(i=>i.status==='IMAGE_REQUIRED').length,6);
for(const recipe of recipes){
 const image=images[recipe.id];
 assert.ok(fs.existsSync('public'+image.src));
 const html=renderToString(createElement(RecipeContent,{recipe})).replace(/<!--.*?-->/g,'');
 assert.ok(html.includes('loading="lazy"'));
 assert.ok(html.includes('class="recipe-english-title" lang="en"'));
 assert.ok(html.indexOf('<figure')<html.indexOf('recipe-english-title'));
 if(recipe.tips.length)assert.ok(html.indexOf('recipe-tips')<html.indexOf('<h2>官方食材</h2>'));
 if(image.status==='IMAGE_REQUIRED'){
  assert.ok(html.includes('当前为统一占位示意图'));
  assert.ok(!html.includes('图片来源：官方'));
 } else assert.ok(html.includes(`图片来源：官方菜谱指南 · PDF 第 ${image.source.pdfPage} 页`));
 assert.ok(!html.includes('IMAGE_REQUIRED'));
}
assert.equal((renderToString(createElement(RecipeList)).match(/loading="lazy"/g)||[]).length,15);
console.log('PASS: 15 recipe heroes and thumbnails; 9 sourced photographs, 6 honest placeholders; lazy loading and content order.');
