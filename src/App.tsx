import { useEffect, useRef, useState } from 'react';
import {SearchContent,RecipeFilters} from './components/FindContent';
import {NetworkNotice,PwaControls} from './components/PwaControls';
import {temperatureExplanation} from './lib/temperature';
import navigation from './data/navigation.json';
import Icon from './components/Icon';
import { readFontSize, saveFontSize, type FontSize } from './lib/storage';
import { recipes as recipeContent, cookingFunctions, officialArticles, reviews, sourceUrl, hasBundledOfficialPdfs } from './data/content';
import { RecipeList, RecipeContent, FunctionContent, ArticleContent, ChartContent, TipsList, ReviewList } from './components/ContentViews';
import {FavoriteButton,Favorites,StepCooking} from './components/Interactive';
import { functionLabels } from './lib/chinese-display';

const functions = [['slow-cook', 'Slow Cook', '慢炖'], ['sear-saute', 'Sear / Sauté', '煎 / 炒'], ['braise', 'Braise', '焖炖'], ['sous-vide', 'Sous Vide', '低温慢煮'], ['steam', 'Steam', '蒸'], ['bake', 'Bake', '烘烤'], ['proof', 'Proof', '发酵'], ['keep-warm', 'Keep Warm', '保温']];
const articles = officialArticles.map(a => [a.id, a.title]);
const info = [['about', '关于本应用'], ['sources', '内容来源'], ['disclaimer', '免责声明'], ['privacy', '隐私说明']];
const tabs = [['home', '首页', 'home'], ['favorites', '收藏', 'heart'], ['search', '搜索', 'search'], ['settings', '设置', 'settings']];
const knownRoutes = new Set(['home', 'manual', 'recipes', 'charts', 'tips', 'favorites', 'search', 'settings', 'source-review', ...recipeContent.flatMap(r => [`recipe/${r.id}`,`cook/${r.id}`]), 'charts/steam-chart','charts/slow-cook-chart','charts/sous-vide-chart', ...functions.map(f => f[0]), ...articles.map(a => a[0]), ...info.map(a => a[0])]);
function currentRoute() { return location.hash.slice(2) || 'home'; }
function go(route: string) { location.hash = `/${route}`; }
function Row({ label, detail, route, icon = 'book' }: { label: string; detail?: string; route: string; icon?: string }) {
  return <a className="row" href={`#/${route}`}><span className="row-icon"><Icon name={icon}/></span><span className="row-copy"><strong>{label}</strong>{detail && <span>{detail}</span>}</span><Icon name="next"/></a>;
}
export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [font, setFont] = useState<FontSize>(readFontSize);
  const [storageError, setStorageError] = useState(false);
  const [query, setQuery] = useState('');
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const change = () => { history.replaceState({ ...history.state, guide: true }, ''); setRoute(currentRoute()); window.scrollTo(0, 0); requestAnimationFrame(() => main.current?.focus()); };
    window.addEventListener('hashchange', change); return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => { document.documentElement.dataset.font = font; }, [font]);
  const fn = functions.find(f => f[0] === route);
  const cooking = recipeContent.find(r=>`cook/${r.id}`===route);
  const chartRoute=['charts','charts/steam-chart','charts/slow-cook-chart','charts/sous-vide-chart'].includes(route);
  const chartId=route.split('/')[1]||'steam-chart';
  const recipe = recipeContent.find(r => `recipe/${r.id}` === route);
  const article = officialArticles.find(a => a.id === route);
  const title = cooking?.titleZh || (chartRoute?'数值参考表':'') || recipe?.titleZh || (route === 'source-review' ? '开发核对记录' : '') || navigation.find(n => n.id === route)?.title || tabs.find(t => t[0] === route)?.[1] || articles.find(a => a[0] === route)?.[1] || info.find(a => a[0] === route)?.[1] || (fn ? functionLabels[fn[0]].split('（')[0] : '') || '页面未找到';
  useEffect(() => { document.title = route === 'home' ? 'PossibleCooker 中文使用指南' : `${title} · PossibleCooker`; }, [route, title]);
  const parent = cooking ? `recipe/${cooking.id}` : recipe ? 'recipes' : route === 'source-review' ? 'sources' : fn || articles.some(a => a[0] === route) ? 'manual' : info.some(a => a[0] === route) ? 'settings' : 'home';
  const searchable = [...navigation.map(n => ({ route: n.id, title: n.title, detail: n.description })), ...functions.map(f => ({ route: f[0], title: functionLabels[f[0]], detail: '烹饪功能' })), ...articles.map(a => ({ route: a[0], title: a[1], detail: '使用说明' }))];
  const matches = query.trim() ? searchable.filter(i => `${i.title} ${i.detail}`.toLowerCase().includes(query.trim().toLowerCase())) : [];
  return <div className="app-shell">
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); }}>跳到主要内容</a>
    {route !== 'home' && <header className="page-header"><button className="icon-button" aria-label="返回上一页" onClick={() => { if (history.state?.guide) history.back(); else go(parent); }}><Icon name="back"/></button><h1>{title}</h1>{route !== 'search' ? <a className="icon-button" href="#/search" aria-label="搜索"><Icon name="search"/></a> : <span/>}</header>}
    <main id="main" ref={main} tabIndex={-1} className={route === 'home' ? 'home-main' : 'page-main'}>
      <NetworkNotice/>
      {route === 'home' ? <>
        <section className="hero">
          <a className="icon-button hero-settings" href="#/settings" aria-label="设置"><Icon name="settings"/></a>
          <span className="eyebrow">给家人的厨房指南</span>
          <h1>PossibleCooker<span>中文使用指南</span></h1>
          <p className="subtitle">MC1001 非官方中文辅助指南</p>
          <div className="hero-art" aria-hidden="true"><div className="art-ring"/><div className="cooker"><div className="lid-knob"/><div className="lid"/><div className="handle left"/><div className="handle right"/><div className="pot-body"><span>PossibleCooker</span><div className="panel"><i/><b/><i/></div></div></div><span className="art-leaf leaf-one"/><span className="art-leaf leaf-two"/></div>
        </section>
        <section className="entry-grid" aria-label="主要入口">{navigation.map(n => <a key={n.id} className="entry-card" href={`#/${n.id}`}><Icon name={n.icon}/><h2>{n.title}</h2><p>{n.description}</p><span className="entry-arrow"><Icon name="next"/></span></a>)}</section>
        <p className="preview-note">搜索与离线验收版</p>
      </> : <>
        {route === 'manual' && <><p className="section-intro">看懂面板，找到需要的功能。</p><h2 className="section-label">烹饪功能</h2><div className="row-list">{functions.map(f => <Row key={f[0]} route={f[0]} label={functionLabels[f[0]]} icon="pot"/>)}</div><h2 className="section-label">基础使用</h2><div className="row-list">{articles.map(a => <Row key={a[0]} route={a[0]} label={a[1]} icon={a[0] === 'safety' ? 'shield' : 'book'}/>)}</div><p className="small-copy">内容来自官方说明书和官方菜谱指南。</p></>}
        {fn && <><FavoriteButton key={route} route={route}/><FunctionContent item={cookingFunctions.find(f => f.id === route)!}/></>}
        {route === 'recipes' && <RecipeFilters/>}
        {recipe && <><div className="recipe-actions"><FavoriteButton key={route} route={route}/><a className="primary-link" href={`#/cook/${recipe.id}`}>一步一步做菜</a></div><RecipeContent recipe={recipe}/></>}
        {cooking && <StepCooking key={cooking.id} recipe={cooking}/>} 
        {chartRoute && <ChartContent key={chartId} initialChart={chartId}/>}
        {route === 'tips' && <TipsList/>}
        {article && <ArticleContent item={article}/>}
        {route === 'source-review' && <ReviewList/>}
        {route === 'favorites' && <Favorites/>}
        {route === 'search' && <SearchContent/>}
        {route === 'settings' && <><section className="settings-section"><h2>字体大小</h2><p>选择读起来最舒服的大小。</p><div className="segments">{([['standard', '标准'], ['large', '大'], ['extra', '特大']] as const).map(([v, label]) => <button key={v} aria-pressed={font === v} className={font === v ? 'selected' : ''} onClick={() => { setFont(v); setStorageError(!saveFontSize(v)); }}>{label}{font === v && <Icon name="check"/>}</button>)}</div><div className="font-preview"><span>阅读预览</span><p>打开指南，轻松找到需要的内容。</p></div><p role="status" className="small-copy">{storageError ? '当前浏览器无法保存设置；本次调整仍然有效。' : '字号设置会保存在当前设备。'}</p></section><PwaControls/><div className="row-list">{info.map(a => <Row key={a[0]} route={a[0]} label={a[1]}/>)}</div><p className="preview-note">搜索与离线验收版</p></>}
        {route === 'about' && <div className="prose"><h2>PossibleCooker 中文使用指南</h2><p>版本：V1.0</p><p>这是为中文家庭用户整理的 MC1001 非官方中文辅助指南，帮助阅读使用说明、官方菜谱和参考表。</p><p>本应用不是 Ninja 或 SharkNinja 的官方产品，也不代表官方授权或背书。</p><p>“中式烹饪理解（非 Ninja 官方）”只为帮助理解，不属于官方内容。</p></div>}
        {route === 'sources' && <div className="prose"><h2>官方内容来源</h2><p>内容依据 Ninja Foodi PossibleCooker Pro MC1001 的官方说明书和官方菜谱指南整理。每页保留来源名称与 PDF 页码，便于核对。</p>{hasBundledOfficialPdfs ? <><p><a className="source-link" href={sourceUrl(cookingFunctions[0].source).split('#')[0]} target="_blank" rel="noreferrer">查看本地官方说明书 ↗</a></p><p><a className="source-link" href={sourceUrl(recipeContent[0].source).split('#')[0]} target="_blank" rel="noreferrer">查看本地官方菜谱指南 ↗</a></p></> : <p className="source-note">官方原始资料链接将在后续版本补充。</p>}<h2>温度辅助换算</h2><p>{temperatureExplanation}</p><h2>辅助解释</h2><p>“中式烹饪理解（非 Ninja 官方）”单独呈现，不修改官方配方、时间或操作。</p><details className="developer-records"><summary>开发核对记录</summary><p>这里保留原始审核编号和状态，供维护者核对来源。</p><a className="source-link" href="#/source-review">查看 {reviews.length} 项开发核对记录</a></details></div>}
        {route === 'disclaimer' && <div className="prose"><h2>使用说明</h2><p>本应用是非官方中文辅助指南，不是 Ninja 或 SharkNinja 的官方产品，也不代表官方授权或背书。</p><p>Ninja、Foodi、PossibleCooker 及相关产品名称和商标归其权利人所有。</p><p>涉及安全、正式设备操作或资料存在疑义时，请以官方原始说明书为准。</p><p>“中式烹饪理解（非 Ninja 官方）”仅用于帮助中文用户理解，不属于官方内容。</p><p>{temperatureExplanation}</p></div>}
        {route === 'privacy' && <div className="prose"><h2>数据留在你的设备</h2><p>字号、收藏及逐步阅读进度保存在当前浏览器本地。不需要账号，不发送搜索词，也未接入统计服务。</p><p>清除浏览器的网站数据后，字号会恢复为默认的“大”，收藏和阅读进度也会被清除。</p></div>}
        {!knownRoutes.has(route) && <div className="empty-state"><Icon name="book"/><h2>这个页面不存在</h2><a className="primary-link" href="#/home">返回首页</a></div>}
      </>}
    </main>
    <nav className="bottom-nav" aria-label="底部导航">{tabs.map(([id, label, icon]) => <a key={id} href={`#/${id}`} className={route === id ? 'active' : ''} aria-current={route === id ? 'page' : undefined}><Icon name={icon}/><span>{label}</span></a>)}</nav>
  </div>;
}

