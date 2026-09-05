import {useEffect,useRef,useState} from 'react';
import {recipes,cookingFunctions,type Recipe} from '../data/content';
import {ContentEntries,ReviewNotices,SafetyWarnings,SourceLink,RecipeList} from './ContentViews';
import {readSaved,saveValue} from '../lib/storage';
import {functionLabels} from '../lib/chinese-display';
import {reviewPolicy} from '../lib/review-policy';
import {currentWarnings} from '../lib/step-display';
const favoriteItems=[...recipes.map(r=>({route:'recipe/'+r.id,title:r.titleZh})),...cookingFunctions.map(f=>({route:f.id,title:functionLabels[f.id]})),...['steam-chart','slow-cook-chart','sous-vide-chart'].map((id,i)=>({route:'charts/'+id,title:['蒸食参考表','慢炖参考表','低温慢煮参考表'][i]}))];

export function FavoriteButton({route}:{route:string}){
 const [saved,setSaved]=useState(()=>{const v=readSaved<unknown>('favorites',[]);return Array.isArray(v)?v.filter((x):x is string=>typeof x==='string'):[];});
 const [error,setError]=useState(false);
 const active=saved.includes(route);
 return <div className="favorite-control"><button aria-pressed={active} onClick={()=>{const next=active?saved.filter(x=>x!==route):[...saved,route];setSaved(next);setError(!saveValue('favorites',next));}}>{active?'♥ 已收藏，点击取消':'♡ 收藏此内容'}</button>{error&&<p role="status">浏览器无法保存收藏，本次操作仅暂时有效。</p>}</div>;
}
export function Favorites(){
 const value=readSaved<unknown>('favorites',[]);
 const saved=Array.isArray(value)?value:[];
 const items=favoriteItems.filter(i=>saved.includes(i.route));
 return <><p className="small-copy">收藏仅保存在当前浏览器中。</p>{items.length?<div className="row-list">{items.map(i=><div key={i.route}><a className="row" href={`#/${i.route}`}>{i.title}</a></div>)}</div>:<div className="empty-state"><h2>还没有收藏</h2><p>打开菜谱、功能或参考表，点击“收藏此内容”。</p><a href="#/recipes">查看官方菜谱</a></div>}</>;
}
export function StepCooking({recipe:r,initialStep}:{recipe:Recipe;initialStep?:number}){
 const saved=initialStep ?? readSaved<unknown>(`step.${r.id}`,0);
 const [index,setIndex]=useState(()=>typeof saved==='number'&&Number.isInteger(saved)&&saved>=0&&saved<r.steps.length?saved:0);
 const [error,setError]=useState(false),[finished,setFinished]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 const step=r.steps[index];
 const warnings=[...new Set([...r.reviewIds,...r.steps.flatMap(s=>s.reviewIds),...r.ingredients.flatMap(i=>i.reviewIds)])].filter(id=>reviewPolicy[id]?.category==='USER_WARNING');
 const relevant=currentWarnings(r,index);
 useEffect(()=>{document.documentElement.dataset.cooking='true';return()=>{delete document.documentElement.dataset.cooking;};},[]);
 function move(next:number){setIndex(next);setFinished(false);setError(!saveValue(`step.${r.id}`,next));requestAnimationFrame(()=>{heading.current?.focus();heading.current?.scrollIntoView({block:'start'});});}
 return <article className="official-content step-mode"><p>逐步做菜 · 按官方步骤原序显示</p><a href={`#/recipe/${r.id}`}>返回完整菜谱</a>
 {(r.safetyWarnings.length>0||warnings.some(id=>!relevant.includes(id)))&&<details className="cooking-preparation" key={index===0?'start':'reading'} open={index===0?true:undefined}><summary>烹饪前请阅读：安全说明与本菜提示</summary><SafetyWarnings items={r.safetyWarnings}/><ReviewNotices ids={warnings.filter(id=>!relevant.includes(id))}/></details>}
 <h2 ref={heading} tabIndex={-1} className="step-heading">第 {index+1} / {r.steps.length} 步</h2><progress value={index+1} max={r.steps.length} aria-label="做菜进度"/>
 {step.place.includes('传统烤箱')?<p className="step-oven">此步骤使用传统烤箱，不是在 PossibleCooker 中完成。</p>:step.place.includes('锅具')?<p className="step-location">此步骤使用 PossibleCooker。</p>:null}
 <ReviewNotices ids={relevant}/><ContentEntries items={[step]} ordered emphasize suppressed={step.reviewIds}/><SourceLink source={r.source}/>
 <div className="step-controls"><button disabled={index===0} onClick={()=>move(index-1)}>上一步</button>{index<r.steps.length-1?<button className="selected" onClick={()=>move(index+1)}>下一步</button>:<button onClick={()=>{setFinished(true);setError(!saveValue(`step.${r.id}`,0));}}>完成本次做菜</button>}</div>
 <p role="status">{finished?'已完成本次浏览。下次将从第一步开始。':error?'浏览器无法保存进度，请记住当前步骤。':'进度自动保存在此设备；恢复时请先核对锅具实际状态。'}</p><button onClick={()=>move(0)}>从第一步重新查看</button>
 <details><summary>查看全部食材与官方技巧</summary><h2>官方食材</h2><ContentEntries items={r.ingredients} suppressed={warnings}/>{r.tips.length>0&&<><h2>官方技巧</h2><ContentEntries items={r.tips} suppressed={warnings}/></>}<ReviewNotices ids={r.reviewIds.filter(id=>reviewPolicy[id]?.category==='SOURCE_NOTE')}/></details>
 <p className="small-copy">本页不控制锅具，也不会自动开始加热或计时。</p></article>;
}
