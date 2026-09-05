from content_common import *

recipes = []
def recipe(id, en, zh, category, pdf, printed, prep, cook, makes, functions, ingredients, steps, tips='', proof=None):
    item = dict(id=id, title=en, titleZh=zh, category=category, source=source('recipes',pdf,printed,en), prep=prep, cook=cook, makes=makes, proof=proof, functions=functions.split('|'), ingredients=entries(ingredients), steps=entries(steps), tips=entries(tips), reviewIds=[], reviewStatus='TRANSCRIBED_PENDING_USER_REVIEW')
    recipes.append(item)
    return item

recipe('frittata','Egg Frittata with Hash Browns and Bacon','薯饼培根蛋饼','早餐',5,6,'15 MINUTES','52 MINUTES','8 SERVING','sear-saute|bake', '''
12 条生培根，切碎
1 个大白洋葱，去皮、切碎
2 个甜椒（颜色自选），去蒂、去籽、切碎
2 cups 冷冻薯饼土豆丝（hash brown potatoes）
18 个大鸡蛋，打散
1 cup 全脂牛奶
2 cups 切达奶酪丝
Kosher salt（粗盐），按需
黑胡椒粉，按需
''','''
移开锅盖。旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
预热完成后，将培根加入锅中，不盖盖烹饪 12 分钟，经常搅拌。
将洋葱和甜椒加入锅中，不盖盖烹饪 5 分钟，期间搅拌两次。
将薯饼土豆丝加入锅中，搅拌混合，然后盖盖烹饪 5 分钟。
食材烹饪时，在大碗中将鸡蛋、牛奶和奶酪搅打混合。
将蛋液混合物、盐和胡椒加入锅中，搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 300°F，时间设为 30 分钟。按 START/STOP 继续烹饪。
烹饪完成后，用橡胶头锅铲立即盛出蛋饼。
''','第 5 步的切达奶酪可换成自选的奶酪丝、磨碎奶酪或碎奶酪。菲达奶酪也可做出美味蛋饼。')

recipe('oatmeal','Cherry Maple Oatmeal','樱桃枫糖燕麦粥','早餐',6,8,'10 MINUTES','3 HOURS 10 MINUTES','4 SERVINGS','sear-saute|slow-cook','''
8 cups 低脂牛奶
1/2 cup 枫糖浆
4 tablespoons 无盐黄油
1 tablespoon 香草精
2 teaspoons 肉桂粉
1/2 teaspoon 肉豆蔻粉
Kosher salt（粗盐），按需
2 cups 未煮的钢切燕麦
2 cups 去核干樱桃或新鲜樱桃
''','''
将牛奶、枫糖浆、黄油、香草精、肉桂、肉豆蔻和盐放入锅中。搅拌混合，然后盖盖。
旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始烹饪。烹饪 10 分钟。
10 分钟后，将燕麦加入锅中，搅拌混合，然后盖盖。
旋钮转至 SLOW COOK，温度设为 HI，时间设为 3 小时。
烹饪完成后，加入樱桃并搅拌混合。立即食用。
''','可将 2 cups 干樱桃换成 2 cups 干果或冷冻水果，例如蓝莓、草莓或覆盆子。')

recipe('focaccia','Simple Focaccia','简易佛卡夏面包','前菜与配菜',6,9,'10 MINUTES','18 MINUTES','4–6 SERVINGS','proof','''
16 ounces 现成披萨面团，室温
防粘烹饪喷雾
2 tablespoons 特级初榨橄榄油，另备一些供食用时使用
2 枝新鲜迷迭香，切碎
海盐，按需
新鲜黑胡椒，按需
''','''
将披萨面团揉成球，再压成 4-inch 圆饼。在面团顶部和锅内轻喷烹饪喷雾。
将面团放入锅中，然后盖盖。
旋钮转至 PROOF，时间设为 60 分钟，温度设为 95°F。按 START/STOP 开始发酵。
面团发酵时，将传统烤箱预热至 425°F。
发酵完成后移开锅盖，用手指将面团均匀铺满锅底表面。轻轻多次按压面团，形成凹坑。
将橄榄油、迷迭香、盐和胡椒均匀撒在面团上。
将整个内锅（不带锅盖）放入传统烤箱，烘烤 18 分钟，直到面包呈浅金黄色。
烹饪完成后，从烤箱取出内锅。趁热食用或放凉至室温食用，可按需另配橄榄油。
''','想增加变化，可在第 6 步将洋葱片、切碎的日晒番茄和／或绿橄榄放在面团上。',proof='1 HOUR')

