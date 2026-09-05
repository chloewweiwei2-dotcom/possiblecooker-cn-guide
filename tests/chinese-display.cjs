const {routes, App, createElement, renderToString}=require('./render-content.cjs');
const {ChartContent}=require('../src/components/ContentViews.tsx');
const {chineseText,chartText}=require('../src/lib/chinese-display.ts');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const path=require('node:path');
const data=require('../src/data/content.ts');
// Default-readable text: retain disclosure summaries, exclude closed English originals.
function visible(html) {
  return html.replace(/<p class="recipe-english-title" lang="en">[^<]*<\/p>/g,'') // User-authorized secondary official recipe title only.
    .replace(/<details\b[^>]*>[\s\S]*?<summary\b[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<\/details>/g,'$1')
    .replace(/<[^>]+>/g,' ').replace(/&(?:amp|lt|gt|quot);|&#x27;/g,' ').replace(/\s+/g,' ');
}
function remainingLatin(text){
  return text.replace(/°[CF]/g,'').replace(/PossibleCooker|MC1001|PDF|SLOW COOK|SEAR \/ SAUTÉ|SOUS VIDE|KEEP WARM|START\/STOP|START|POWER|TEMP|TIME|BRAISE|STEAM|BAKE|PROOF/g,'').match(/[A-Za-z][A-Za-z0-9_./-]*/g)||[];
}
const failures=[];
for(const route of routes.filter(r=>r!=='source-review')){
  global.location={hash:'#/'+route};
  const text=visible(renderToString(createElement(App)));
  const latin=remainingLatin(route==='troubleshooting' ? text.replace(/ADD POT|ADD WATER|HH:MM|E1|E2/g,'') : text);
  if(latin.length)failures.push({route,latin:[...new Set(latin)]});
  assert.ok(!/SR-\d+|SOURCE_REVIEW_REQUIRED/.test(text),route+' internal status visible');
}
for(const chart of data.charts){
  const text=visible(renderToString(createElement(ChartContent,{initialChart:chart.id})));
  const latin=remainingLatin(text);
  if(latin.length)failures.push({chart:chart.id,latin:[...new Set(latin)]});
  assert.ok(!/SR-\d+|SOURCE_REVIEW_REQUIRED/.test(text));
  assert.ok(!text.includes('加水量加水量') && !text.includes('-英寸'),chart.id+' awkward translation');
}
if(failures.length){console.error(JSON.stringify(failures,null,2));process.exitCode=1;}
else console.log('PASS: all ordinary pages and 3 chart states show Chinese; English originals collapsed; no internal review codes.');
const hashes=require('./official-data-hashes.json');
for(const [file,hash] of Object.entries(hashes))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',file))).digest('hex'),hash,file+' changed');
const numberTokens=s=>s.match(/\d+(?:\/\d+)?/g)||[];
for(const r of data.recipes){
 for(const e of [...r.ingredients,...r.steps,...r.tips])assert.deepEqual(numberTokens(chineseText(e.text)),numberTokens(e.text),'numeric change '+r.id);
}
for(const c of data.charts)for(const r of c.rows)for(const cell of r.cells)assert.deepEqual(numberTokens(chartText(cell)),numberTokens(cell),r.id);
assert.equal(chineseText('HI / LO / HIGH / LOW'),'高档 / 低档 / 高档 / 低档');
assert.equal(chineseText('1/2 cup'), '1/2 美制杯');
assert.equal(chineseText('350°F'), '350 华氏度');
console.log('PASS: official files unchanged; recipe/chart numeric tokens and ambiguous fractions preserved; setting and unit names translated without conversion.');
