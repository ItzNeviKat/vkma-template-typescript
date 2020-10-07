#!/usr/bin/env node

/*
 * Create VKMiniApp on Typescript
 * Nikita Koshelenko, 2020
 */

const { exec } = require('child_process');

const packageJson = require('../package.json');

const miniAppDirectory = process.argv[2] ? process.argv[2] : 'mini-app';
const showHelp = ~process.argv.indexOf('--help');

const execute = (command) => new Promise((resolve, reject) => {
  exec(command, (err) => {
    if (err) return reject(err);
    resolve();
  });
});

if (showHelp) return console.error(`🖖 Usage:\n create-vkma-ts <app-directory-name>`);

console.log('🎬 Creating project...');

exec(`mkdir ${miniAppDirectory}`, async (makeDirErr) => {
  if (makeDirErr) return console.error(`😳 Make directory error:\n${makeDirErr}`);

  const isWin = process.platform === "win32";

  if (isWin) {
    await execute(`xcopy /E /I ${__dirname}\\.. ${process.cwd()}\\${miniAppDirectory}`).catch((err) => console.error(`😳 Copy files error:\n${err}`));
    await execute(`rmdir /S ${process.cwd()}\\${miniAppDirectory}\\bin`).catch((err) => console.error(`😳 Delete bin folder error:\n${err}`));
  } else {
    await execute(`cp -R ${__dirname}/.. ${process.cwd()}/${miniAppDirectory}`).catch((err) => console.error(`😳 Copy files error:\n${err}`));
    await execute(`rm -rf ${process.cwd()}/${miniAppDirectory}/bin`).catch((err) => console.error(`😳 Delete bin folder error:\n${err}`));
  }

  console.log(`💾 Successfully copied files to ${process.cwd()}/${miniAppDirectory}`);
  console.log(`📎 Installing dependencies... (it might take a few minutes)`);

  await execute(`cd ${process.cwd()}${isWin ? "\\" : "/"}${miniAppDirectory} && npm install`).catch((err) => console.error(`😳 Installing dependencies error:\n${err}`));

  console.log(`📌 All done, happy coding!`);

  process.exit(0);
});