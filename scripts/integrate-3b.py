from pathlib import Path
import json
p=Path('package.json');d=json.loads(p.read_text());d['scripts']['build']='tsc --noEmit && vite build && node scripts/build-offline.mjs';p.write_text(json.dumps(d,indent=2)+'\n')
p=Path('index.html');s=p.read_text(encoding='utf8').replace('<meta name="theme-color"','<link rel="manifest" href="/manifest.webmanifest" />\n    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />\n    <meta name="theme-color"');p.write_text(s,encoding='utf8')
p=Path('src/main.tsx');s=p.read_text().replace("import './styles.css';","import './styles.css';\nimport {initializePwa} from './lib/pwa';\ninitializePwa(import.meta.env.PROD);");p.write_text(s)
p=Path('src/App.tsx');s=p.read_text(encoding='utf8');s=s.replace("import navigation", "import {SearchContent,RecipeFilters} from './components/FindContent';\nimport {NetworkNotice,PwaControls} from './components/PwaControls';\nimport navigation")
s=s.replace("{route === 'recipes' && <RecipeList/>}","{route === 'recipes' && <RecipeFilters/>}")
a=s.index("        {route === 'search' &&");b=s.index("        {route === 'settings' &&",a);s=s[:a]+"        {route === 'search' && <SearchContent/>}\n"+s[b:]
s=s.replace('<div className="row-list">{info.map', '<PwaControls/><div className="row-list">{info.map')
s=s.replace("      {route === 'home' ?", "      <NetworkNotice/>\n      {route === 'home' ?")
s=s.replace('做菜体验验收版','搜索与离线验收版')
# Only status copy changes; 3C information-page editing remains deferred.
s=s.replace('搜索筛选、安装离线及最终收尾将按后续阶段分别验收。','本轮验收搜索筛选、安装与离线；最终收尾留待下一阶段。')
p.write_text(s,encoding='utf8')
p=Path('src/components/ContentViews.tsx');s=p.read_text(encoding='utf8').replace("['早餐','前菜与配菜','汤与炖菜','蒸制菜','主菜','甜点'].map(category", "['早餐','前菜与配菜','汤与炖菜','蒸制菜','主菜','甜点'].filter(category=>items.some(r=>r.category===category)).map(category");p.write_text(s,encoding='utf8')
