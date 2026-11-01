const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target export width for ultra retina web displays (e.g. 2000px wide, original is 5333px)
const SCALE = 2000 / 5333;

async function sliceBrand(brandName, fullImagePath, outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Processing slices for ${brandName}...`);

  const img = sharp(fullImagePath);
  const meta = await img.metadata();
  const W = meta.width; // 5333
  const H = meta.height; // 14102

  // Key Y boundaries:
  const Y_OPENING_END = 2380;
  const Y_ESSENCE_END = 3320;
  const Y_SYMBOL_END = 3790;
  const Y_PHOTOS_END = 6425;
  const Y_LOGOS_END = 7015;
  const Y_MOCKUPS1_END = 9375;
  const Y_MOCKUPS2_END = 11805;
  const Y_SYMBOLS_END = 12705;
  const Y_PALETTE_END = 14102;

  // 1. ETAPA 01 — ABERTURA (Full width)
  await sharp(fullImagePath)
    .extract({ left: 0, top: 0, width: W, height: Y_OPENING_END })
    .resize(2000)
    .webp({ quality: 92 })
    .toFile(path.join(outputDir, '01_abertura.webp'));

  // 2. ETAPA 02 — ESSÊNCIA (Full width text block)
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_OPENING_END, width: W, height: Y_ESSENCE_END - Y_OPENING_END })
    .resize(2000)
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, '02_essencia.webp'));

  // 3. ETAPA 03 — CONSTRUÇÃO DO SÍMBOLO
  // Whole strip
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_ESSENCE_END, width: W, height: Y_SYMBOL_END - Y_ESSENCE_END })
    .resize(2000)
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, '03_construcao_full.webp'));

  // Also extract the 5 individual equation elements if possible, or we can inspect where *, +, L, =, Symbol are
  // Let's find horizontal X boundaries for the equation elements:
  // In W=5333: equation is centered. Let's inspect where ink is horizontally between Y_ESSENCE_END and Y_SYMBOL_END.

  // 4. ETAPA 04 — FOTOGRAFIAS DA MARCA (Mulher braços abertos & Retrato feminino joias)
  // Left photo (Mulher braços abertos)
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_SYMBOL_END, width: Math.floor(W / 2), height: Y_PHOTOS_END - Y_SYMBOL_END })
    .resize(1000)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, '04_foto_esquerda.webp'));

  // Right photo (Mulher joias & textos)
  await sharp(fullImagePath)
    .extract({ left: Math.floor(W / 2), top: Y_SYMBOL_END, width: W - Math.floor(W / 2), height: Y_PHOTOS_END - Y_SYMBOL_END })
    .resize(1000)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, '04_foto_direita.webp'));

  // Full photos combined for seamless reference
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_SYMBOL_END, width: W, height: Y_PHOTOS_END - Y_SYMBOL_END })
    .resize(2000)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, '04_fotos_full.webp'));

  // 5. ETAPA 05 — VARIAÇÕES DO LOGOTIPO (3 colunas)
  const colW = Math.floor(W / 3);
  const logosH = Y_LOGOS_END - Y_PHOTOS_END;

  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_PHOTOS_END, width: colW, height: logosH })
    .resize(700)
    .webp({ quality: 92 })
    .toFile(path.join(outputDir, '05_logo_var_1.webp'));

  await sharp(fullImagePath)
    .extract({ left: colW, top: Y_PHOTOS_END, width: colW, height: logosH })
    .resize(700)
    .webp({ quality: 92 })
    .toFile(path.join(outputDir, '05_logo_var_2.webp'));

  await sharp(fullImagePath)
    .extract({ left: colW * 2, top: Y_PHOTOS_END, width: W - colW * 2, height: logosH })
    .resize(700)
    .webp({ quality: 92 })
    .toFile(path.join(outputDir, '05_logo_var_3.webp'));

  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_PHOTOS_END, width: W, height: logosH })
    .resize(2000)
    .webp({ quality: 92 })
    .toFile(path.join(outputDir, '05_logos_full.webp'));

  // 6. ETAPA 06 — MOCKUPS 1 (Sacolas, Tags, Tecido)
  // Let's examine the horizontal divisions of Mockups 1:
  // In the image:
  // Sacolas is left (~38% of width or left third)
  // Tags is middle
  // Tecido is right
  // Let's also extract full Mockup 1 strip and individual quadrants!
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_LOGOS_END, width: W, height: Y_MOCKUPS1_END - Y_LOGOS_END })
    .resize(2000)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, '06_mockups1_full.webp'));

  // 7. ETAPA 07 — MOCKUPS 2 (Papelaria impressa e Celular com Feed)
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_MOCKUPS1_END, width: W, height: Y_MOCKUPS2_END - Y_MOCKUPS1_END })
    .resize(2000)
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, '07_mockups2_full.webp'));

  // 8. ETAPA 08 — SÍMBOLOS GRÁFICOS
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_MOCKUPS2_END, width: W, height: Y_SYMBOLS_END - Y_MOCKUPS2_END })
    .resize(2000)
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, '08_simbolos_full.webp'));

  // 9. ETAPA 09 — PALETA DE CORES
  await sharp(fullImagePath)
    .extract({ left: 0, top: Y_SYMBOLS_END, width: W, height: Y_PALETTE_END - Y_SYMBOLS_END })
    .resize(2000)
    .webp({ quality: 95 })
    .toFile(path.join(outputDir, '09_paleta_full.webp'));

  console.log(`Completed slices for ${brandName}`);
}

async function run() {
  await sliceBrand('REGALIA', 'public/assets/brands/regalia_full.png', 'public/assets/slices/regalia');
  await sliceBrand('LEILI BUENO', 'public/assets/brands/leili_bueno_full.png', 'public/assets/slices/leili');
}

run();
