from pathlib import Path
p=Path('src/components/ContentViews.tsx');s=p.read_text(encoding='utf8').replace('熟度名称译为中文，温度保留官方华氏数值，未进行换算。','摄氏为辅助换算值，已取整至最接近的 5°C；括号内是官方华氏原值。')
s=s.replace('{chineseText(n)}</p>', '<TemperatureText text={chineseText(n)}/></p>').replace('{chartText(row.cells[i])}</dd>','<TemperatureText text={chartText(row.cells[i])}/></dd>')
p.write_text(s,encoding='utf8')
p=Path('src/App.tsx');s=p.read_text(encoding='utf8').replace("import navigation", "import {temperatureExplanation} from './lib/temperature';\nimport navigation");s=s.replace('<h2>辅助解释</h2>','<h2>温度辅助换算</h2><p>{temperatureExplanation}</p><h2>辅助解释</h2>');p.write_text(s,encoding='utf8')
p=Path('src/lib/chinese-display.ts');s=p.read_text(encoding='utf8').replace("  let text=input", "  let text=input.replace(/以 5 度为增量/g,'以官方华氏温标的 5 度为增量（调整幅度，不是目标温度）')");p.write_text(s,encoding='utf8')
p=Path('tests/chinese-display.cjs');s=p.read_text(encoding='utf8').replace("return text.replace(/PossibleCooker", "return text.replace(/°[CF]/g,'').replace(/PossibleCooker");p.write_text(s,encoding='utf8')
