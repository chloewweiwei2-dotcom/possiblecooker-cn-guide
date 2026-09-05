export type ReviewPolicy = { category: 'USER_WARNING' | 'SOURCE_NOTE' | 'EDITORIAL_FIX'; emphasis: 'strong' | 'gentle' | 'plain' | 'hidden' };
const notes = [2,5,9,10,13,18,20,21,22];
const gentle = [6,7,14];
export const reviewPolicy: Record<string, ReviewPolicy> = Object.fromEntries(Array.from({length:22},(_,i)=>{
  const n=i+1;
  return [`SR-${String(n).padStart(2,'0')}`, {category:n===12?'EDITORIAL_FIX':notes.includes(n)?'SOURCE_NOTE':'USER_WARNING', emphasis:n===12||n===21?'hidden':notes.includes(n)?'plain':gentle.includes(n)?'gentle':'strong'}];
}));
export const editorialChanges:Record<string,string>={
 'SR-12':'中文展示改为开始／停止（START/STOP），依据官方说明书按钮名称；原始 START/START 留档。',
 'SR-21':'中文展示删除孤立的多余词及编辑错误旁注；不补写残句中的未知内容。',
 'SR-22':'prok 拼写子项按猪肉正常译写；parsley dill 的连接关系仍不推断。',
};
