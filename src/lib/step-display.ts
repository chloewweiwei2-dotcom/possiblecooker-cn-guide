import {type Recipe} from '../data/content';
import {reviewPolicy} from './review-policy';
export function currentWarnings(recipe:Recipe,index:number):string[]{
 const step=recipe.steps[index]; const ids=[...step.reviewIds];
 if(recipe.reviewIds.includes('SR-17')&&step.place.includes('传统烤箱'))ids.push('SR-17');
 // No spinach timing is invented: the missing timing stays a light recipe-wide notice.
 if(recipe.reviewIds.includes('SR-06'))ids.push('SR-06');
 return [...new Set(ids)].filter(id=>reviewPolicy[id]?.category==='USER_WARNING');
}
export function importantParts(text:string){
 // Highlight literal spans only; never infer new settings or actions.
 return text.split(/(\d+(?:[–—\-／/]\d+)?(?:\.\d+)?\s*(?:小时|分钟|秒|华氏度)|(?:慢炖|煎炒|焖炖|蒸|烘烤|发酵|低温慢煮|保温|开始／停止)（[^）]+）|高档|低档|预热|不带锅盖|不盖盖|不加盖|盖盖|移开锅盖|移除锅盖|移开盖子|传统烤箱)/g);
}
