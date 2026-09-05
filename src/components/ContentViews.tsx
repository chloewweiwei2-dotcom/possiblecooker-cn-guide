import { useState } from 'react';
import { recipes, cookingFunctions, officialArticles, charts, reviews, chineseContext, sourceUrl, hasBundledOfficialPdfs, displayValue, type BaseContent, type Source, type Entry, type Recipe, type CookingFunction, type Article } from '../data/content';
import Icon from './Icon';
import { chineseText, chartText, chartTitles, functionLabels, readerReviews } from '../lib/chinese-display';
import recipeImages from '../data/recipe-images.json';
import { reviewPolicy, editorialChanges } from '../lib/review-policy';
import {FavoriteButton} from './Interactive';
import {importantParts} from '../lib/step-display';
import TemperatureText from './TemperatureText';
import {temperatureExplanation} from '../lib/temperature';

function RecipeImage({ recipe, thumbnail=false }: { recipe: Recipe; thumbnail?: boolean }) {
  const image=recipeImages[recipe.id as keyof typeof recipeImages];
  const official=image.status==='OFFICIAL_IMAGE';
  const imageUrl=`${import.meta.env.BASE_URL}${image.src.replace(/^\//,'')}`;
  const imageSourceUrl=image.source ? `${import.meta.env.BASE_URL}sources/${image.source.document}#page=${image.source.pdfPage}` : '';
  const photo=<img src={imageUrl} alt={official ? `${recipe.titleZh}成品，来自官方菜谱指南` : '菜品图片待补充，占位示意图'} width={image.width} height={image.height} loading="lazy" decoding="async" onError={event=>{event.currentTarget.onerror=null;event.currentTarget.src=`${import.meta.env.BASE_URL}images/recipes/placeholder.svg`;event.currentTarget.alt='菜品图片暂时无法显示';}}/>;
  if(thumbnail) return <span className="recipe-thumbnail">{photo}</span>;
  return <figure className="recipe-photo">{photo}<figcaption>{image.source ? hasBundledOfficialPdfs ? <a className="source-link" href={imageSourceUrl} target="_blank" rel="noreferrer">图片来源：官方菜谱指南 · PDF 第 {image.source.pdfPage} 页 ↗</a> : `图片来源：官方菜谱指南 · PDF 第 ${image.source.pdfPage} 页` : '菜品图片待补充 · 当前为统一占位示意图'}</figcaption></figure>;
}
function ReaderText({ text, emphasize=false }: { text: string; emphasize?: boolean }) {
  return <>{text.split(/(registeryourninja\.com|ninjakitchen\.com)/g).map((part,i)=> /^(registeryourninja|ninjakitchen)\.com$/.test(part)
    ? <a key={i} className="reader-link" href={`https://${part}`} target="_blank" rel="noreferrer">{part.startsWith('register') ? '官方产品注册网站' : '官方产品网站'}</a>
    : <TemperatureText key={i} text={chineseText(part)} emphasize={emphasize}/>)}</>;
}