recipe('minestrone','Minestrone Soup','意式蔬菜汤','汤与炖菜',7,10,'15 MINUTES','35 MINUTES','12 SERVINGS','sear-saute|bake','''
1 tablespoon 菜籽油
3 根胡萝卜，去皮、切薄片
3 根芹菜茎，切薄片
1 个白洋葱，切碎
4 瓣大蒜，去皮、切末
1 罐（28 ounces）番茄丁
12 cups 蔬菜高汤
1 tablespoon 干牛至
1 盒（16 ounces）干弯管意面
Kosher salt（粗盐），按需
黑胡椒粉，按需
1 袋（12 ounces）四季豆，切碎
1/4 cup 欧芹，切碎
1 cup 磨碎的帕尔马干酪
红辣椒碎，按需
''','''
移开锅盖。旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
将油、胡萝卜、芹菜、洋葱和大蒜加入锅中。不盖盖烹饪 5 分钟，偶尔搅拌。
将番茄、高汤、牛至、意面、盐和胡椒加入锅中。搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 400°F，时间设为 30 分钟，按 START/STOP 开始烹饪。
25 分钟后，将四季豆加入锅中，搅拌混合。不盖盖烹饪 5 分钟，直到四季豆变软。
烹饪完成后立即食用，可按需配欧芹、帕尔马干酪和辣椒碎。
''','烹饪完成后，意面会继续吸收蔬菜高汤。可在烹饪后额外加入最多 2 cups 高汤，以保持汤状稠度。')

recipe('deviled-eggs','Deviled Eggs','魔鬼蛋','蒸制菜',8,13,'10 MINUTES','20 MINUTES','12 SERVINGS','steam','''
1 cup 水
12 个大鸡蛋
3 tablespoons 蛋黄酱
2 tablespoons 第戎芥末酱
2 tablespoons 腌黄瓜汁
2 dashes 辣椒酱
1/2 teaspoon 烟熏红椒粉，另备一些作装饰
3 tablespoons 特级初榨橄榄油
Kosher salt（粗盐），按需
黑胡椒粉，按需
''','''
将水放入锅中，然后盖盖。
旋钮转至 STEAM，时间设为 20 分钟，按 START/STOP 开始预热。
预热完成后，移开锅盖，轻轻将鸡蛋放入锅中，然后盖盖。
鸡蛋烹饪时，在大碗中按需加入水和冰，准备冰浴。
烹饪完成后，将鸡蛋从锅中取出并放入冰浴，确保鸡蛋完全浸没。冰浴至少 15 分钟，以停止烹饪过程。
鸡蛋冷却时，将所有剩余食材放入一个大碗中。
鸡蛋完全冷却后，在冷水下剥壳。
将去壳鸡蛋切成两半。轻轻挖出蛋黄，放入一个中碗，与所有剩余食材放在一起。
搅打食材至少 30 秒，或直到完全混合、质地顺滑。
将蛋黄混合物装入可重复密封的塑料袋，剪掉袋子一角。在每半个蛋白中挤入约 1½ tablespoons 馅料，填至高出蛋白。
按需另撒红椒粉装饰，即可食用。
''','在第 5 步，可用白葡萄酒醋或苹果醋替换腌黄瓜汁。')

recipe('risotto','Butternut Squash & Bacon Risotto','奶油南瓜培根意式烩饭','主菜',9,14,'10 MINUTES','50 MINUTES','4 SERVINGS','sear-saute','''
8 ounces 生培根，切碎
1 个小白洋葱，切碎
8 cups 鸡高汤
2 cups Arborio 意大利米
8 ounces 冷冻奶油南瓜
1/4 teaspoon 干鼠尾草粉
1/2 cup 帕尔马干酪丝
''','''
旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
预热完成后，将培根加入锅中，不盖盖烹饪 10 分钟，偶尔搅拌。
将洋葱加入锅中，不盖盖烹饪 5 分钟，偶尔搅拌。
将高汤、米、南瓜和鼠尾草加入锅中。充分搅拌混合，然后盖盖。
烹饪米混合物 35 分钟，偶尔搅拌。
烹饪完成后，按 START/STOP 结束烹饪。移开锅盖，加入帕尔马干酪并搅拌混合。不盖盖静置 5 分钟。趁热食用。
''','若要做成素食，可省去培根，并在第 4 步用蔬菜高汤替代鸡高汤。')

