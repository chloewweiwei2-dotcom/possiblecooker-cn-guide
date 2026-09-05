import {useState} from 'react';
import {searchContent,filterRecipes,categories,type Filters} from '../lib/search';
import {functionLabels} from '../lib/chinese-display';
import {RecipeList} from './ContentViews';
export function SearchContent(){
 const [query,setQuery]=useState('');const matches=searchContent(query);
 return <><label className="search-box"><span>搜索</span><input type="search" aria-label="搜索官方内容" placeholder="中文或英文菜名、食材、功能" value={query} onChange={e=>setQuery(e.target.value)}/></label><p className="small-copy">搜索已有的官方菜名、食材、功能及说明。不搜索非官方中式理解。</p>{query.trim()?<><p role="status">找到 {matches.length} 个结果</p><div className="row-list">{matches.map(m=><a className="row" href={'#/'+m.route} key={m.route}><span className="row-copy"><strong>{m.title}</strong><span>{m.kind}</span></span></a>)}</div>{!matches.length&&<p>没有找到相关内容，请换一个菜名、食材或功能名称。</p>}</>:<p>可输入“菠菜”“慢炖”，也可输入官方英文名称。</p>}</>;
}
const empty:Filters={category:'',functionId:'',ingredient:'',time:''};
export function RecipeFilters(){
 const [filters,setFilters]=useState<Filters>(empty);const items=filterRecipes(filters);
 function update(key:keyof Filters,value:string){setFilters(f=>({...f,[key]:value}));}
 return <><div className="filter-controls"><label>官方类别<select value={filters.category} onChange={e=>update('category',e.target.value)}><option value="">全部类别</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label>使用功能<select value={filters.functionId} onChange={e=>update('functionId',e.target.value)}><option value="">全部功能</option>{Object.entries(functionLabels).map(([id,title])=><option key={id} value={id}>{title}</option>)}</select></label><label>主要食材<input type="search" value={filters.ingredient} onChange={e=>update('ingredient',e.target.value)} placeholder="输入中文或英文食材名"/></label><label>官方烹饪时间<select value={filters.time} onChange={e=>update('time',e.target.value)}><option value="">不限时间</option><option value="30">不超过 30 分钟</option><option value="60">不超过 1 小时</option><option value="120">不超过 2 小时</option><option value="240">不超过 4 小时</option><option value="480">不超过 8 小时</option></select></label><button onClick={()=>setFilters({...empty})}>清除筛选，查看全部</button></div><p className="small-copy">食材按官方食材表中的文字匹配；功能不含技巧中的可选功能。时间仅使用官方烹饪时间，不累加准备或静置时间；特殊说明仍在菜谱中保留。</p><p role="status">符合条件：{items.length} 道</p>{items.length?<RecipeList items={items}/>:<p>没有符合条件的菜谱，可点击“清除筛选，查看全部”。</p>}</>;
}
