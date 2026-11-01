const sharp = require('sharp');
const fs = require('fs');

async function analyze() {
  const metaRegalia = await sharp('public/assets/brands/regalia_full.png').metadata();
  console.log('Regalia dimensions:', metaRegalia.width, metaRegalia.height);

  // Let's create a scaled down version for fast coordinate mapping and visual inspection
  await sharp('public/assets/brands/regalia_full.png')
    .resize(1000)
    .toFile('public/assets/brands/regalia_preview_1000.jpg');

  await sharp('public/assets/brands/leili_bueno_full.png')
    .resize(1000)
    .toFile('public/assets/brands/leili_preview_1000.jpg');

  console.log('Previews created');
}

analyze();
