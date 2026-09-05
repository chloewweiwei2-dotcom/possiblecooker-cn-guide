"""Content checks against PDF-derived English, not a replacement for human translation review."""
import json,re,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(p): return json.loads((ROOT/'src/data'/p).read_text(encoding='utf-8'))
recipes=read('official/recipes.json'); functions=read('manual/functions.json'); articles=read('manual/articles.json'); charts=read('official/charts.json'); reviews=read('source-reviews.json')
assert len(recipes)==15 and len(functions)==8
expected=[8,5,8,6,11,6,10,6,6,7,10,4,4,7,6]
assert [len(r['steps']) for r in recipes]==expected
assert len(next(a for a in articles if a['id']=='safety')['items'])==59
assert [len(c['rows']) for c in charts]==[29,21,30]
review_ids={r['id'] for r in reviews}
all_objects=recipes+functions+articles+charts
assert len({x['id'] for x in all_objects})==len(all_objects)

def numbers(s):
    s=s.replace('½',' 1/2').replace('¾',' 3/4').replace('¼',' 1/4')
    s=re.sub(r'(?<!\d)11/2(?!\d)','1 1/2',s)
    # These stacked fractions were visually verified on the supplied PDF pages.
    for token,value in [('101/2','10 1/2'),('21/2','2 1/2'),('31/2','3 1/2'),('41/2','4 1/2')]:
        s=re.sub(r'(?<!\d)'+token+r'(?!\d)',value,s)
    # English singular "an additional hour" is faithfully translated as 1 hour.
    s=s.replace('an additional hour','an additional 1 hour')
    return re.findall(r'\d+(?:/\d+)?',s)

for r in recipes:
    assert numbers(r['originalIngredientsText'])==numbers(' '.join(e['text'] for e in r['ingredients'])),(r['id'],'ingredient numeric mismatch',numbers(r['originalIngredientsText']),numbers(' '.join(e['text'] for e in r['ingredients'])))
    for key,label in [('prep','PREP'),('cook','COOK'),('makes','MAKES'),('proof','PROOF')]:
        if r[key]: assert f'{label}: {r[key]}' in r['originalHeader'],(r['id'],key)
    assert [s['number'] for s in r['steps']]==list(range(1,len(r['steps'])+1))
    for step in r['steps']:
        assert numbers(step['originalText'])==numbers(step['text']),(r['id'],step['number'],'numeric mismatch',numbers(step['originalText']),numbers(step['text']))
        assert step['place'],(r['id'],'missing operation location')
    assert r['usesOven']==any('传统烤箱' in s['place'] for s in r['steps'])
    for group in ['steps','ingredients','tips']:
        for entry in r[group]: assert set(entry['reviewIds']) <= review_ids
for obj in all_objects:
    assert obj['source']['type']=='official' and obj['source']['pdfPage']>0 and obj['source']['printedPage']
    assert obj['originalText']
    assert set(obj['reviewIds'])<=review_ids
    for entry in obj.get('items',[])+obj.get('notes',[])+obj.get('rows',[]):
        if isinstance(entry,dict): assert set(entry['reviewIds'])<=review_ids
for review in reviews:
    assert review['status']=='SOURCE_REVIEW_REQUIRED' and review['sources'] and review['originalExcerpts']
    assert all(any(o['id']==t and review['id'] in o['reviewIds'] for o in all_objects) for t in review['targets'])
for item in read('chinese-context/context.json'):
    assert item['sourceType']=='editorial' and '非 Ninja 官方' in item['label']
for item in read('source-manifest.json'):
    assert hashlib.sha256((ROOT/'public/sources'/item['file']).read_bytes()).hexdigest()==item['sha256']
for p in (ROOT/'src').rglob('*'):
    if p.suffix in ['.tsx','.ts','.json']:
        assert '????' not in p.read_text(encoding='utf-8'),('encoding corruption',str(p))
assert recipes[2]['functions']==['proof']
assert recipes[9]['ingredients'][0]['text'].startswith('4 pounds')
assert charts[2]['rows'][6]['cells'][-1]=='145°F；24–48 hrs'
assert charts[0]['rows'][6]['cells'][-1]=='1–5 minutes'
assert [row['reviewIds'] for row in charts[2]['rows']][9]==['SR-10']
raw=json.loads((ROOT/'references/extracted/recipes.json').read_text(encoding='utf-8'))
steam_lines=[line for line in raw[14]['text'].splitlines() if line.endswith('minutes')][:29]
assert len(steam_lines)==29
for original,row in zip(steam_lines,charts[0]['rows']):
    assert numbers(original)==numbers(' '.join(row['cells'])),('steam chart',row['id'])
slow_text=raw[14]['text'].split('TYPE OF MEAT')[1]
slow_lines=[line for line in slow_text.splitlines() if line.endswith(('hours','minutes'))]
assert len(slow_lines)==21
for original,row in zip(slow_lines,charts[1]['rows']):
    assert numbers(original)==numbers(' '.join(row['cells'])),('slow chart',row['id'])
sous_text=raw[15]['text'].split('Beef brisket')[1]
sous_lines=[line for line in ('Beef brisket'+sous_text).splitlines() if '°F' in line]
assert len(sous_lines)==24
for original,row in zip(sous_lines,charts[2]['rows'][6:]):
    assert numbers(original)==numbers(' '.join(row['cells'])),('sous chart',row['id'],numbers(original),numbers(' '.join(row['cells'])))
for i,row in enumerate(charts[2]['rows'][:6]):
    assert row['cells'][3]==('；'.join(f'{t}°F {label}：{1 if i<4 else 2}–5 hrs' for t,label in [(125,'Rare'),(130,'Medium Rare'),(135,'Medium'),(145,'Medium Well'),(155,'Well Done')]))
print('PASS: recipe ingredient numeric tokens, 104 ordered bilingual steps and numeric tokens, official header values, 8 functions, 59 safety warnings, all 80 chart rows, review links, editorial separation and original PDF hashes.')
