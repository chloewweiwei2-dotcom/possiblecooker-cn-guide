from pathlib import Path
p=Path('src/components/ContentViews.tsx')
s=p.read_text(encoding='utf8')
s=s.replace('<ReviewNotices ids={item.reviewIds}/>{item.originalText', '<ReviewNotices ids={item.reviewIds.filter(id=>!suppressed.includes(id))}/>{item.originalText')
s=s.replace("{r.reviewIds.some(id=>readerReviews[id]) && <span className=\"review-label\">请留意菜谱中的资料提示</span>}", '')
for field in ['tips','ingredients','steps']:
 s=s.replace('items={r.'+field+'}', 'items={r.'+field+'} suppressed={r.reviewIds}')
for field in ['steps','notes','items']:
 s=s.replace('items={item.'+field+'}', 'items={item.'+field+'} suppressed={item.reviewIds}')
s=s.replace('<ReviewNotices ids={chart.reviewIds}/>', '<ReviewNotices ids={chart.reviewIds.filter(id=>!chart.rows.some(row=>row.reviewIds.includes(id)))}/>')
s=s.replace('<h2>{r.id} · {r.title}</h2><p>{r.message}</p>', '<h2>{r.id} · {r.title}</h2><p>当前分类：<code>{reviewPolicy[r.id].category}</code> · 展示：{({strong:"明显警告",gentle:"轻提示",plain:"普通说明",hidden:"仅内部记录"})[reviewPolicy[r.id].emphasis]}</p><p>原始核对记录：{r.message}</p>{editorialChanges[r.id] && <p>展示修改记录：{editorialChanges[r.id]}</p>}')
p.write_text(s,encoding='utf8')
p=Path('src/lib/chinese-display.ts')
s=p.read_text(encoding='utf8').replace(".replace(/START\\/START/g,'开始／开始（原文按钮名有误）')", ".replace(/START\\/START/g,'START/STOP')")
s=s.replace("'原文句末另多出“蒸”的字样，未据此新增操作。'", "''").replace("'（原文句子在此中断）'", "''")
s=s.replace("  'SR-20':", "  'SR-22':'原文未明确欧芹与莳萝的连接关系，本指南不推断为任选或同时使用。',\n  'SR-20':")
p.write_text(s,encoding='utf8')
