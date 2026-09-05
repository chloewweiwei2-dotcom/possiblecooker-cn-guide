const {routes,App,createElement,renderToString}=require('./render-content.cjs');
const {recipes,cookingFunctions,officialArticles,charts}=require('../src/data/content.ts');
const {readerReviews,chineseText}=require('../src/lib/chinese-display.ts');
const {temperatureParts,fahrenheitToCelsius}=require('../src/lib/temperature.ts');
const {ChartContent}=require('../src/components/ContentViews.tsx');
const {StepCooking}=require('../src/components/Interactive.tsx');
const assert=require('node:assert/strict');const fs=require('node:fs');
const expected={200:95,250:120,300:150,325:165,350:175,375:190,400:205,425:220,450:230,500:260};
for(const [f,c] of Object.entries(expected))assert.equal(fahrenheitToCelsius(Number(f)),c);
assert.equal(temperatureParts('HI / LO').filter(x=>typeof x!=='string').length,0);
assert.equal(temperatureParts('温度待核实：375°F').find(x=>typeof x!=='string').celsius,null);
const occurrences=[];
function walk(value,path){
 if(Array.isArray(value))value.forEach((v,i)=>walk(v,path+'.'+i));
 else if(value&&typeof value==='object')Object.entries(value).filter(([k])=>!k.startsWith('original')&&!['source','sources'].includes(k)).forEach(([k,v])=>walk(v,path+'.'+k));
 else if(typeof value==='string')for(const part of temperatureParts(value))if(typeof part!=='string')occurrences.push({path,f:part.fahrenheit,c:part.celsius});
}
walk(recipes,'recipes');walk(cookingFunctions,'functions');walk(officialArticles,'articles');walk(charts,'charts');walk(readerReviews,'readerReviews');
let displayCount=0,stepCount=0;
function inspect(html,label,step=false){
 const chineseExpanded=html.replace(/<(pre|p) lang="en">[\s\S]*?<\/\1>/g,'').replace(/<span class="temperature-pair"[\s\S]*?<span class="temperature-derived">换算<\/span><\/span>/g,'').replace(/<[^>]+>/g,'');
 assert.ok(!/\d+\s*(?:°F|F\b|华氏度)/.test(chineseExpanded),label+' expanded Chinese Fahrenheit-only display');
 // Full English source folds and internal review page are intentionally not localized.
 html=html.replace(/<details\b[^>]*>[\s\S]*?<summary\b[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<\/details>/g,'$1');
 const pairs=[...html.matchAll(/data-fahrenheit="([\d.-]+)" data-derived-celsius="([\d.-]+)"/g)];
 for(const [,f,c] of pairs){assert.equal(Number(c),Math.round((Number(f)-32)/9)*5,label);assert.equal(Number(c)%5,0);}
 const remaining=html.replace(/<span class="temperature-pair"[\s\S]*?<span class="temperature-derived">换算<\/span><\/span>/g,'').replace(/<[^>]+>/g,'');
 assert.ok(!/\d+\s*(?:°F|F\b|华氏度)/.test(remaining),label+' Fahrenheit-only display');
 if(step)stepCount+=pairs.length;else displayCount+=pairs.length;
}
for(const route of routes.filter(r=>!['source-review','charts'].includes(r))){global.location={hash:'#/'+route};inspect(renderToString(createElement(App)),route);}
for(const chart of charts)inspect(renderToString(createElement(ChartContent,{initialChart:chart.id})),chart.id);
for(const r of recipes)for(let i=0;i<r.steps.length;i++)inspect(renderToString(createElement(StepCooking,{recipe:r,initialStep:i})),r.id+'/'+i,true);
const unique=[...new Set(occurrences.map(x=>x.f))].sort((a,b)=>a-b).map(f=>({fahrenheit:f,celsius:fahrenheitToCelsius(f)}));
fs.writeFileSync('docs/temperature-audit.json',JSON.stringify({sourceFieldOccurrences:occurrences.length,ordinaryPageOccurrences:displayCount,stepStateOccurrences:stepCount,unique,occurrences},null,2));
console.log(JSON.stringify({sourceFieldOccurrences:occurrences.length,ordinaryPageOccurrences:displayCount,stepStateOccurrences:stepCount,unique}));
console.log('PASS: formula, rounding, uncertain values, HI/LO exclusions, all ordinary routes and 104 step states have no Fahrenheit-only operational display.');
