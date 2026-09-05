export type FontSize = 'standard' | 'large' | 'extra';
export function readSaved<T>(key:string, fallback:T):T {
  try { const value=localStorage.getItem(`possiblecooker.${key}`); return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}
export function saveValue(key:string, value:unknown):boolean {
  try {localStorage.setItem(`possiblecooker.${key}`,JSON.stringify(value));return true;} catch {return false;}
}
export function readFontSize(): FontSize {
  try {
    const value = localStorage.getItem('possiblecooker.fontSize');
    return value === 'standard' || value === 'extra' ? value : 'large';
  } catch { return 'large'; }
}
export function saveFontSize(value: FontSize): boolean {
  try { localStorage.setItem('possiblecooker.fontSize', value); return true; }
  catch { return false; }
}
