import {recipes,cookingFunctions,officialArticles,charts,type Recipe} from '../data/content';
import recipeData from '../data/official/recipes.json';
import {chineseText,chartText,functionLabels,chartTitles} from './chinese-display';
const normalize=(s:string)=>s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
// Literal official headings, retained solely as search text; not invented keyword aliases.
export const articleHeadings:Record<string,string>={buttons:'OPERATING BUTTONS','first-use':'BEFORE FIRST USE',cleaning:'CLEANING & MAINTENANCE',troubleshooting:'TROUBLESHOOTING GUIDE','helpful-hints':'HELPFUL HINTS','getting-started':'Getting Started','cooking-tips':'Cooking Tips','product-tips':'Product Tips',parts:'PARTS',specifications:'TECHNICAL SPECIFICATIONS',safety:'IMPORTANT SAFETY INSTRUCTIONS'};
export function ingredientsText(r:Recipe){return r.ingredients.map(i=>chineseText(i.text)).join(' ')+' '+recipeData.find(x=>x.id===r.id)!.originalIngredientsText;}
const tipIds=['cooking-tips','product-tips','helpful-hints'];
export const searchIndex=[
 ...recipes.map(r=>({route:'recipe/'+r.id,title:r.titleZh,kind:'菜谱',text:[r.title,r.titleZh,ingredientsText(r),...r.functions.map(f=>functionLabels[f])].join(' ')})),
 ...cookingFunctions.map(f=>({route:f.id,title:functionLabels[f.id],kind:'烹饪功能',text:[f.title,f.titleZh,chineseText(f.description)].join(' ')})),
 ...officialArticles.map(a=>({route:a.id,title:a.title,kind:tipIds.includes(a.id)?'技巧':'使用说明',text:[a.title,articleHeadings[a.id],chineseText(a.description),...a.items.map(i=>chineseText(i.text)),...a.items.map(i=>i.text)].join(' ')})),
 ...charts.map(c=>({route:'charts/'+c.id,title:chartTitles[c.id],kind:'参考表',text:[c.title,chartTitles[c.id],...c.rows.flatMap(r=>r.cells.map(chartText)),...c.rows.flatMap(r=>r.cells)].join(' ')})),
];
export function searchContent(query:string){const words=normalize(query).split(' ').filter(Boolean);return words.length?searchIndex.filter(i=>words.every(w=>normalize(i.title+' '+i.text).includes(w))):[];}
export const categories=[...new Set(recipes.map(r=>r.category))];
export function cookMinutes(cook:string):number|null{
 const value=cook.replace(/\s*\(DEPENDING ON SIZE OF PORK\)/,'').trim();
 if(!value||!/^(?:\d+ HOURS?\s*)?(?:\d+ MINUTES?)?$/.test(value))return null;
 return Number(value.match(/(\d+) HOURS?/)?.[1]||0)*60+Number(value.match(/(\d+) MINUTES?/)?.[1]||0);
}
export type Filters={category:string;functionId:string;ingredient:string;time:string};
export function filterRecipes(f:Filters){return recipes.filter(r=>{
 const minutes=cookMinutes(r.cook);
 return (!f.category||r.category===f.category)&&(!f.functionId||r.functions.includes(f.functionId))&&(!f.ingredient.trim()||normalize(ingredientsText(r)).includes(normalize(f.ingredient)))&&(!f.time||(minutes!==null&&minutes<=Number(f.time)));
});}
