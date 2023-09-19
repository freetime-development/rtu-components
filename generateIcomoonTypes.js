#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const inputFlag = args.indexOf('-i');
const inputFileArg = args[inputFlag + 1];
const inputFilePath = path.resolve(inputFileArg);

const outputFilePath = path.resolve(
  './src/components/base/icons/icomoon/icomoon.ts',
);

const selection = JSON.parse(
  fs.readFileSync(
    inputFilePath || './public/fonts/icomoon/selection.json',
    'utf8',
  ),
);
const iconNames = selection.icons.map(icon => icon.properties.name);

fs.writeFileSync(
  outputFilePath,
  `export const iconNames = ${JSON.stringify(
    iconNames,
  )} as const \nexport type IconName = (typeof iconNames)[number]`,
);
