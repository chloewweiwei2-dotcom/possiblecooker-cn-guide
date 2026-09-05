type InstallPrompt=Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export type PwaState={offline:boolean;message:string;ready:boolean;controlled:boolean;update:boolean;installable:boolean;installed:boolean;error:string};
let registration:ServiceWorkerRegistration|undefined;let installPrompt:InstallPrompt|undefined;let refreshRequested=false;
let state:PwaState={offline:false,message:'安装与离线仅在本地正式构建或安全网站中启用。',ready:false,controlled:false,update:false,installable:false,installed:false,error:''};
const listeners=new Set<()=>void>();
export const getPwaState=()=>state;
export function subscribePwa(listener:()=>void){listeners.add(listener);return()=>{listeners.delete(listener);};}
function change(value:Partial<PwaState>){state={...state,...value};listeners.forEach(f=>f());}
export function initializePwa(production:boolean){
 change({offline:!navigator.onLine,installed:matchMedia('(display-mode: standalone)').matches});
 window.addEventListener('online',()=>change({offline:false}));window.addEventListener('offline',()=>change({offline:true}));
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e as InstallPrompt;change({installable:true});});
 window.addEventListener('appinstalled',()=>change({installed:true,installable:false}));
 if(!production)return;
 if(!('serviceWorker' in navigator)||!window.isSecureContext){change({message:'当前环境不支持安装或离线缓存，请使用安全网站或本机验收地址。'});return;}
 change({message:'正在准备离线内容，请暂时保持联网。'});
 navigator.serviceWorker.addEventListener('controllerchange',()=>{change({controlled:true});if(refreshRequested)location.reload();});
 navigator.serviceWorker.addEventListener('message',event=>{if(event.data?.type==='UPDATE_BLOCKED'){refreshRequested=false;change({error:'请先关闭本指南的其他标签页或窗口，再点击更新。'});}});
 navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`,{scope:import.meta.env.BASE_URL,updateViaCache:'none'}).then(r=>{
  registration=r;
  function report(){change({ready:!!r.active,controlled:!!navigator.serviceWorker.controller,update:!!r.waiting,message:r.active?'主要内容已缓存，可离线查阅。':'正在准备离线内容，请暂时保持联网。'});}
  report();r.addEventListener('updatefound',()=>{const worker=r.installing;worker?.addEventListener('statechange',()=>{report();if(worker.state==='redundant')change({error:'新内容未能完整缓存，当前版本继续可用。请联网后重试。'});});});navigator.serviceWorker.ready.then(report);
 }).catch(()=>change({error:'离线准备失败，请保持联网后重试。',message:'离线内容尚未准备完成。'}));
}
export async function installApp(){if(!installPrompt)return;try{await installPrompt.prompt();await installPrompt.userChoice;installPrompt=undefined;change({installable:false});}catch{change({error:'请通过浏览器菜单添加到主屏幕。'});}}
export async function checkUpdate(){try{await registration?.update();change({error:registration?'已检查更新。若有新版本，准备完成后会提示。':'请使用本地正式构建地址测试。'});}catch{change({error:'暂时无法检查更新，请联网后重试。'});}}
export function applyUpdate(){
 if(location.hash.startsWith('#/cook/')){change({error:'请先退出逐步做菜，再更新。'});return;}
 if(registration?.waiting){refreshRequested=true;registration.waiting.postMessage({type:'USER_APPROVED_UPDATE'});}
 else if(state.ready)location.reload();
}
