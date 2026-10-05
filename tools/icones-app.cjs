// Ícones do app (PWA): Alia do peito pra cima sobre degradê rosa
const sharp = require('sharp');
const path = require('path');
const src = path.join(__dirname, '..', 'img', 'alia', 'chama.webp');
const out = n => path.join(__dirname, '..', 'img', 'app', n);
async function busto() {
  const t = await sharp(src).trim().toBuffer();
  const m = await sharp(t).metadata();
  const h = Math.round(m.height * 0.6);
  return sharp(t).extract({ left: 0, top: 0, width: m.width, height: h }).toBuffer();
}
async function icone(b, size, nome, escala) {
  const alia = await sharp(b).resize({ width: Math.round(size * escala), height: Math.round(size * escala), fit: 'inside' }).toBuffer();
  const m = await sharp(alia).metadata();
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><radialGradient id="g" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="#FFE3EF"/><stop offset="1" stop-color="#F062A0"/></radialGradient></defs><rect width="${size}" height="${size}" fill="url(#g)"/></svg>`);
  // colado na base, como um retrato
  await sharp(bg).composite([{ input: alia, left: Math.round((size - m.width) / 2), top: size - m.height }]).png().toFile(out(nome));
}
(async () => {
  const b = await busto();
  await icone(b, 512, 'icon-512.png', 0.92);
  await icone(b, 192, 'icon-192.png', 0.92);
  await icone(b, 512, 'maskable-512.png', 0.8);
  await icone(b, 180, 'apple-touch-icon.png', 0.92);
  await icone(b, 64, 'favicon-64.png', 0.96);
})();