export function SourceLink({ source }: { source: Source }) {
  const label=`来源：${source.document.includes('manual') ? '官方说明书' : '官方菜谱指南'} · PDF 第 ${source.pdfPage} 页`;
  return hasBundledOfficialPdfs ? <a className="source-link" href={sourceUrl(source)} target="_blank" rel="noreferrer" title={`书内页码：${source.printedPage}`}>{label} ↗</a> : <span className="source-link" title={`书内页码：${source.printedPage}`}>{label} · 官方原始资料链接将在后续版本补充</span>;
}
export function ReviewNotices({ ids }: { ids: string[] }) {
  return <>{[...new Set(ids)].map(id => {
    const r = reviews.find(r => r.id === id);
    const policy=reviewPolicy[id];
    if(!r || !readerReviews[id] || policy.emphasis==='hidden') return null;
    if(policy.category==='SOURCE_NOTE') return <p className="source-note" key={id}>说明：<TemperatureText text={readerReviews[id]}/></p>;
    return <aside className={`review-notice review-${policy.emphasis}`} key={id}><strong>{policy.emphasis==='strong' && <Icon name="shield"/>}{policy.emphasis==='strong'?'请注意安全与操作':id==='SR-06'?'官方说明不完整':'官方资料存在差异'}</strong><p><TemperatureText text={readerReviews[id]}/></p></aside>;
  })}</>;
}
export function SafetyWarnings({ items }: { items: Entry[] }) {
  return items.length ? <section className="official-warning"><h2><Icon name="shield"/>请先阅读安全警告</h2>{items.map(item => <div key={item.number}><p><ReaderText text={item.text}/></p>{item.source && <SourceLink source={item.source}/>}</div>)}</section> : null;
}
function SourceFooter({ item }: { item: BaseContent }) {
  return <section className="source-footer"><SourceLink source={item.source}/><p>{temperatureExplanation}其余数量未换算；资料提示不是新增的官方操作建议。</p><details><summary>查看英文原文</summary><p className="small-copy">以下可能包含同页其他栏目的文字，阅读顺序以原始文档排版为准。</p><pre lang="en">{item.originalText}</pre></details></section>;
}
function Editorial({ id }: { id: string }) {
  const content=chineseContext.find(c=>c.id===id);
  return content ? <aside className="editorial"><strong>中式烹饪理解（非官方）</strong><p><ReaderText text={content.text}/></p></aside> : null;
}
function TroubleshootingText({ text }: { text: string }) {
  // Exact display strings verified in Owner's Guide, PDF page 4. Presentation only.
  const display=text.match(/ADD POT|ADD WATER|HH:MM|E1|E2/g);
  if(!display) return <p><ReaderText text={text}/></p>;
  const explanation=text.replace(/^屏幕显示“(?:ADD POT|ADD WATER)”：|^“E1”“E2”：/,'')
    .replace('屏幕显示 HH:MM','屏幕以小时：分钟格式显示');
  return <><p className="device-display">屏幕显示：{display.map((value,i)=><span key={value}>{i>0?' 或 ':''}“<strong lang="en">{value}</strong>”</span>)}</p><p>中文说明：<ReaderText text={explanation}/></p></>;
}
export function ContentEntries({ items, ordered=false, troubleshooting=false, suppressed=[], emphasize=false }: { items: Entry[]; ordered?: boolean; troubleshooting?: boolean; suppressed?: string[]; emphasize?: boolean }) {
  return <div className="content-entries">{items.map(item => <div className="content-entry" key={item.number}>
    {ordered && <span className="step-number">{item.number}</span>}
    <div className="entry-body">{item.place && <span className={`place-label ${item.place.includes('传统烤箱') ? 'oven-label' : ''}`}>{item.place==='PossibleCooker'?'锅具操作':chineseText(item.place)}</span>}{troubleshooting ? <TroubleshootingText text={item.text}/> : <p><ReaderText text={item.text} emphasize={emphasize}/></p>}<ReviewNotices ids={item.reviewIds.filter(id=>!suppressed.includes(id))}/>{item.originalText && <details className="step-original"><summary>查看英文原文</summary><p lang="en">{item.originalText}</p></details>}{item.source && <SourceLink source={item.source}/>}</div>
  </div>)}</div>;
}
export function RecipeList({items=recipes}: {items?:Recipe[]}) {
  return <><p className="section-intro">15 道官方菜谱 · 烹饪时间按官方菜谱指南标注显示</p>{['早餐','前菜与配菜','汤与炖菜','蒸制菜','主菜','甜点'].filter(category=>items.some(r=>r.category===category)).map(category => <section key={category}><h2 className="section-label">{category}</h2><div className="row-list">{items.filter(r=>r.category===category).map(r => <a className="row recipe-row" href={`#/recipe/${r.id}`} key={r.id}><RecipeImage recipe={r} thumbnail/><span className="row-copy"><strong>{r.titleZh}</strong><span>烹饪 {displayValue(r.cook)}{r.usesOven ? ' · 含传统烤箱操作' : ''}</span></span><Icon name="next"/></a>)}</div></section>)}</>;
}
export function RecipeContent({ recipe: r }: { recipe: Recipe }) {
  return <article className="official-content"><RecipeImage recipe={r}/><div className="content-heading"><span className="source-label">{r.category}</span><h2>{r.titleZh}</h2><p className="recipe-english-title" lang="en">{r.title}</p></div>
    <dl className="recipe-facts">{[['准备时间',r.prep],['烹饪时间',r.cook],['份量',r.makes],...(r.proof ? [['发酵时间',r.proof]] : [])].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{displayValue(value)}</dd></div>)}</dl>
    <div className="function-links"><span>锅具功能</span>{r.functions.map(id=><a key={id} href={`#/${id}`}>{functionLabels[id]}</a>)}</div>
    {r.optionalFunctions.length>0 && <div className="function-links"><span>官方技巧中的可选功能</span>{r.optionalFunctions.map(id=><a key={id} href={`#/${id}`}>{functionLabels[id]}</a>)}</div>}
    {r.usesOven && <div className="oven-note"><strong>本菜还需要传统烤箱</strong><p>下面逐条标明操作地点；“传统烤箱”不是本机的功能。</p></div>}
    <SafetyWarnings items={r.safetyWarnings}/><ReviewNotices ids={r.reviewIds}/>
    {r.tips.length>0 && <section className="recipe-tips"><h2>官方技巧</h2><ContentEntries items={r.tips} suppressed={r.reviewIds}/></section>}
    <section><h2>官方食材</h2><ContentEntries items={r.ingredients} suppressed={r.reviewIds}/></section>
    <section><h2>官方做法</h2><p className="small-copy">保留官方步骤编号与顺序。</p><ContentEntries items={r.steps} suppressed={r.reviewIds} ordered/></section>
    <Editorial id={r.id}/><SourceFooter item={r}/>
  </article>;
}
export function FunctionContent({ item }: { item: CookingFunction }) {
  return <article className="official-content"><div className="content-heading"><h2>{functionLabels[item.id]}</h2><SourceLink source={item.source}/></div><SafetyWarnings items={item.safetyWarnings}/><ReviewNotices ids={item.reviewIds}/><section><h2>官方功能说明</h2><p><ReaderText text={item.description}/></p></section><section><h2>官方操作步骤</h2><ContentEntries items={item.steps} suppressed={item.reviewIds} ordered/></section>{item.notes.length>0 && <section><h2>注意事项</h2><ContentEntries items={item.notes} suppressed={item.reviewIds}/></section>}<Editorial id={item.id}/><SourceFooter item={item}/></article>;
}
export function ArticleContent({ item }: { item: Article }) {
  return <article className="official-content"><SourceLink source={item.source}/><SafetyWarnings items={item.safetyWarnings}/><ReviewNotices ids={item.reviewIds}/>{item.description && <p className="article-description"><ReaderText text={item.description}/></p>}<ContentEntries items={item.items} suppressed={item.reviewIds} ordered={item.numbered} troubleshooting={item.id==='troubleshooting'}/><SourceFooter item={item}/></article>;
}
export function ChartContent({ initialChart='steam-chart' }: { initialChart?: string }) {
  const [active,setActive]=useState(initialChart);
  const chart=charts.find(c=>c.id===active)!;
  return <><div className="segments" aria-label="参考表类别">{[['steam-chart','蒸'],['slow-cook-chart','慢炖'],['sous-vide-chart','低温慢煮']].map(([id,label])=><button key={id} className={id===active?'selected':''} aria-pressed={id===active} onClick={()=>setActive(id)}>{label}</button>)}</div><article className="official-content"><div className="content-heading"><h2>{chartTitles[chart.id]}</h2><FavoriteButton key={active} route={'charts/'+active}/><SourceLink source={chart.source}/></div><SafetyWarnings items={chart.safetyWarnings}/><ReviewNotices ids={chart.reviewIds.filter(id=>!chart.rows.some(row=>row.reviewIds.includes(id)))}/>{active==='steam-chart' && <p className="chart-explanation">加水量不是食材份量。每条保留官方切配方式和时间。</p>}{active==='sous-vide-chart' && <p className="chart-explanation">摄氏为辅助换算值，已取整至最接近的 5°C；括号内是官方华氏原值。</p>}{chart.notes.map(n=><p className="article-description" key={n}><TemperatureText text={chineseText(n)}/></p>)}<div className="chart-cards">{chart.rows.map(row=><section className="chart-card" key={row.id}><h3>{chartText(row.cells[active==='steam-chart'?0:1])}</h3><dl>{chart.headers.map((header,i)=><div key={header}><dt>{chineseText(header).replace('加水量 加水量','加水量')}</dt><dd><TemperatureText text={chartText(row.cells[i])}/></dd></div>)}</dl><ReviewNotices ids={row.reviewIds}/>{row.source && <SourceLink source={row.source}/>}</section>)}</div><SourceFooter item={chart}/></article></>;
}
export function TipsList() {
  return <><p className="section-intro">按使用场景查阅官方内容。</p><div className="row-list">{['first-use','getting-started','cooking-tips','product-tips','helpful-hints','cleaning','troubleshooting','safety'].map(id=>{const a=officialArticles.find(a=>a.id===id)!;return <a className="row" href={`#/${id}`} key={id}><span className="row-icon"><Icon name={id==='safety'?'shield':'book'}/></span><span className="row-copy"><strong>{a.title}</strong><span>{a.source.document.includes('manual')?'官方说明书':'官方菜谱指南'}</span></span><Icon name="next"/></a>;})}</div></>;
}
export function ReviewList() {
  return <div className="official-content"><p>以下 {reviews.length} 项均保留 <code>SOURCE_REVIEW_REQUIRED</code>。请核对原页及提示；确认按原文展示，不等于已经解决官方资料的问题。</p>{reviews.map(r=><section className="review-record" key={r.id}><h2>{r.id} · {r.title}</h2><p>当前分类：<code>{reviewPolicy[r.id].category}</code> · 展示：{({strong:"明显警告",gentle:"轻提示",plain:"普通说明",hidden:"仅内部记录"})[reviewPolicy[r.id].emphasis]}</p><p>原始核对记录：{r.message}</p>{editorialChanges[r.id] && <p>展示修改记录：{editorialChanges[r.id]}</p>}{r.sources.map((s,i)=><div key={i}><SourceLink source={s}/><p className="small-copy">{s.section}</p></div>)}<details><summary>原文片段</summary>{r.originalExcerpts.map(q=><p lang="en" key={q}>{q}</p>)}</details><p className="small-copy">状态：SOURCE_REVIEW_REQUIRED</p></section>)}</div>;
}

