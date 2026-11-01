const sharp = require('sharp');
const fs = require('fs');

async function analyzeRows(imagePath) {
  // We can downsample to width 200, height 1410 (1/10th) raw pixels to analyze color variance row by row
  const { data, info } = await sharp(imagePath)
    .resize(200, 1410, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Analyzing ${imagePath}: ${info.width}x${info.height}, channels: ${info.channels}`);

  // Let's sample horizontal rows every 20 units (which is 200px in the original 14102px image)
  const rows = [];
  for (let y = 0; y < info.height; y += 10) {
    let rSum = 0, gSum = 0, bSum = 0;
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
    }
    const r = Math.round(rSum / info.width);
    const g = Math.round(gSum / info.width);
    const b = Math.round(bSum / info.width);
    rows.push({ y10: y, origY: Math.round(y * (14102 / 1410)), rgb: `rgb(${r},${g},${b})` });
  }
  return rows;
}

async function run() {
  const regaliaRows = await analyzeRows('public/assets/brands/regalia_full.png');
  fs.writeFileSync('scripts/regalia_rows.json', JSON.stringify(regaliaRows, null, 2));
  const leiliRows = await analyzeRows('public/assets/brands/leili_bueno_full.png');
  fs.writeFileSync('scripts/leili_rows.json', JSON.stringify(leiliRows, null, 2));
  console.log('Row analysis saved');
}

run();
