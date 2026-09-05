const {createElement,renderToString}=require('./render-content.cjs');
const {searchContent,filterRecipes,cookMinutes,categories,articleHeadings}=require('../src/lib/search.ts');
const {recipes,officialArticles}=require('../src/data/content.ts');
const {readFontSize,saveFontSize,saveValue,readSaved}=require('../src/lib/storage.ts');
const assert=require('node:assert/strict');
for(const r of recipes){assert.ok(searchContent(r.title).some(i=>i.route==='recipe/'+r.id));assert.ok(searchContent(r.titleZh).some(i=>i.route==='recipe/'+r.id));}
for(const term of ['慢炖','SLOW COOK','sous vide','清洁','ADD POT'])assert.ok(searchContent(term).length,term);
for(const a of officialArticles){assert.ok(a.originalText.toLowerCase().includes(articleHeadings[a.id].toLowerCase()),a.id+' heading source');assert.ok(searchContent(articleHeadings[a.id]).some(i=>i.route===a.id));}
assert.deepEqual(searchContent('spinach').filter(i=>i.kind==='菜谱').map(i=>i.route),['recipe/coconut-chicken']);
const base={category:'',functionId:'',ingredient:'',time:''};
assert.equal(filterRecipes(base).length,15);
assert.deepEqual(filterRecipes({...base,ingredient:'菠菜'}).map(r=>r.id),['coconut-chicken']);
assert.deepEqual(filterRecipes({...base,ingredient:'spinach'}).map(r=>r.id),['coconut-chicken']);
assert.equal(cookMinutes('8 HOURS (DEPENDING ON SIZE OF PORK)'),480);
assert.equal(cookMinutes('1–2 HOURS'),null);assert.equal(cookMinutes('1 HOUR 15 MINUTES'),75);
for(const category of categories)assert.ok(filterRecipes({...base,category}).every(r=>r.category===category));
assert.ok(filterRecipes({...base,functionId:'bake'}).every(r=>r.functions.includes('bake')));
assert.ok(filterRecipes({...base,time:'30'}).some(r=>r.id==='focaccia')); // Official 18 minutes, not proof + cook.
assert.equal(filterRecipes({...base,category:'早餐',ingredient:'菠菜'}).length,0);
let values=new Map();global.localStorage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};
saveFontSize('extra');saveValue('favorites',['recipe/focaccia']);saveValue('step.focaccia',3);
assert.equal(readFontSize(),'extra');assert.deepEqual(readSaved('favorites',[]),['recipe/focaccia']);assert.equal(readSaved('step.focaccia',0),3);
console.log('PASS: bilingual search, ingredient-only matching, 4 filters, official cook time, persistent local values.');
