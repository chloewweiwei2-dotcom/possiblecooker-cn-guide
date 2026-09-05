const {routes,App,createElement,renderToString}=require('./render-content.cjs');
const {reviewPolicy}=require('../src/lib/review-policy.ts');
const {ReviewNotices,ChartContent}=require('../src/components/ContentViews.tsx');
const assert=require('node:assert/strict');
assert.equal(Object.values(reviewPolicy).filter(p=>p.category==='USER_WARNING').length,12);
assert.equal(Object.values(reviewPolicy).filter(p=>p.category==='SOURCE_NOTE').length,9);
assert.equal(Object.values(reviewPolicy).filter(p=>p.category==='EDITORIAL_FIX').length,1);
for(const [id,p] of Object.entries(reviewPolicy)){
 const html=renderToString(createElement(ReviewNotices,{ids:[id]}));
 if(p.emphasis==='hidden')assert.equal(html,'');
 else assert.ok(html.includes(p.category==='SOURCE_NOTE'?'class="source-note"':'review-'+p.emphasis),id);
}
for(const route of routes.filter(r=>r!=='source-review')){
 global.location={hash:'#/'+route};const html=renderToString(createElement(App));
 assert.ok(!/SOURCE_NOTE|EDITORIAL_FIX|USER_WARNING|SR-\d\d/.test(html.replace(/<details[\s\S]*?<\/details>/g,'')),route);
 if(route==='getting-started')assert.ok(!html.includes('原文按钮名有误') && html.includes('START/STOP'));
}
for(const id of ['slow-cook-chart','sous-vide-chart'])assert.ok(renderToString(createElement(ChartContent,{initialChart:id})).includes('review-strong'));
console.log('PASS: 12 warnings, 9 notes, 1 editorial fix; presentation levels and chart warnings verified.');
