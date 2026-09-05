/** Presentation only. Never rewrite the official JSON, original text, quantities or review records. */
export const functionLabels: Record<string, string> = {
  'slow-cook': '慢炖（SLOW COOK）', 'sear-saute': '煎炒（SEAR / SAUTÉ）',
  braise: '焖炖（BRAISE）', steam: '蒸（STEAM）', bake: '烘烤（BAKE）',
  proof: '发酵（PROOF）', 'sous-vide': '低温慢煮（SOUS VIDE）', 'keep-warm': '保温（KEEP WARM）',
};
const panel: Record<string, string> = {
  'slow cook':'慢炖（SLOW COOK）', 'sear/saute':'煎炒（SEAR / SAUTÉ）', 'sear/sauté':'煎炒（SEAR / SAUTÉ）', 'sear / sauté':'煎炒（SEAR / SAUTÉ）',
  braise:'焖炖（BRAISE）', steam:'蒸（STEAM）', bake:'烘烤（BAKE）', proof:'发酵（PROOF）', 'sous vide':'低温慢煮（SOUS VIDE）', 'keep warm':'保温（KEEP WARM）',
  'start/stop':'开始／停止（START/STOP）', start:'开始（START）', power:'电源（POWER）',
  'temperature arrows':'温度箭头（TEMP）', 'time arrows':'时间箭头（TIME）', temp:'温度（TEMP）', time:'时间（TIME）',
  'function dial':'功能旋钮',
};
const terms: Record<string, string> = {
  ...panel,
  "owner's guide":'官方说明书','owner’s guide':'官方说明书','recipe guide':'官方菜谱指南', 'quick start guide':'快速入门指南',
  'steam & roasting rack':'蒸／烤架', 'slow cook chart':'慢炖参考表', 'sous vide chart':'低温慢煮参考表', 'steam chart':'蒸食参考表',
  'possiblecooker pro':'本机','possiblecooker':'本机', 'sharkninja':'制造商', ninja:'品牌方',
  'medium rare':'偏生的中等熟度','medium well':'接近全熟','well done':'全熟',medium:'中等熟度',rare:'偏生',
  high:'高档',hi:'高档',low:'低档',lo:'低档',
  'add food':'请加入食物','add pot':'未放入内锅','add water':'请加水',pre:'预热',end:'结束',
  'hh:mm':'小时：分钟', e1:'第一种故障代码',e2:'第二种故障代码',
  cups:'美制杯',cup:'美制杯',tablespoons:'汤匙',tablespoon:'汤匙',teaspoons:'茶匙',teaspoon:'茶匙',
  ounces:'盎司',oz:'盎司',pounds:'磅',lbs:'磅',inches:'英寸',inch:'英寸',quart:'夸脱',sticks:'条',dashes:'点',
  minutes:'分钟',minute:'分钟',mins:'分钟',hours:'小时',hour:'小时',hrs:'小时',hr:'小时',
  watts:'瓦',hz:'赫兹',cm:'厘米', 'v~':'伏（交流电）',
  note:'注意事项',tip:'技巧',tips:'技巧',ingredients:'食材',directions:'做法',cook:'烹饪时间',prep:'准备时间',makes:'份量',
  'n/a':'未提供',water:'加水量',broil:'上火炙烤',roast:'烤制',crumble:'酥粒',
  'kosher salt':'粗盐',arborio:'阿尔博里奥',buffalo:'布法罗',idaho:'爱达荷',tamales:'玉米粽',
  'deglaze':'化开锅底焦香物','instant rice':'速食米饭','scouring pads':'百洁擦垫','appliance garage':'电器收纳柜',
};
// These English aliases already have a Chinese translation immediately alongside them in the source data.
const aliases = [
  'Artichokes','Asparagus','Beans, green','Beans, wax','Beets','Beet greens','Broccoli','Brussels sprouts','Cabbage','Carrots, baby','Carrots','Cauliflower','Corn on the cob','Kale','Okra','Onions, pearl','Parsnips','Peas, green','Peas, sugar snap','Potatoes, all','Potatoes, new','Potatoes, sweet','Spinach','Squash, butternut','Turnips','Turnip greens','Swiss Chard','Zucchini',
  'Top or bottom round','Eye of the round','Chuck','Pot roast or brisket','Short ribs','Frozen meatballs (precooked)','Baby back or country ribs','Pork tenderloin','Pork loin or rib roast','Pork butt or shoulder','Ham, bone in (uncooked)','Ham (fully cooked)','Boneless, skinless breast','Boneless, skinless thighs','Bone-in breast','Bone-in thighs','Whole chicken','Chicken wings','Turkey breast or thighs','Stew meat',
  'Boneless ribeye','Porterhouse','Filet mignon','Flank','Flat iron','Beef brisket','Boneless prok chops','Bone-In pork chops','Tenderloin','Sausages','Boneless pork shoulder','Chicken Breast','Boneless Chicken Thighs','Bone-In Chicken Thighs','Chicken Leg Quarters','Chicken Wings & Drummettes','Half Chicken','Whitefish','Cod','Haddock','Whiting','Pollock','Salmon','Shrimp','Green Beans','Squash','Sweet Potatoes','Potatoes',
];
const esc=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const aliasPattern=new RegExp(`\\b(?:${aliases.sort((a,b)=>b.length-a.length).map(esc).join('|')})(?=$|[^A-Za-z])`,'gi');
const termPattern=new RegExp(`(?<![A-Za-z])(?:${Object.keys(terms).sort((a,b)=>b.length-a.length).map(esc).join('|')})(?![A-Za-z])`,'gi');

