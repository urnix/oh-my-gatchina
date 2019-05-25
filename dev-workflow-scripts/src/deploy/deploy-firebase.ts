import { checkParam, getArgv, run, setProcessEnvFromFile } from '../+utils/utils';
import { exit } from 'process';
import { Env, EnvUpp } from '../apply-environment';

const argv = getArgv();
setProcessEnvFromFile(argv.source);

function getDeployOnlyString(eatery, clearing, website, firestore, storage, functions) {
  const deployOnly = [];
  if (eatery) {
    deployOnly.push('hosting:eatery');
  }
  if (clearing) {
    deployOnly.push('hosting:clearing');
  }
  if (website) {
    deployOnly.push('hosting:website');
  }
  if (firestore) {
    deployOnly.push('firestore');
  }
  if (storage) {
    deployOnly.push('storage');
  }
  if (functions) {
    deployOnly.push('functions');
  }
  return deployOnly.join();
}

export async function deployFirebase(
  env: Env,
  eatery,
  clearing,
  website,
  firestore,
  storage,
  functions,
): Promise<void> {
  try {
    checkParam('env', env);
    const ENV_UPP = env.toUpperCase() as EnvUpp;
    checkParam('eatery', eatery);
    checkParam('clearing', clearing);
    checkParam('website', website);
    checkParam('firestore', firestore);
    checkParam('storage', storage);
    checkParam('functions', functions);
    console.log(`ENV_UPP: ${ENV_UPP}`);
    // console.log(`process.env: ${JSON.stringify(process.env)}`);
    const firebaseToken = process.env[`${ENV_UPP}_FIREBASE_TOKEN`];
    const firebaseProject = process.env[`${ENV_UPP}_FIREBASE_PROJECT_NAME`];
    checkParam('firebaseToken', firebaseToken);
    checkParam('firebaseProject', firebaseProject);

    const deployOnly = getDeployOnlyString(eatery, clearing, website, firestore, storage, functions);
    await run(`firebase deploy -f --token ${firebaseToken} --project ${firebaseProject} --only ${deployOnly}`);
  } catch (e) {
    console.log(e);
    exit(1);
  }
}
