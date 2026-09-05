const CACHE=__CACHE__;
const ASSETS=__ASSETS__;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).catch(async error=>{await caches.delete(CACHE);throw error;})));
// No automatic skipWaiting, claim or reload. Existing tabs keep their active version.
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('possiblecooker-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('message',event=>{
 if(event.data?.type!=='USER_APPROVED_UPDATE')return;
 event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
  if(clients.length>1||clients.some(c=>c.url.includes('#/cook/'))){event.source?.postMessage({type:'UPDATE_BLOCKED'});return;}
  return self.skipWaiting();
 }));
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  if(event.request.mode==='navigate'&&!url.pathname.endsWith('.pdf'))return (await cache.match(__INDEX__))||fetch(event.request);
  return (await cache.match(url.pathname))||fetch(event.request);
 }));
});
