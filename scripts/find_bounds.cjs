const sharp = require('sharp');
const fs = require('fs');

async function inspectLayout(imagePath, prefix) {
  const meta = await sharp(imagePath).metadata();
  console.log(`=== ${prefix} === Width: ${meta.width}, Height: ${meta.height}`);

  // Let's sample horizontal slices to check Y positions:
  // In the 14102 total height, let's find the approximate sections by generating 10 vertical strips
  // Or let's test specific slice heights.
  // 1. Abertura: ~0 to 2400?
  // 2. Essência: ~2400 to 3400?
  // 3. Construção do símbolo: ~3400 to 4100?
  // 4. Fotos lado a lado: ~4100 to 6500?
  // 5. Variações do logotipo (3 colunas): ~6500 to 7400?
  // 6. Mockups sacola / tags / tecido: ~7400 to 9500?
  // 7. Celular e papelaria: ~9500 to 12000?
  // 8. Símbolos gráficos: ~12000 to 12900?
  // 9. Paleta de cores: ~12900 to 14102?
}

inspectLayout('public/assets/brands/regalia_full.png', 'REGALIA');
inspectLayout('public/assets/brands/leili_bueno_full.png', 'LEILI BUENO');
