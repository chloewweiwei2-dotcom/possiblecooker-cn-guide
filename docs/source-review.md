# 来源审核规则

仅使用两份指定 Ninja PDF。官方原文、中文整理和非官方解释分开保存，来源包含文档名、PDF 页序、书内页码、原始步骤编号。

所有矛盾、缺漏、疑似编辑错误及无法确定内容标记 SOURCE_REVIEW_REQUIRED。记录原文、位置、问题、相关内容和提示文字。不得猜测、修正、联网替换或用一般知识补全。

影响理解、安全或操作时，在相应内容附近显示短提示；步骤模式同样显示。安全冲突优先展示 Owner’s Guide 安全警告，同时明确官方资料不一致，不判定正确答案。人工同意按原文展示不等于原文问题已解决。

Ingredients、Directions、Prep、Cook、Makes、Proof 等保留原值，步骤不重排。时间筛选依据 Cook，不累计预热/静置等产生新官方时间。传统烤箱与 PossibleCooker 操作分开标识。不确定数字保留原文并待核实，不填确定值。

## 首次检查已发现、留待内容阶段定位的事项
- Sear/Sauté 盖盖要求与安全警告冲突；预热与 START/STOP 次序差异。
- 首次无食物运行未指定功能。
- Steam 的 END 与 KEEP WARM 说明。
- Owner’s Guide 安全条款残句及占位文字。
- 椰奶焖鸡腿菠菜未说明加入步骤。
- 魔鬼蛋 TIP 步骤引用与剩余食材描述。
- 燕麦粥切换 Slow Cook 后未明确再次 START/STOP。
- 面包布丁 2 loaves (16 ounces) 重量含义。
- Sous Vide Tenderloin 的 1–1/2 lbs 歧义。
- Sous Vide 牛胸肉 24–48 小时与单次计时上限 24 小时。
- 快速入门 START/START 与 Owner’s Guide START/STOP 差异。

第二阶段已补充逐项来源位置和对应页面提示，全部保留 SOURCE_REVIEW_REQUIRED。完整记录见 source-review-checklist.md；机器可读记录见 src/data/source-reviews.json。未经用户确认，不关闭审核状态。
