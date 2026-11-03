const C='pocito-v15';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png'])));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
self.addEventListener('push',e=>{let d={};try{d=e.data.json();}catch(_){d={title:'El Pocito',body:e.data?e.data.text():''};}
 e.waitUntil(self.registration.showNotification(d.title||'El Pocito',{body:d.body||'',tag:d.tag,icon:'icon-192.png',badge:'icon-192.png',data:{vista:d.vista||''},requireInteraction:!!d.urgente,vibrate:d.urgente?[300,100,300,100,300]:[120]}).then(()=>self.clients.matchAll({type:'window'}).then(cs=>cs.forEach(c=>c.postMessage({refrescar:true}))))); });
self.addEventListener('notificationclick',e=>{e.notification.close();const v=(e.notification.data||{}).vista||'';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c){c.postMessage({vista:v});return c.focus();}}return self.clients.openWindow('./index.html'+(v?'?vista='+v:''));}));});
