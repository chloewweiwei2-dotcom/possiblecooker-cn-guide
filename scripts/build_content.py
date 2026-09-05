"""Build reviewable JSON from the human-authored translations and the supplied PDFs only."""
import re, shutil, hashlib
import pdfplumber
from content_common import *
from recipes_content import recipes
from manual_content import functions, articles
from charts_content import charts
from reviews_content import reviews
from editorial_content import editorial

all_objects={x['id']:x for x in recipes+functions+articles+charts}
for review in reviews:
    for target in review['targets']:
        all_objects[target]['reviewIds'].append(review['id'])
        all_objects[target]['reviewStatus']='SOURCE_REVIEW_REQUIRED'

def attach(id,field,numbers,*ids):
    for n in numbers: all_objects[id][field][n-1]['reviewIds'].extend(ids)
attach('sear-saute','steps',[3,4],'SR-02')
attach('sear-saute','steps',[5],'SR-21')
attach('sear-saute','notes',[3],'SR-01')
attach('first-use','items',[4],'SR-03')
attach('safety','items',[4,15,19,43],'SR-05')
attach('safety','items',[22],'SR-01')
attach('safety','items',[50],'SR-15')
attach('safety','items',[33],'SR-17')
attach('buttons','items',[4],'SR-12','SR-21')
attach('getting-started','items',[5],'SR-12')
attach('steam','steps',[4,5,6],'SR-04')
attach('steam','notes',[1],'SR-04')
attach('coconut-chicken','ingredients',[11],'SR-06')
attach('coconut-chicken','ingredients',[10],'SR-14')
attach('coconut-chicken','steps',[6,7],'SR-14')
attach('deviled-eggs','steps',[6,8],'SR-07')
attach('deviled-eggs','tips',[1],'SR-07')
attach('oatmeal','steps',[4],'SR-08')
attach('oatmeal','steps',[1,2,3],'SR-01')
attach('frittata','steps',[4,6],'SR-01')
attach('risotto','steps',[4,5],'SR-01')
attach('bread-pudding','ingredients',[1],'SR-09')
attach('bread-pudding','steps',[3,4,5],'SR-13')
attach('pulled-pork','steps',[2],'SR-15')
attach('short-ribs','steps',[6],'SR-19')
attach('product-tips','items',[3],'SR-17')
attach('cooking-tips','items',[2],'SR-18')
charts[2]['rows'][6]['reviewIds']=['SR-11']
charts[2]['rows'][9]['reviewIds']=['SR-10']
charts[2]['rows'][7]['reviewIds']=['SR-22']
charts[0]['rows'][20]['reviewIds']=['SR-22']
charts[1]['rows'][11]['reviewIds']=['SR-16']
charts[1]['rows'][19]['reviewIds']=['SR-16']

safety=all_objects['safety']['items']
for item in recipes+functions+articles+charts:
    item['safetyWarnings']=[]
    ids=[]
    if item['id']=='sear-saute' or 'sear-saute' in item.get('functions',[])+item.get('optionalFunctions',[]): ids+=[22,25]
    if item['id'] in ['slow-cook','slow-cook-chart','first-use'] or 'slow-cook' in item.get('functions',[]): ids+=[39,50]
    if item['id']=='first-use': ids+=[20]
    if item.get('usesOven') or item['id']=='product-tips': ids+=[33,34,46]
    if item['id']=='braise' or 'braise' in item.get('functions',[]): ids+=[24,34]
    if item['id']=='cleaning': ids+=[56,57]
    item['safetyWarnings']=[safety[n-1] for n in dict.fromkeys(ids)]

