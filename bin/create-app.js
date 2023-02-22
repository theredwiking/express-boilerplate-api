#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx create-my-boilerplate my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/theredwiking/express-boilerplate-api';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EXIST') {
    console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function main() {
    try {
      console.log('Downloading files...');
      execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

      process.chdir(projectPath);

      fs.readFile('./package.json', 'utf8', (err, data) => {
          if (err) {
              return console.log(err);
          }
          let firstChange = data.replace(/"name": "express-boilerplate-api"/g, `"name": "${projectName}"`);
          let result = firstChange.replace(/"version": "0.0.6"/g, `"version": "0.0.1"`);

          fs.writeFile('./package.json', result, 'utf8', (err) => {
              if (err) return console.log(err);
          })
      })

      console.log('Installing dependencies...');
      execSync('npm install');
      execSync('npm install --save-dev');

      console.log('Removing useless files');
      execSync('npx rimraf ./.git');
      fs.unlinkSync('./controllers/.gitkeep');
      fs.unlinkSync('./routes/.gitkeep');
      fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true});

      console.log('The installation is done, this is ready to use !');

    } catch (error) {
      console.log(error);
    }
}
main();
