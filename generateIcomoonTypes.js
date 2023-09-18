const fs = require('fs');

const selection = JSON.parse(
  fs.readFileSync('./public/fonts/icomoon/selection.json', 'utf8'),
);
const iconNames = selection.icons.map(icon => icon.properties.name);

fs.writeFileSync(
  './src/components/base/icons/icomoon.ts',
  `export const iconNames = ${JSON.stringify(
    iconNames,
  )} as const \nexport type IconName = (typeof iconNames)[number]`,
);
