import recipeData from './official/recipes.json';
import functionData from './manual/functions.json';
import articleData from './manual/articles.json';
import chartData from './official/charts.json';
import reviewData from './source-reviews.json';
import contextData from './chinese-context/context.json';

export type Source = { document: string; pdfPage: number; printedPage: string; section: string; type: string };
export type Entry = { number: number; text: string; place: string; reviewIds: string[]; originalText?: string; source?: Source };
export type BaseContent = { id: string; source: Source; reviewIds: string[]; reviewStatus: string; originalText: string; safetyWarnings: Entry[] };
export type Recipe = BaseContent & { title: string; titleZh: string; category: string; prep: string; cook: string; makes: string; proof: string | null; functions: string[]; optionalFunctions: string[]; ingredients: Entry[]; steps: Entry[]; tips: Entry[]; usesOven: boolean };
export type CookingFunction = BaseContent & { title: string; titleZh: string; description: string; steps: Entry[]; notes: Entry[] };
export type Article = BaseContent & { title: string; description: string; items: Entry[]; numbered: boolean };
export type Chart = BaseContent & { title: string; headers: string[]; notes: string[]; rows: { id: string; cells: string[]; reviewIds: string[]; source?: Source }[] };
export const recipes = recipeData as Recipe[];
export const cookingFunctions = functionData as CookingFunction[];
export const officialArticles = articleData as Article[];
export const charts = chartData as Chart[];
export const reviews = reviewData;
export const chineseContext = contextData;
export const hasBundledOfficialPdfs = import.meta.env.VITE_BUNDLED_PDFS !== 'false';
export function sourceUrl(source: Source) { return `${import.meta.env.BASE_URL}sources/${source.document}#page=${source.pdfPage}`; }
export function displayValue(value: string) {
  return value.replace(' (DEPENDING ON SIZE OF PORK)', '（取决于猪肉大小）').replace(/HOURS?/g, '小时').replace(/MINUTES?/g, '分钟').replace(/SERVINGS?/g, '份');
}
