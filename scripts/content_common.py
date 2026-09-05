import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = {'manual': 'ninja-foodi-possiblecooker-pro-mc1001-a-manual.pdf', 'recipes': 'ninja-foodi-possiblecooker-pro-recipes-and-cooking-charts.pdf'}
def source(doc, pdf, printed, section):
    return {'document': FILES[doc], 'pdfPage': pdf, 'printedPage': str(printed), 'section': section, 'type': 'official'}
def lines(s):
    return [x.strip() for x in s.strip().split('\n') if x.strip()]
def write(name, value):
    path = ROOT / 'src/data' / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
def entries(text, place=''):
    return [{'number': i+1, 'text': t, 'place': place, 'reviewIds': []} for i,t in enumerate(lines(text))]
