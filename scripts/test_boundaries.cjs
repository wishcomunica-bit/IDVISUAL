const sharp = require('sharp');
const fs = require('fs');

async function testCrops() {
  const regalia = sharp('public/assets/brands/regalia_full.png');
  const leili = sharp('public/assets/brands/leili_bueno_full.png');

  // Let's check where the white begins after opening:
  // We can scan lines between 2200 and 2600
  // And where white ends after symbol: between 3600 and 4000
  // And where photo ends: between 6200 and 6600
  // And where logo variations end: between 6900 and 7300
  // And where mockups 1 end: between 9200 and 9600
  // And where mockups 2 end: between 11600 and 12000
  // And where symbols end: between 12600 and 13000
  
  // Let's write a pixel sampler
  const { data: regData, info } = await sharp('public/assets/brands/regalia_full.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width; // 5333
  const H = info.height; // 14102

  function getRowAverage(data, y) {
    let r = 0, g = 0, b = 0;
    for (let x = 0; x < W; x += 10) {
      const idx = (y * W + x) * 3;
      r += data[idx];
      g += data[idx+1];
      b += data[idx+2];
    }
    const count = Math.floor(W / 10);
    return [r / count, g / count, b / count];
  }

  // Find exact Y where opening turns pure white or near white:
  for (let y = 2300; y <= 2600; y += 5) {
    const [r, g, b] = getRowAverage(regData, y);
    if (r > 250 && g > 250 && b > 250) {
      console.log(`Regalia White starts around y = ${y} (${r}, ${g}, ${b})`);
      break;
    }
  }

  // Find where photos start (where white ends):
  for (let y = 3700; y <= 4000; y += 5) {
    const [r, g, b] = getRowAverage(regData, y);
    if (r < 240 || g < 240 || b < 240) {
      console.log(`Regalia Photos start around y = ${y} (${r}, ${g}, ${b})`);
      break;
    }
  }

  // Find where logos start (between 6300 and 6600)
  // Let's check row averages around 6300 - 6600
  for (let y = 6300; y <= 6600; y += 20) {
    const [r, g, b] = getRowAverage(regData, y);
    console.log(`y=${y}: ${r.toFixed(1)}, ${g.toFixed(1)}, ${b.toFixed(1)}`);
  }

  // Find where symbols start around 11700 - 12000
  for (let y = 11700; y <= 12000; y += 20) {
    const [r, g, b] = getRowAverage(regData, y);
    if (r > 250 && g > 250 && b > 250) {
      console.log(`Regalia Symbols strip (white) starts around y = ${y} (${r}, ${g}, ${b})`);
      break;
    }
  }

  // Find where symbols strip ends around 12600 - 13000
  for (let y = 12600; y <= 13000; y += 20) {
    const [r, g, b] = getRowAverage(regData, y);
    console.log(`y=${y}: ${r.toFixed(1)}, ${g.toFixed(1)}, ${b.toFixed(1)}`);
  }
}

testCrops();