recipe('coconut-chicken','Coconut Braised Chicken Thighs','椰奶焖鸡腿','主菜',10,16,'10 MINUTES','2 HOURS 15 MINUTES','4 SERVINGS','sear-saute|braise','''
8 块带骨带皮鸡腿肉（每块约 6 ounces）
Kosher salt（粗盐），按需
黑胡椒粉，按需
1 tablespoon 菜籽油
4 瓣大蒜，去皮、切末
1 tablespoon 姜，去皮、切末
1 个大白洋葱，切丁
2 罐椰奶（每罐 13 1/2 ounces）
2 cups 鸡高汤
2 个红薯，切成 1-inch 块
1 袋（6 ounces）嫩菠菜
煮好的米饭，按需
''','''
旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
预热时，用盐和胡椒给鸡肉两面调味。
预热完成后，将油倒入锅中。将鸡肉皮朝下放入锅中，烹饪 10 分钟。
10 分钟后，用夹子将鸡肉取出并放在一旁。
将大蒜、姜和洋葱加入锅中。烹饪 5 分钟，经常搅拌。
将椰奶、鸡高汤、土豆（原文 potatoes）、盐和胡椒加入锅中，搅拌混合。
将鸡肉皮朝上放回锅中，把鸡肉嵌入土豆和酱汁中，然后盖盖。
旋钮转至 BRAISE，时间设为 2 小时，按 START/STOP 继续烹饪。
烹饪完成后，移开锅盖，让鸡肉冷却 5 分钟再食用。
鸡肉趁热食用，可按需配米饭。
''','若要增加风味，可在第 7 步加入 1 tablespoon 咖喱粉和 1 tablespoon 辣椒膏。')

recipe('buffalo-mac','Buffalo Chicken Mac & Cheese Casserole','布法罗辣酱鸡肉芝士通心粉焗锅','主菜',10,17,'15 MINUTES','27 MINUTES','4 SERVINGS','bake','''
2 cups 水
1 盒（6 ounces）通心粉奶酪餐包，奶酪调料包另放一旁
8 ounces 熟鸡肉丝
4 tablespoons Buffalo 辣酱
2 tablespoons 无盐黄油
1/2 cup 全脂牛奶
1 cup 冷冻混合蔬菜
2/3 cup 面包屑
1/3 cup 蓝纹奶酪沙拉酱
1/4 cup 切达奶酪丝
''','''
将水和通心粉放入锅中（奶酪调料包另放一旁），搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 400°F，时间设为 17 分钟。按 START/STOP 开始烹饪。烹饪期间至少搅拌意面两次。
意面烹饪时，将传统烤箱设为 BROIL（上火炙烤）。
烹饪完成后，将预留的奶酪调料包、鸡肉、Buffalo 辣酱、黄油、牛奶和蔬菜加入锅中的意面。搅拌至黄油融化、食材均匀混合。
在中碗中加入面包屑、蓝纹奶酪沙拉酱和切达奶酪，混合后均匀铺在意面上。
将内锅直接放入预热好的烤箱，上火炙烤最多 10 分钟，或直到意面顶部呈金黄色。直接用内锅盛装，供大家分食。
''','若要做成更传统的奶酪通心粉，可省去第 4 步的鸡肉和 Buffalo 辣酱，以及第 5 步的蓝纹奶酪沙拉酱。')

