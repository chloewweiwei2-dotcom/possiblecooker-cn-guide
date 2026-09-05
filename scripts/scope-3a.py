from pathlib import Path
import json
p=Path('package.json');d=json.loads(p.read_text());d['scripts']['build']='tsc --noEmit && vite build';p.write_text(json.dumps(d,indent=2)+'\n')
p=Path('src/main.tsx');s=p.read_text().replace("import {initializePwa} from './components/PwaSettings';\n",'').replace('initializePwa(import.meta.env.PROD);','');p.write_text(s)
p=Path('index.html');s=p.read_text(encoding='utf8');s=s.replace('<link rel="manifest" href="/manifest.webmanifest" />\n    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    ','');p.write_text(s,encoding='utf8')
p=Path('src/App.tsx');s=p.read_text(encoding='utf8').replace('FavoriteButton,Favorites,Search,RecipeBrowser,StepCooking','FavoriteButton,Favorites,StepCooking').replace("import {PwaSettings} from './components/PwaSettings';\n",'').replace('<RecipeBrowser/>','<RecipeList/>').replace('<PwaSettings/>','').replace('本地最终验收版','第三阶段 3A · 做菜体验验收版')
s=s.replace("{article && <><FavoriteButton key={route} route={route}/><ArticleContent item={article}/></>}","{article && <ArticleContent item={article}/>}")
s=s.replace("{route === 'search' && <Search/>}","{route === 'search' && <><label className=\"search-box\"><Icon name=\"search\"/><input type=\"search\" value={query} onChange={e=>setQuery(e.target.value)} placeholder=\"搜索功能或页面\" aria-label=\"搜索功能或页面\"/></label><p className=\"small-copy\">当前可搜索页面名称和 8 个功能；全文搜索与筛选将在 3B 阶段完善。</p>{query.trim() && <><p role=\"status\">找到 {matches.length} 个结果</p><div className=\"row-list\">{matches.map(m=><Row key={m.route} route={m.route} label={m.title} detail={m.detail}/>)}</div></>}</>}")
s=s.replace('可逐步查阅官方菜谱、搜索内容、筛选菜谱并收藏常用内容。安装和离线使用请查看设置中的说明。','当前为 3A 做菜体验验收版。搜索筛选、安装离线及最终收尾将按后续阶段分别验收。')
s=s.replace('收藏、阅读进度和离线缓存也可能被清除。','收藏和阅读进度也会被清除。')
s=s.replace("route==='charts'||route.startsWith('charts/')", "['charts','charts/steam-chart','charts/slow-cook-chart','charts/sous-vide-chart'].includes(route)")
p.write_text(s,encoding='utf8')
p=Path('src/components/Interactive.tsx');s=p.read_text(encoding='utf8').replace("import {searchContent,searchableContent,filterRecipes} from '../lib/search';", "const favoriteItems=[...recipes.map(r=>({route:'recipe/'+r.id,title:r.titleZh})),...cookingFunctions.map(f=>({route:f.id,title:functionLabels[f.id]})),...['steam-chart','slow-cook-chart','sous-vide-chart'].map((id,i)=>({route:'charts/'+id,title:['蒸食参考表','慢炖参考表','低温慢煮参考表'][i]}))];")
s=s.replace('searchableContent.filter','favoriteItems.filter').replace('当前浏览器或已安装的应用中','当前浏览器中')
a=s.index('export function Search()');b=s.index('export function StepCooking',a);s=s[:a]+s[b:]
p.write_text(s,encoding='utf8')
