#!/usr/bin/env node
const fs = require('fs');

const args = process.argv.slice(2);

const inputFlag = args.indexOf('-i');
const inputFileArg = args[inputFlag + 1];

const selection = JSON.parse(
  fs.readFileSync(
    inputFileArg || './public/fonts/icomoon/selection.json',
    'utf8',
  ),
);
const iconNames = selection.icons.map(icon => icon.properties.name);

fs.writeFileSync(
  './src/components/base/icons/icomoon.ts',
  `export const iconNames = ${JSON.stringify(
    iconNames,
  )} as const \nexport type IconName = (typeof iconNames)[number]`,
);