recipe('pulled-pork','BBQ Pulled Pork Sandwiches','烧烤酱手撕猪肉三明治','主菜',11,18,'5 MINUTES','8 HOURS (DEPENDING ON SIZE OF PORK)','20 SERVINGS','slow-cook','''
8 pounds 去骨猪肩肉，切成 4-inch 块
2 瓶现成烧烤酱（每瓶 18 ounces）
1 cup 苹果醋，分次使用
2 袋现成卷心菜沙拉混合菜丝（每袋 16 ounces）
1 cup 蛋黄酱
1/4 cup 细砂糖
Kosher salt（粗盐），按需
黑胡椒粉，按需
20 个汉堡面包
配料（可选）：切片甜酸腌黄瓜（bread and butter pickles）
''','''
将猪肉、烧烤酱和 3/4 cup 苹果醋放入锅中。轻轻搅拌混合，然后盖盖。
旋钮转至 SLOW COOK，温度设为 HI，时间设为 8 小时。按 START/STOP 开始烹饪。为获得最佳效果，烹饪进行到一半时搅拌猪肉混合物。
猪肉烹饪时准备卷心菜沙拉。在中碗中加入现成沙拉菜丝、1/4 cup 苹果醋、蛋黄酱、糖、盐和胡椒，充分混合后放在一旁。
猪肉煮好时，应软嫩至可用叉子轻松分开。注意较大的猪肉块可能需要额外最多 1 小时烹饪。
烹饪完成后，将猪肉从烹饪液中取出，放入大碗。用硅胶头夹子将猪肉撕碎，再加入锅中约一半的烹饪液，混合至猪肉均匀裹上汁液、达到所需质地。
在面包下半部均匀放上猪肉、卷心菜沙拉及按需添加的腌黄瓜。盖上面包上半部，趁热食用。
''','手撕猪肉的烹饪时间完全取决于肉块大小和厚度。肉块越大、越厚，所需时间越长。切成较小、适合炖煮的肉块会缩短烹饪时间。')

recipe('short-ribs','Braised Beef Short Ribs','红酒焖牛小排','主菜',11,19,'15 MINUTES','4 HOURS 15 MINUTES','4 SERVINGS','sear-saute|braise','''
4 pounds 带骨牛小排（约 6 块）
Kosher salt（粗盐），按需
黑胡椒粉，按需
1/4 cup 中筋面粉
1 tablespoon 菜籽油
1 cup 红葡萄酒
2 tablespoons 浓缩番茄膏
3 cups 牛肉高汤
1 个白洋葱，去皮、切碎
5 根胡萝卜，去皮、切薄片
4 瓣大蒜，去皮、切末
1 包（10 ounces）褐蘑菇（cremini），去柄、切成四块
2 个 Idaho 土豆，切成 1-inch 块
2 枝迷迭香，去梗、叶子切末
''','''
用盐和胡椒给牛肉各面调味，再裹上面粉。
移开锅盖。旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
预热完成后，将菜籽油和调好味的牛肉加入锅中。不盖盖煎至牛肉各面上色，约 15 分钟。
15 分钟后，用夹子将牛小排取出并放在一旁。将红葡萄酒、浓缩番茄膏和高汤加入锅中，搅拌混合。
将洋葱、胡萝卜、大蒜、蘑菇、土豆和迷迭香加入锅中，搅拌混合。将牛肉放回锅中，每块嵌入蔬菜混合物内，然后盖盖。
旋钮转至 BRAISE，温度设为 HI，时间设为 4 小时，按 START/STOP 开始烹饪。
烹饪完成后，小心移开锅盖，让菜肴在台面上稍微冷却 5 分钟再食用。
''','可在第 5 步用任意根茎蔬菜，例如芜菁甘蓝或欧洲防风根，替换土豆。')

recipe('chicken-pot-pie','Chicken Pot Pie','鸡肉馅派','主菜',12,20,'10 MINUTES','1 HOUR 5 MINUTES','8 SERVINGS','sear-saute|bake','''
1 tablespoon 菜籽油
1 个大白洋葱，切碎
3 根芹菜茎，切碎
1 包（8 ounces）褐蘑菇（cremini），去柄、切片
1 只转叉烤鸡（3 pounds），取下鸡肉
1 1/2 cups 全脂牛奶
2 罐（10½ ounces）奶油鸡汤
1 袋（16 ounces）冷冻混合蔬菜
1 teaspoon 禽肉调味料
Kosher salt（粗盐），按需
黑胡椒粉，按需
1 盒（14 ounces）现成派皮
''','''
移开锅盖。旋钮转至 SEAR/SAUTÉ，温度设为 HI，按 START/STOP 开始预热。预热 5 分钟。
预热完成后，将油、洋葱、芹菜和蘑菇放入锅中，不盖盖烹饪 10 分钟，偶尔搅拌。
将除派皮之外的所有剩余食材放入锅中，搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 350°F，时间设为 15 分钟，按 START/STOP 继续烹饪。
馅料烹饪时，将传统烤箱预热至 375°F。
烹饪完成后，搅拌馅料，确保食材未粘在锅底，然后将内锅移离热源。
将派皮裁成锅的形状，保留多余边料。把派皮铺在鸡肉派馅料上，沿锅边捏紧派皮边缘。
按需用多余派皮修补空洞，再用刀在派皮顶部划出 4 道口子。
将整个内锅（不带锅盖）放入传统烤箱，烘烤 40 分钟，直到派皮完全烤熟。
烹饪完成后立即食用。
''','馅料稍微冷却几分钟后，最容易铺装派皮。')

