const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cropDetailedElements(brandDir, prefix) {
  console.log(`Cropping detailed elements for ${prefix}...`);

  // 1. Symbol construction elements from 03_construcao_full.webp
  const symbolImg = sharp(path.join(brandDir, '03_construcao_full.webp'));
  const symbolMeta = await symbolImg.metadata();
  const sW = symbolMeta.width;
  const sH = symbolMeta.height;

  // The 5 symbol elements:
  const symbolBoxes = [
    { name: 'sym_1_sparkle', left: 740, width: 125 },
    { name: 'sym_2_plus', left: 885, width: 65 },
    { name: 'sym_3_letter', left: 960, width: 85 },
    { name: 'sym_4_equals', left: 1055, width: 70 },
    { name: 'sym_5_final', left: 1135, width: 135 }
  ];

  for (const box of symbolBoxes) {
    await sharp(path.join(brandDir, '03_construcao_full.webp'))
      .extract({ left: box.left, top: 0, width: box.width, height: sH })
      .webp({ quality: 95 })
      .toFile(path.join(brandDir, `${box.name}.webp`));
  }

  // 2. Mockups 1: Sacolas (0..666), Tags (666..1333), Tecido (1333..2000)
  const mockups1Img = sharp(path.join(brandDir, '06_mockups1_full.webp'));
  const m1Meta = await mockups1Img.metadata();
  const m1W = m1Meta.width;
  const m1H = m1Meta.height;
  const colW1 = Math.floor(m1W / 3);

  await sharp(path.join(brandDir, '06_mockups1_full.webp'))
    .extract({ left: 0, top: 0, width: colW1, height: m1H })
    .webp({ quality: 92 })
    .toFile(path.join(brandDir, '06_m1_sacolas.webp'));

  await sharp(path.join(brandDir, '06_mockups1_full.webp'))
    .extract({ left: colW1, top: 0, width: colW1, height: m1H })
    .webp({ quality: 92 })
    .toFile(path.join(brandDir, '06_m1_tags.webp'));

  await sharp(path.join(brandDir, '06_mockups1_full.webp'))
    .extract({ left: colW1 * 2, top: 0, width: m1W - colW1 * 2, height: m1H })
    .webp({ quality: 92 })
    .toFile(path.join(brandDir, '06_m1_tecido.webp'));

  // 3. Mockups 2: Impressa (0..1180) and Celular (1180..2000)
  const mockups2Img = sharp(path.join(brandDir, '07_mockups2_full.webp'));
  const m2Meta = await mockups2Img.metadata();
  const m2W = m2Meta.width;
  const m2H = m2Meta.height;
  const split2 = 1180;

  await sharp(path.join(brandDir, '07_mockups2_full.webp'))
    .extract({ left: 0, top: 0, width: split2, height: m2H })
    .webp({ quality: 92 })
    .toFile(path.join(brandDir, '07_m2_impressa.webp'));

  await sharp(path.join(brandDir, '07_mockups2_full.webp'))
    .extract({ left: split2, top: 0, width: m2W - split2, height: m2H })
    .webp({ quality: 92 })
    .toFile(path.join(brandDir, '07_m2_celular.webp'));

  // 4. Color Palette Blocks:
  const paletteBoxes = [
    { name: 'palette_1', left: 280, width: 310 },
    { name: 'palette_2', left: 660, width: 310 },
    { name: 'palette_3', left: 1040, width: 310 },
    { name: 'palette_4', left: 1420, width: 310 }
  ];

  const pImg = sharp(path.join(brandDir, '09_paleta_full.webp'));
  const pMeta = await pImg.metadata();

  for (const box of paletteBoxes) {
    await sharp(path.join(brandDir, '09_paleta_full.webp'))
      .extract({ left: box.left, top: 0, width: box.width, height: pMeta.height })
      .webp({ quality: 95 })
      .toFile(path.join(brandDir, `${box.name}.webp`));
  }

  // 5. Individual Symbols in the horizontal strip (5 main star symbol groups)
  const symStripBoxes = [
    { name: 'symbol_strip_1', left: 200, width: 230 },
    { name: 'symbol_strip_2', left: 540, width: 230 },
    { name: 'symbol_strip_3', left: 890, width: 230 },
    { name: 'symbol_strip_4', left: 1230, width: 230 },
    { name: 'symbol_strip_5', left: 1580, width: 230 }
  ];

  const symStripImg = sharp(path.join(brandDir, '08_simbolos_full.webp'));
  const sMeta = await symStripImg.metadata();

  for (const box of symStripBoxes) {
    await sharp(path.join(brandDir, '08_simbolos_full.webp'))
      .extract({ left: box.left, top: 0, width: box.width, height: sMeta.height })
      .webp({ quality: 95 })
      .toFile(path.join(brandDir, `${box.name}.webp`));
  }

  console.log(`Finished cropping detailed elements for ${prefix}`);
}

async function run() {
  await cropDetailedElements('public/assets/slices/regalia', 'REGALIA');
  await cropDetailedElements('public/assets/slices/leili', 'LEILI BUENO');
}

run();
