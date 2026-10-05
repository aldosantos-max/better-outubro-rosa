// Rosa em Dia: funciona offline depois da 1ª visita
const V = 'rosa-v1';
const CORE = ['/', 'index.html', 'ali-voz.js', 'manifest.webmanifest', "img/alia/abre-boca.webp","img/alia/abre-fechada.webp","img/alia/abre.webp","img/alia/aceno-boca.webp","img/alia/aceno-fechada.webp","img/alia/aceno.webp","img/alia/anda-boca.webp","img/alia/anda-fechada.webp","img/alia/anda.webp","img/alia/aponta-boca.webp","img/alia/aponta-fechada.webp","img/alia/aponta.webp","img/alia/chama-boca.webp","img/alia/chama-fechada.webp","img/alia/chama.webp","img/alia/corre-boca.webp","img/alia/corre-fechada.webp","img/alia/corre.webp","img/alia/deitada-boca.webp","img/alia/deitada-fechada.webp","img/alia/deitada.webp","img/alia/ideia-boca.webp","img/alia/ideia-fechada.webp","img/alia/ideia.webp","img/alia/poses.json","img/alia/vibra-boca.webp","img/alia/vibra-fechada.webp","img/alia/vibra.webp","img/alumni.svg","img/app/apple-touch-icon.png","img/app/favicon-64.png","img/app/icon-192.png","img/app/icon-512.png","img/app/maskable-512.png","som/acertou.mp3","som/aindaNao.mp3","som/autoexame.mp3","som/combinado.mp3","som/comoFaz.mp3","som/cronometro.mp3","som/cutuca1.mp3","som/cutuca2.mp3","som/cutuca3.mp3","som/enviou.mp3","som/errou.mp3","som/fimQuiz.mp3","som/jaFiz.mp3","som/lembrar.mp3","som/lembrete.mp3","som/mito.mp3","som/oi.mp3","som/pergunta.mp3","som/terminou.mp3"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  // página: rede primeiro (pega a versão nova), cache se estiver sem internet
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { caches.open(V).then(c => c.put('/', res.clone())); return res; }).catch(() => caches.match('/')));
    return;
  }
  // resto (imagens, voz, fontes): cache primeiro
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => {
    if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); }
    return res;
  })));
});