recipe('spaghetti','Easy Spaghetti & Meatballs','简易肉丸意大利面','主菜',12,21,'5 MINUTES','45 MINUTES','12–15 SERVINGS','bake','''
6 cups 水
2 盒意大利细长面（每盒 16 ounces），折成两半
2 瓶红色意面酱（每瓶 24 ounces）
2 包冷冻肉丸（每包 24 ounces）
磨碎的帕尔马干酪，按需
''','''
将水倒入锅中，加入意面、酱汁和肉丸，搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 350°F，时间设为 45 分钟。按 START/STOP 开始烹饪。
烹饪时经常搅拌食材（至少三次），以免粘锅。
烹饪完成后立即食用，可按需撒上磨碎的帕尔马干酪。
''','''
若使用较稀的酱汁，将水减至 3¾ cups。若使用全谷物或较粗的意面，烹饪时间增加 2–5 分钟。
为确保意面正确煮熟并避免锅底烧焦，在第 3 步中至少搅拌食材 3 次。
''')

recipe('pot-roast','Sunday Pot Roast','周日慢炖牛肉','主菜',13,22,'10 MINUTES','5 HOURS 30 MINUTES','8 SERVINGS','slow-cook','''
2 块牛后腿眼肉（beef eye rounds，每块 2 1/2 pounds）
1/4 cup 中筋面粉
3 根大胡萝卜，去皮、切成 1-inch 块
4 根芹菜茎，修整、切成 1-inch 块
1 个白洋葱，去皮、切成 1-inch 块
3 cups 牛肉高汤
1/4 cup 酱油
1 cup 红葡萄酒
1 罐（14 1/2 ounces）火烤番茄丁
3 枝新鲜百里香
2 枝新鲜迷迭香
''','''
将牛肉放在盘子或砧板上，各面裹上面粉。将牛肉及全部剩余食材放入锅中，然后盖盖。
旋钮转至 SLOW COOK，温度设为 HI，时间设为 5 小时 30 分钟，按 START/STOP 开始烹饪。
烹饪完成后，让牛肉在锅内静置 15 分钟，使牛肉吸收部分烹饪液。
将牛肉从锅中取出、切片，与烹饪液和蔬菜一起食用。
''','若要增加风味，可在第 2 步之前用 SEAR/SAUTÉ 将牛肉各面煎至上色。')

recipe('berry-crisp','Summer Berry Crisp','夏日莓果酥','甜点',14,24,'10 MINUTES','1 HOUR','6–8 SERVINGS','bake','''
2 cups 新鲜覆盆子
3 cups 新鲜草莓，切半
2 cups 新鲜蓝莓
3 tablespoons 柠檬汁
3/4 cup 细砂糖
2 1/2 tablespoons 玉米淀粉
酥粒 CRUMBLE：1 cup 中筋面粉
酥粒：3/4 cup 燕麦片
酥粒：1 cup 深色红糖
酥粒：1/4 teaspoon Kosher salt（粗盐）
酥粒：1½ teaspoons 肉桂粉
酥粒：1 teaspoon 泡打粉
酥粒：1½ sticks（3/4 cup）无盐黄油，融化
酥粒：3/4 cup 切碎的碧根果
配料（可选）：香草冰淇淋
配料（可选）：打发奶油
''','''
将传统烤箱预热至 350°F。
将所有馅料食材放入锅中，搅拌混合，然后盖盖。
旋钮转至 BAKE，温度设为 300°F，时间设为 30 分钟。按 START/STOP 开始烹饪。烹饪期间至少搅拌锅内食材 3 次。15 分钟后移开锅盖。
馅料烹饪时，在大碗中将面粉、燕麦片、糖、盐、肉桂和泡打粉混合。加入融化的黄油和碧根果，混合至食材融合并呈碎粒状。
烹饪完成后，将酥粒均匀铺在莓果混合物上。
将整个内锅（不带锅盖）放入传统烤箱，烘烤 30 分钟，直到酥粒香脆、呈金黄色。
烹饪完成后，让莓果酥冷却 5 分钟。按需搭配冰淇淋和打发奶油食用。
''','若使用冷冻莓果，第 3 步烹饪时间增加 5 分钟。')

