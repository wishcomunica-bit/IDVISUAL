const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SECTIONS = [
  { name: '01_abertura', top: 0, height: 2380 },
  { name: '02_essencia', top: 2380, height: 940 },
  { name: '03_simbolo', top: 3320, height: 470 },
  { name: '04_fotos', top: 3790, height: 2635 },
  { name: '05_logos', top: 6425, height: 590 },
  { name: '06_mockups1', top: 7015, height: 2360 },
  { name: '07_mockups2', top: 9375, height: 2430 },
  { name: '08_simbolos', top: 11805, height: 900 },
  { name: '09_paleta', top: 12705, height: 1397 },
];

async function generateMasterSections(brandName, fullImagePath, outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Generating master sections for ${brandName}...`);

  const meta = await sharp(fullImagePath).metadata();
  const W = meta.width; // 5333

  for (const sec of SECTIONS) {
    const outPath = path.join(outputDir, `${sec.name}.webp`);
    await sharp(fullImagePath)
      .extract({ left: 0, top: sec.top, width: W, height: sec.height })
      .resize(2400) // 2400px wide for crystal-sharp retina displays
      .webp({ quality: 92 })
      .toFile(outPath);
    console.log(`Saved ${outPath}`);
  }
}

async function run() {
  await generateMasterSections('REGALIA', 'public/assets/brands/regalia_full.png', 'public/assets/sections/regalia');
  await generateMasterSections('LEILI BUENO', 'public/assets/brands/leili_bueno_full.png', 'public/assets/sections/leili');
  console.log('All master sections generated successfully!');
}

run();
