"""Extract embedded official photographs without altering the image bytes."""
import json
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DOCUMENT = 'ninja-foodi-possiblecooker-pro-recipes-and-cooking-charts.pdf'
PDF = PdfReader(ROOT / 'public/sources' / DOCUMENT)
# Verified against the rendered recipe spreads; page numbers are PDF pages.
MATCHES = {
    'frittata': (5, 0), 'oatmeal': (6, 1), 'focaccia': (6, 0),
    'minestrone': (7, 0), 'deviled-eggs': (8, 0), 'risotto': (9, 0),
    'spaghetti': (12, 0), 'pot-roast': (13, 0), 'bread-pudding': (14, 0),
}
target = ROOT / 'public/images/recipes'
target.mkdir(parents=True, exist_ok=True)
records = {}
for recipe in json.loads((ROOT / 'src/data/official/recipes.json').read_text(encoding='utf-8')):
    key = recipe['id']
    if key in MATCHES:
        page, index = MATCHES[key]
        embedded = PDF.pages[page - 1].images[index]
        (target / f'{key}.jpg').write_bytes(embedded.data)
        width, height = embedded.image.size
        records[key] = dict(status='OFFICIAL_IMAGE', src=f'/images/recipes/{key}.jpg',
                            width=width, height=height,
                            source=dict(document=DOCUMENT, pdfPage=page, imageName=embedded.name))
    else:
        records[key] = dict(status='IMAGE_REQUIRED', src='/images/recipes/placeholder.svg',
                            width=800, height=600, source=None)
(ROOT / 'src/data/recipe-images.json').write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(records, ensure_ascii=False, indent=2))