recipe('bread-pudding','Caramel Raisin Bread Pudding','焦糖葡萄干面包布丁','甜点',14,25,'15 MINUTES','1 HOUR 15 MINUTES','12 SERVINGS','bake','''
2 条（16 ounces）肉桂布里欧修面包，切成 1-inch 块；重量含义待核实
1 cup 深色或金色葡萄干
4 个大鸡蛋
1/2 cup 浅色红糖
1/4 cup 枫糖浆
1/4 cup 现成焦糖酱，另备一些作淋酱
1 1/2 sticks（3/4 cup）无盐黄油，融化
1 1/2 cups 全脂牛奶
1 1/2 cups 高脂奶油（heavy cream）
1 teaspoon 香草精
''','''
将面包放入锅中，把葡萄干撒在面包上。
在大碗中，将所有剩余食材充分搅打混合成蛋奶液。
将蛋奶液倒在面包上，用刮刀确保均匀分布。盖盖静置 10 分钟，直到面包吸收全部蛋奶液。
旋钮转至 BAKE，温度设为 350°F，时间设为 40 分钟，按 START/STOP 开始烹饪。
烹饪完成后，让面包布丁在锅中冷却 30 分钟。
按需另淋焦糖酱，即可食用。
''','用烤过或放陈的面包制作面包布丁效果最好。为获得最佳效果，在计划制作的前一天将布里欧修面包切块，不加覆盖地放在台面上，直到开始制作。')

# Place labels only describe the explicit action; preparation is not assigned a cooking function.
places = {
 'frittata': ['锅具','锅具','锅具','锅具','准备','锅具','锅具','盛出'],
 'oatmeal': ['锅具','锅具','锅具','锅具','锅具'],
 'focaccia': ['准备','锅具','锅具','传统烤箱','内锅操作','内锅操作','传统烤箱','出炉／食用'],
 'minestrone': ['锅具','锅具','锅具','锅具','锅具','食用'],
 'deviled-eggs': ['锅具','锅具','锅具','准备','冰浴','准备','准备','准备','准备','准备','食用'],
 'risotto': ['锅具']*6,
 'coconut-chicken': ['锅具','准备','锅具','锅具','锅具','锅具','锅具','锅具','锅具','食用'],
 'buffalo-mac': ['锅具','锅具','传统烤箱','锅具','准备／内锅操作','传统烤箱'],
 'pulled-pork': ['锅具','锅具','准备','锅具','准备','食用'],
 'short-ribs': ['准备','锅具','锅具','锅具','锅具','锅具','食用'],
 'chicken-pot-pie': ['锅具','锅具','锅具','锅具','传统烤箱','内锅操作','内锅操作','内锅操作','传统烤箱','食用'],
 'spaghetti': ['锅具','锅具','锅具','食用'],
 'pot-roast': ['准备／锅具','锅具','锅具','食用'],
 'berry-crisp': ['传统烤箱','锅具','锅具','准备','内锅操作','传统烤箱','食用'],
 'bread-pudding': ['锅具','准备','锅具','锅具','锅具','食用']
}
for r in recipes:
    assert len(places[r['id']]) == len(r['steps'])
    for step,place in zip(r['steps'],places[r['id']]): step['place']=place
    r['usesOven'] = any('传统烤箱' in s['place'] for s in r['steps'])
    r['optionalFunctions']=['sear-saute'] if r['id']=='pot-roast' else []
