import {temperatureParts} from '../lib/temperature';
import {importantParts} from '../lib/step-display';
export default function TemperatureText({text,emphasize=false}:{text:string;emphasize?:boolean}){
 return <>{temperatureParts(text).map((part,i)=>typeof part==='string'
  ? <span key={i}>{emphasize?importantParts(part).map((s,n)=>n%2?<strong className="step-key" key={n}>{s}</strong>:s):part}</span>
  : part.celsius===null?<span key={i} className="temperature-unconfirmed">{part.original}（温度待核实，未换算）</span>
  : <span className="temperature-pair" key={i} data-fahrenheit={part.fahrenheit} data-derived-celsius={part.celsius}><strong className="temperature-celsius">约 {part.celsius}°C</strong><span className="temperature-original">（{part.fahrenheit}°F）</span><span className="temperature-derived">换算</span></span>)}</>;
}
