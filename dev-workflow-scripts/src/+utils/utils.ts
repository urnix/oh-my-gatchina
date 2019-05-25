import { exit } from 'process';
import * as childProcess from 'child_process';

const exec = childProcess.exec;

export const checkParam = (name: string, value: string) => {
  if (!value) {
    console.log(`Parameter ${name} is not specified`);
    exit(1);
  }
};

export const run = async (
  cmd,
  returnStdOut = false,
  mode: 'hide' | 'normal' | 'verbose' = 'normal',
): Promise<string | void> =>
  new Promise<string | void>((resolve, reject) => {
    let result = '';

    if (mode === 'hide') {
      console.log(`$ --- hidden command ---`);
    } else {
      console.log(`$ ${cmd}`);
    }
    const child = exec(cmd);

    child.stdout.on('data', chunk => {
      if (returnStdOut) {
        result += chunk;
      }
      if (mode === 'verbose') {
        console.log(chunk);
      }
    });
    child.stderr.on('data', chunk => {
      console.log(chunk);
    });
    child.on('close', code => {
      if (!code) {
        resolve(returnStdOut ? result : undefined);
      } else {
        reject('code: ' + code);
      }
    });
  });

export function getArgv() {
  return require('minimist')(process.argv.slice(2));
}

export function setProcessEnvFromFile(source) {
  if (!source) {
    return;
  }
  // TODO: check argv[0] and --source params
  const dotenv = require('dotenv');
  const result = dotenv.config({ path: source });
  if (result.error) {
    throw result.error;
  }
}
