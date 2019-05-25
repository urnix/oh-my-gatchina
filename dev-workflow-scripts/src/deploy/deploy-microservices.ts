import { run } from '../+utils/utils';
import { exit } from 'process';
import { Env, EnvUpp } from '../apply-environment';

const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const env: Env = argv._[0] as Env;
const ENV_UPP = env.toUpperCase() as EnvUpp;
const INST = ENV_UPP === 'PROD' ? 'INST_PROD' : 'INST_QA';

async function main(): Promise<void> {
  const GAE_INSTANCE_NAME: string = process.env[`${INST}_GAE_INSTANCE_NAME`];
  if (!GAE_INSTANCE_NAME) {
    console.error(`ERROR: Provide Google App Engine Project Name, like this "--project=<YOUR_GAE_PROJECT_NAME>"`);
    exit(1);
  }
  try {
    if (fs.existsSync(`gaeAccountKey.json`)) {
      await run(`gcloud auth activate-service-account --key-file gaeAccountKey.json`);
    }
    await run(`yarn --cwd microservices/sql-mirror deploy --project=${GAE_INSTANCE_NAME}`);
  } catch (e) {
    console.log(e);
    exit(1);
  }
}

void main();
