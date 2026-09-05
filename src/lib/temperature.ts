/** Derived display values only. Never persist these into official content. */
export function fahrenheitToCelsius(fahrenheit:number):number {
  return Math.round(((fahrenheit-32)*5/9)/5)*5;
}
export type TemperaturePart=string|{fahrenheit:number;original:string;celsius:number|null};
export function temperatureParts(text:string):TemperaturePart[]{
 const result:TemperaturePart[]=[];const pattern=/(?<![\d.])(-?\d+(?:\.\d+)?)\s*(?:°\s*F\b|F\b|华氏度)/g;
 let end=0;
 for(const match of text.matchAll(pattern)){
  result.push(text.slice(end,match.index));
  const f=Number(match[1]);
  // If a caller flags the value as uncertain, retain the source text without conversion.
  const uncertain=/(?:温度|华氏(?:度)?|原值).{0,8}(?:待核实|待确认|无法确认|无法辨认)/.test(text)||/(?:待核实|待确认).{0,8}(?:温度|华氏|原值)/.test(text);
  result.push({fahrenheit:f,original:match[0],celsius:uncertain?null:fahrenheitToCelsius(f)});end=match.index!+match[0].length;
 }
 result.push(text.slice(end));return result;
}
export const temperatureExplanation='摄氏温度由本指南根据官方华氏温度换算，并取整至最接近的 5°C，属于辅助换算值；括号中保留官方 °F 原值。';