export function chineseText(input:string):string {
  let text=input.replace(/以 5 度为增量/g,'以官方华氏温标的 5 度为增量（调整幅度，不是目标温度）')
    .replace(/^[A-H]：/,'')
    .replace(/（(?:hash brown potatoes|cremini|heavy cream|bread and butter pickles|scouring pads|appliance garage|deglaze|instant rice)）/gi,'')
    .replace(/beef eye rounds，/gi,'')
    .replace(/Kosher salt（粗盐）/g,'粗盐')
    .replace(/tamales（玉米粽）/gi,'玉米粽')
    .replace(/（Spoon-Ladle）|（Top Pot Handle\/Spoon-Ladle Rest）|（Cooking Lid）|（Side Pot Handles）|（Main Unit）|（Control Panel）/g,'')
    .replace(/（原文 potatoes）/g,'（原文此处写作土豆）')
    .replace(/（保留原文 prok）/g,'')
    .replace(/（原文 parsley dill）/g,'（原文未写明两者连接关系）')
    .replace(/（保留原文 F 写法）/g,'')
    .replace(/（原文拼作“Pess”）/g,'')
    .replace(/原文句末另有“Steam”。/g,'')
    .replace(/（原文止于“stop current\.”）/g,'')
    .replace(/后半句原文为“DO NOT attempt to modify the Add to warning section\.”，含义不完整，未自行补全。/g,'后半句原文含义不完整，未自行补全；可展开英文原文核对。')
    .replace(/原文“are clean and by wiping with a soft cloth”缺词，未补充条件。/g,'原文此处缺词，未补充条件；可展开英文原文核对。')
    .replace(/（原文末词截断为 applianc）/g,'（原文最后一个词被截断）')
    .replace(/START\/START/g,'START/STOP')
    .replace(/（保留此处原文按钮写法）/g,'')
    .replace(/原文 F 写法/g,'原文华氏温度写法');
  // Translate unit names only: no arithmetic, rounding, quantity or range conversion.
  text=text.replace(/°F|(?<=\d)F\b/g,' 华氏度');
  return text.replace(termPattern,token=>terms[token.toLowerCase()])
    .replace(/美制杯\s+/g,'美制杯 ').replace(/(?<=\d)-(?=英寸)/g,' ').replace(/英寸-/g,'英寸 ')
    .replace(/酥粒 酥粒/g,'酥粒').replace(/电源（POWER）（电源）/g,'电源（POWER）')
    .replace(/蒸／烤架（蒸／烤架）/g,'蒸／烤架')
    .replace(/\s+([，。；：）])/g,'$1').replace(/([\u3400-\u9fff]) +(?=[\u3400-\u9fff])/g,'$1').replace(/加水量加水量/g,'加水量');
}
export function chartText(text:string):string {
  return chineseText(text.replace(aliasPattern,'')).replace(/未提供（原文未提供）/g,'未提供').replace(/\s+$/g,'');
}
export const chartTitles:Record<string,string>={ 'steam-chart':'蒸食参考表','slow-cook-chart':'慢炖参考表','sous-vide-chart':'低温慢煮参考表' };

