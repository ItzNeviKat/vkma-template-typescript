#!/usr/bin/env node

/*
 * Create VKMiniApp on Typescript
 * Nikita Koshelenko, 2020
 */

const { exec } = require('child_process');
const { resolve } = require('path');
const { readFileSync, writeFileSync } =  require('fs');

const miniAppDirectory = process.argv[2] ? process.argv[2] : 'mini-app';
const showHelp = ~process.argv.indexOf('--help');

const execute = (command) => new Promise((resolve, reject) => {
  exec(command, (err, response) => {
    if (err) return reject(err);
    resolve(response);
  });
});

if (showHelp) return console.error(`🖖 Usage:\n create-vkma-ts <app-directory-name>`);

console.log('🎬 Creating project...');

exec(`mkdir ${miniAppDirectory}`, async (makeDirErr) => {
  if (makeDirErr) return console.error(`😳 Make directory error:\n${makeDirErr}`);

  const isWin = process.platform === "win32";
  const isYarnInstalled = await getYarnInstallation();

  if (isWin) {
    await execute(`xcopy /E /I ${__dirname}\\..\\template ${process.cwd()}\\${miniAppDirectory}`).catch((err) => console.error(`😳 Copy files error:\n${err}`));
  } else {
    await execute(`rsync -a ${__dirname}/../template/* ${process.cwd()}/${miniAppDirectory}`).catch((err) => console.error(`😳 Copy files error:\n${err}`));
  }

  const packagePath = resolve(process.cwd(), miniAppDirectory, 'package.json');
  const package = require(packagePath);

  package.name = miniAppDirectory;

  writeFileSync(
    packagePath,
    JSON.stringify(package, null, 2),
    { encoding: 'utf-8' }
  );

  console.log(`💾 Successfully copied files to ${process.cwd()}/${miniAppDirectory}`);
  console.log(`📎 Installing dependencies... (it might take a few minutes)`);

  await execute(`cd ${process.cwd()}${isWin ? "\\" : "/"}${miniAppDirectory} && ${isYarnInstalled ? 'yarn' : 'npm i'}`).catch((err) => console.error(`😳 Installing dependencies error:\n${err}`));

  console.log(`📌 All done, happy coding!`);

  process.exit(0);
});

async function getYarnInstallation() {
  const response = await execute('yarn -v');

  return /^\d+\.\d+\.\d+\s*$/.test(response);
}
