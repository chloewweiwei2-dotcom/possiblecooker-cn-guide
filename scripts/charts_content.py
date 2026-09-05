from content_common import *

charts=[]
def chart(id,title,printed,headers,raw):
    c=dict(id=id,title=title,source=source('recipes',15 if printed<28 else 16,printed,title),headers=headers,rows=[],notes=[],reviewIds=[],reviewStatus='TRANSCRIBED_PENDING_USER_REVIEW')
    for i,line in enumerate(lines(raw)):
        cells=line.split('|')
        assert len(cells)==len(headers),(id,line)
        c['rows'].append(dict(id=f'{id}-{i+1}',cells=cells,reviewIds=[]))
    charts.append(c)
    return c
steam=chart('steam-chart','蒸食参考表 Steam Chart',26,['食材','大小／切配方式','加水量 WATER','调味建议','蒸制时间'],'''
洋蓟 Artichokes|整个|4 cups|橄榄油、柠檬皮屑|25–40 minutes
芦笋 Asparagus|整根|1 cup|橄榄油|7–13 minutes
四季豆 Beans, green|整根|1 cup|蒜末|6–10 minutes
黄荚菜豆 Beans, wax|整根|1 cup|意式调味料|6–10 minutes
甜菜 Beets|整个，不去皮|4 cups|蒜末|35–50 minutes
甜菜叶 Beet greens|粗切|1 cup|百里香|7–9 minutes
西兰花 Broccoli|修整的茎|1 cup|橄榄油|1–5 minutes
西兰花 Broccoli|小朵|1 cup|橄榄油|5–7 minutes
抱子甘蓝 Brussels sprouts|整个，修整|1 cup|百里香|8–15 minutes
卷心菜 Cabbage|切成楔形块|1 cup|柠檬汁|6–10 minutes
胡萝卜 Carrots|¼ inch 薄片|1 cup|枫糖浆|7–10 minutes
小胡萝卜 Carrots, baby|整个|1 cup|蜂蜜和姜|7–10 minutes
花椰菜 Cauliflower|小朵|1 cup|柠檬汁|5–10 minutes
带芯玉米 Corn on the cob|整根，去苞叶|2 cups|蒜味黄油|15–20 minutes
羽衣甘蓝 Kale|修整|1 cup|橄榄油和大蒜|5–8 minutes
秋葵 Okra|整个，修整|1 cup|炒香的葱|6–8 minutes
珍珠洋葱 Onions, pearl|整个|1 cup|柠檬汁|8–12 minutes
欧洲防风根 Parsnips|去皮，½ inch 薄片|1 cup|意式调味料|7–10 minutes
青豌豆 Peas, green|新鲜或冷冻，去荚|1 cup|薄荷和柠檬汁|2–4 minutes
甜脆豌豆 Peas, sugar snap|整荚，修整|1 cup|薄荷和柠檬汁|5–6 minutes
土豆（各类）Potatoes, all|½ inch 薄片|1 cup|欧芹、莳萝（原文 parsley dill）|8–12 minutes
新土豆 Potatoes, new|整个|4 cups|欧芹或迷迭香|15–20 minutes
红薯 Potatoes, sweet|½ inch 块|1 cup|蜂蜜|8–12 minutes
菠菜 Spinach|整片叶子|1 cup|橄榄油和大蒜|3–5 minutes
奶油南瓜 Squash, butternut|去皮，½ inch 方块|1 cup|枫糖浆|7–10 minutes
芜菁 Turnips|½ inch 薄片|1 cup|意式调味料|8–12 minutes
芜菁叶 Turnip greens|粗切|1 cup|橄榄油和大蒜|4–8 minutes
瑞士甜菜 Swiss Chard|粗切|1 cup|橄榄油和大蒜|3–5 minutes
西葫芦 Zucchini|1 inch 薄片|1 cup|橄榄油和意式调味料|5–8 minutes
''')
slow=chart('slow-cook-chart','慢炖参考表 Slow Cook Chart',27,['类别','肉类','LOW 烹饪时间','HIGH 烹饪时间'],'''
牛肉|牛后腿上部或下部 Top or bottom round|8–10 hours|4–5 hours
牛肉|牛后腿眼肉 Eye of the round|6–8 hours|3–4 hours
牛肉|牛肩胛肉 Chuck|8–10 hours|4–5 hours
牛肉|炖烤牛肉或牛胸肉 Pot roast or brisket|7–9 hours|3½–4½ hours
牛肉|牛小排 Short ribs|7–9 hours|3½–4½ hours
牛肉|冷冻肉丸（预熟）Frozen meatballs (precooked)|6–8 hours|3–4 hours
猪肉|小排或乡村式排骨 Baby back or country ribs|7–9 hours|3½–4½ hours
猪肉|猪里脊 Pork tenderloin|6–7 hours|3–4 hours
猪肉|猪腰肉或烤肋排 Pork loin or rib roast|7–9 hours|3½–4½ hours
猪肉|猪上肩肉或肩肉 Pork butt or shoulder|10–12 hours|5–6 hours
猪肉|带骨火腿（未熟）Ham, bone in (uncooked)|7–9 hours|3½–4½ hours
猪肉|火腿（全熟）Ham (fully cooked)|5–7 hours|2½–3½ hours
禽肉|去骨去皮胸肉 Boneless, skinless breast|6–7 hours|3–4 hours
禽肉|去骨去皮腿肉 Boneless, skinless thighs|6–7½ hours|3–4½ hours
禽肉|带骨胸肉 Bone-in breast|6–7½ hours|3–4½ hours
禽肉|带骨腿肉 Bone-in thighs|7–9 hours|3½–4½ hours
禽肉|整鸡 Whole chicken|7–9 hours|3½–4½ hours
禽肉|鸡翅 Chicken wings|6–7 hours|3–4 hours
禽肉|火鸡胸肉或腿肉 Turkey breast or thighs|7–9 hours|3½–4½ hours
鱼|1-inch 鱼片|N/A（原文未提供）|30–45 minutes
其他|炖肉（牛、羊、犊牛、兔）Stew meat|7–9 hours|3–4 hours
''')
sous=chart('sous-vide-chart','低温慢煮参考表 Sous Vide Chart',28,['类别','食材','份量／厚度','温度与烹饪时间'],'''
牛肉|去骨肋眼 Boneless ribeye|2 块牛排，每块 14 oz，厚 1–2 inches|125°F Rare：1–5 hrs；130°F Medium Rare：1–5 hrs；135°F Medium：1–5 hrs；145°F Medium Well：1–5 hrs；155°F Well Done：1–5 hrs
牛肉|去骨肋眼 Boneless ribeye|3 块牛排，每块 14 oz，厚 1–2 inches|125°F Rare：1–5 hrs；130°F Medium Rare：1–5 hrs；135°F Medium：1–5 hrs；145°F Medium Well：1–5 hrs；155°F Well Done：1–5 hrs
牛肉|红屋牛排 Porterhouse|2 块牛排，每块 14 oz，厚 1–2 inches|125°F Rare：1–5 hrs；130°F Medium Rare：1–5 hrs；135°F Medium：1–5 hrs；145°F Medium Well：1–5 hrs；155°F Well Done：1–5 hrs
牛肉|菲力牛排 Filet mignon|4 块牛排，每块 8 oz，厚 1–2 inches|125°F Rare：1–5 hrs；130°F Medium Rare：1–5 hrs；135°F Medium：1–5 hrs；145°F Medium Well：1–5 hrs；155°F Well Done：1–5 hrs
牛肉|腹胁牛排 Flank|3 块牛排，每块 12 oz，厚 1–2 inches|125°F Rare：2–5 hrs；130°F Medium Rare：2–5 hrs；135°F Medium：2–5 hrs；145°F Medium Well：2–5 hrs；155°F Well Done：2–5 hrs
牛肉|板腱牛排 Flat iron|2 块牛排，每块 10 oz，厚 1–2 inches|125°F Rare：2–5 hrs；130°F Medium Rare：2–5 hrs；135°F Medium：2–5 hrs；145°F Medium Well：2–5 hrs；155°F Well Done：2–5 hrs
牛肉|牛胸肉 Beef brisket|3 lbs，厚 3–4 inches|145°F；24–48 hrs
猪肉|去骨猪排 Boneless prok chops（保留原文 prok）|5 块猪排，每块 6–8 oz，厚 2½ inches|145°F；1–4 hrs
猪肉|带骨猪排 Bone-In pork chops|2 块猪排，每块 10–12 oz，厚 2½ inches|145°F；1–4 hrs
猪肉|里脊 Tenderloin|1 条里脊；原文重量 1–1/2 lbs（待核实）；厚 2½ inches|145°F；1–4 hrs
猪肉|香肠 Sausages|6 根，每根 2–3 oz|165°F；2–5 hrs
猪肉|去骨猪肩肉 Boneless pork shoulder|3 lbs，厚 3–4 inches|165°F；12–24 hrs
鸡肉|鸡胸 Chicken Breast|6 块，每块 6–8 oz，厚 1–2 inches|165°F；1–3 hrs
鸡肉|去骨鸡腿肉 Boneless Chicken Thighs|6 块，每块 4–6 oz，厚 1–2 inches|165°F；1–3 hrs
鸡肉|带骨鸡腿肉 Bone-In Chicken Thighs|4 块，每块 4–6 oz，厚 1–2 inches|165°F；1½–4 hrs
鸡肉|鸡腿四分体 Chicken Leg Quarters|2 块，每块 12–14 oz，厚 1–2 inches|165°F；1½–4 hrs
鸡肉|鸡翅与翅根 Chicken Wings & Drummettes|2 lbs|165°F；1–3 hrs
鸡肉|半只鸡 Half Chicken|2½–3 lbs|165°F；2–3 hrs
海鲜|白肉鱼 Whitefish（Cod 鳕鱼、Haddock 黑线鳕、Whiting 牙鳕、Pollock 狭鳕）|2 份，每份 6–10 oz，厚 1–2 inches|130°F；1 hr–1½ hrs
海鲜|三文鱼 Salmon|4 份，每份 6–10 oz，厚 1–2 inches|130°F；1 hr–1½ hrs
海鲜|虾 Shrimp|2 lbs|130°F；30 mins–2 hrs
蔬菜|芦笋 Asparagus|1–2 lbs|180°F；30 mins
蔬菜|西兰花 Broccoli|1–1½ lbs|180°F；30 mins
蔬菜|抱子甘蓝 Brussels Sprouts|1–2 lbs|180°F；45 mins
蔬菜|胡萝卜 Carrots|1–1½ lbs|180°F；45 mins
蔬菜|花椰菜 Cauliflower|1–1½ lbs|180°F；30 mins
蔬菜|四季豆 Green Beans|1–1½ lbs|180°F；30 mins
蔬菜|南瓜 Squash|1–1½ lbs|185°F；1 hr
蔬菜|红薯 Sweet Potatoes|1–1½ lbs|185°F；1 hr
蔬菜|土豆 Potatoes|1–2 lbs|190°F；1 hr
''')
sous['source']['printedPage']='28–29'
sous['notes']=lines('''
请注意：表中的时间范围包括最短和最长烹饪时间；超过最长时间后，食物会开始劣化。
烹饪时间取决于食物重量及厚度，较厚的肉块需要更久。如食材厚于 2 1/2 inches，应增加时间。（原文未给出具体增加量。）
''')
for i,row in enumerate(sous['rows']):
    row['source']=source('recipes',16,28 if i<12 else 29,'Sous Vide Chart / '+row['cells'][1])
assert [len(c['rows']) for c in charts]==[29,21,30]