/** Reader messages are deliberately separate from the unchanged technical source-review records. */
export const readerReviews:Record<string,string>={
  'SR-01':'使用煎炒功能时，官方说明书的安全警告要求不要盖盖，但功能说明和部分菜谱又写可以或需要盖盖。两处要求不一致，本指南不自行判断，请对照原始说明书。',
  'SR-02':'煎炒的操作说明先写预热 5 分钟，后写按开始按钮；菜谱则先按开始按钮再预热。本页保留各自原序，不自行调换。',
  'SR-03':'首次使用说明建议不放食物运行 10 分钟，但没有指定功能。安全警告又规定：无食物和液体时不能使用慢炖，空锅加热不能超过 10 分钟。本指南不自行指定首次运行模式。',
  'SR-04':'蒸制步骤写结束后显示“结束”，旁边注意事项又写会自动进入保温；同一段还提到设定温度，但没有列出设温步骤。本指南不推断机器的实际行为。',
  'SR-05':'部分安全条款存在缺词、未填写的内容或截断文字。本页保留可辨认的意思，不补写缺失要求；完整原文可折叠展开核对。',
  'SR-06':'官方食材表包含 1 袋（6 盎司）嫩菠菜，但做法没有明确说明在哪一步加入。本指南不补写加入时机。',
  'SR-07':'官方技巧提到在第 5 步替换腌汁，但第 5 步实际是冰浴；第 6、8 步又重复提到剩余食材，并使用不同的碗。本指南不合并步骤或改动编号。',
  'SR-08':'第 4 步设好慢炖、高档和 3 小时后，官方原文没有明确写是否再次按开始按钮，本指南不补写。',
  'SR-09':'面包写为“2 条（16 盎司）”，原文没有明确括号重量是每条还是两条合计。本指南不推断。',
  'SR-10':'这条里脊的重量原文写作“1–1/2 磅”，连字符与分数的含义不能确定。本页保留这一写法，不改成另一个数值。',
  'SR-11':'牛胸肉参考时间为 24–48 小时，官方说明书描述的单次计时上限却是 24 小时。本指南保留两者，不添加续时操作。',
  'SR-12':'快速入门图中的开始按钮名称存在重复拼写，与官方说明书上的名称不一致。实际按钮的对应名称请查看按钮说明。',
  'SR-13':'菜谱标题的烹饪时间为 1 小时 15 分钟；步骤又分别写浸泡 10 分钟、烘烤 40 分钟、冷却 30 分钟。本页分别保留，不相加产生新的总时间。',
  'SR-14':'食材表写“红薯”，第 6、7 步却写“土豆”。本页保留这处差异，不自行统一。',
  'SR-15':'官方安全警告要求慢炖时始终闭盖，但这道手撕猪肉又要求中途搅拌。本指南保留不一致，不新增揭盖操作。',
  'SR-16':'参考表有高档鱼片 30–45 分钟、低档熟火腿 5–7 小时等时间；说明书却写高档最低可设 3 小时、低档最低 6 小时。本指南不发明设置方法。',
  'SR-17':'安全警告写不要将配件放进烤箱；产品提示又写内锅与玻璃盖最高可承受 500 华氏度。适用范围不一致，本指南不自行扩大配件用途。',
  'SR-18':'官方技巧提到“烤制”，但这不是面板上的独立功能。本指南保留原句，不新增设备功能。',
  'SR-19':'说明书的焖炖操作只写显示默认温度，没有列调整温度的步骤；牛小排菜谱却要求高档。本指南不补写按钮操作。',
  'SR-22':'原文未明确欧芹与莳萝的连接关系，本指南不推断为任选或同时使用。',
  'SR-20':'保温说明写机器开始正向计时，但旁边注意事项又写可调整烹饪时间，没有解释两者关系。本指南不推断。',
};