# English step text is extracted from the actual Directions column, preserving order.
pdf_path=Path('C:/Users/86136/Downloads')
with pdfplumber.open(pdf_path/FILES['recipes']) as pdf:
    for r in recipes:
        page=pdf.pages[r['source']['pdfPage']-1]
        half=page.width/2
        left=half if int(r['source']['printedPage'])%2 else 0
        crop=page.crop((left,0,left+half,page.height))
        r['originalText']=crop.extract_text(x_tolerance=2) or ''
        words=crop.extract_words()
        heading=next(w for w in words if w['text']=='DIRECTIONS')
        ingredient_heading=next(w for w in words if w['text']=='INGREDIENTS')
        ingredient_tip_y=[w['top'] for w in words if w['text']=='TIP' and w['x0']<heading['x0']]
        ingredient_bottom=min(ingredient_tip_y)-2 if ingredient_tip_y else page.height-22
        r['originalIngredientsText']=page.crop((ingredient_heading['x0']-2,ingredient_heading['bottom']+1,heading['x0']-5,ingredient_bottom)).extract_text(x_tolerance=2) or ''
        tip_y=[w['top'] for w in words if w['text']=='TIP' and w['x0']>=heading['x0']]
        bottom=min(tip_y)-2 if tip_y else page.height-22
        direction=page.crop((heading['x0']-2,heading['bottom']+1,left+half-20,bottom)).extract_text(x_tolerance=2) or ''
        starts=[w for w in words if w['text'].isdigit() and heading['x0']-2 <= w['x0'] < heading['x0']+5 and heading['bottom'] < w['top'] < bottom]
        starts.sort(key=lambda w:w['top'])
        assert len(starts)==len(r['steps']),(r['id'],len(starts),len(r['steps']),direction)
        for i,(s,m) in enumerate(zip(r['steps'],starts)):
            assert int(m['text'])==s['number']
            end=starts[i+1]['top']-0.5 if i+1<len(starts) else bottom
            text=page.crop((heading['x0']-2,m['top']-0.5,left+half-20,end)).extract_text(x_tolerance=2) or ''
            text=re.sub(r'^\d+\s+','',text)
            text=re.sub(r'Questions\?\s*ninjakitchen\.com.*$','',text,flags=re.S)
            s['originalText']=re.sub(r'\s+',' ',text).strip()
        # Keep exact header tokens in a separate field for independent validation.
        full=' '.join(r['originalText'].split())
        header=re.search(r'PREP:\s*(.*?)\s*\|\s*(.*?)\s*\|\s*MAKES:\s*(.*?)(?:\s+INGREDIENTS)',full)
        r['originalHeader']=header.group(0) if header else full[:full.find('INGREDIENTS')]

manual_pages=json.loads((ROOT/'references/extracted/manual.json').read_text(encoding='utf-8'))
for obj in functions+articles:
    doc='manual' if obj['source']['document']==FILES['manual'] else 'recipes'
    pages=json.loads((ROOT/f'references/extracted/{doc}.json').read_text(encoding='utf-8'))
    obj['originalText']=pages[obj['source']['pdfPage']-1]['text']
    if obj['id']=='safety': obj['originalText']+='\n'+pages[1]['text']
for obj in functions:
    obj['source']['printedPage']='2–3'
for c in charts:
    pages=json.loads((ROOT/'references/extracted/recipes.json').read_text(encoding='utf-8'))
    c['originalText']=pages[c['source']['pdfPage']-1]['text']

dest=ROOT/'public/sources'
dest.mkdir(parents=True,exist_ok=True)
manifest=[]
for name in FILES.values():
    shutil.copy2(pdf_path/name,dest/name)
    manifest.append({'file':name,'sha256':hashlib.sha256((dest/name).read_bytes()).hexdigest()})
write('official/recipes.json',recipes)
write('manual/functions.json',functions)
write('manual/articles.json',articles)
write('official/charts.json',charts)
write('source-reviews.json',reviews)
write('chinese-context/context.json',editorial)
write('source-manifest.json',manifest)

report=['# 第二阶段人工核对清单','',f'共 {len(reviews)} 项，均保留 SOURCE_REVIEW_REQUIRED。人工同意展示不代表源资料问题已解决。','']
for r in reviews:
    report += [f"## {r['id']} · {r['title']}",'',r['message'],'','来源：'+ '；'.join(f"{s['document']}，PDF 第 {s['pdfPage']} 页，书内 {s['printedPage']}，{s['section']}" for s in r['sources']),'','状态：SOURCE_REVIEW_REQUIRED','']
(ROOT/'docs/source-review-checklist.md').write_text('\n'.join(report),encoding='utf-8')
print(f'Built {len(recipes)} recipes / {sum(len(r["steps"]) for r in recipes)} steps; {len(functions)} functions; {len(articles)} articles; {sum(len(c["rows"]) for c in charts)} chart rows; {len(reviews)} reviews.')
