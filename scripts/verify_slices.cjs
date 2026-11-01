const sharp = require('sharp');
const fs = require('fs');

async function checkExactSections() {
  // Let's create an output dir for slices
  fs.mkdirSync('public/assets/slices/regalia', { recursive: true });
  fs.mkdirSync('public/assets/slices/leili', { recursive: true });

  // Let's inspect the exact Y coordinates by finding the pixel lines where white begins or transitions happen
  // We can write a script to find the exact transitions
  const imgRegalia = sharp('public/assets/brands/regalia_full.png');
  const meta = await imgRegalia.metadata();
  console.log('Regalia width:', meta.width, 'height:', meta.height);

  // Let's do a scan for white transitions in Regalia
  // In full image:
  // 1. Opening: y=0 to y_essencia
  // 2. Essência: y_essencia to y_construcao
  // 3. Construcao: y_construcao to y_photos
  // 4. Photos: y_photos to y_logos
  // 5. Logo variations: y_logos to y_mockups1
  // 6. Mockups 1: y_mockups1 to y_mockups2
  // 7. Mockups 2: y_mockups2 to y_symbols
  // 8. Symbols: y_symbols to y_palette
  // 9. Palette: y_palette to 14102
}

checkExactSections();
