import { App, Env } from '../apply-environment';
import { exit } from 'process';

export const generateAngularConfiguration = (appPar?: App, envPar?: Env) => {
  try {
    let app, env;
    if (appPar && envPar) {
      app = appPar;
      env = envPar;
    } else if (process.argv[2] && process.argv[3]) {
      app = process.argv[2];
      env = process.argv[3];
    } else {
      // TODO: temp
      return;
    }

    const fs = require('fs');

    const availableApps = ['eatery', 'clearing'];
    if (!availableApps.includes(app)) {
      console.error(
        'Please provide one of apps - "eatery" or "clearing".\nExample: "$ node generate-angular-configs-runner.ts eatery prod"\n',
      );
      exit(1);
    }
    const APP = app;
    // console.log('\nApp:', APP);

    const availableEnvironments = ['dev', 'prod', 'qa', 'e2e'];
    if (!availableEnvironments.includes(env)) {
      console.error(
        'Please provide one of environments - "dev", "prod", "qa" or "e2e".\nExample: "$ node generate-angular-configs-runner.ts eatery prod"\n',
      );
      exit(1);
    }
    const ENVTYPE = env.toUpperCase();
    // console.log('\nEnvironment:', ENVTYPE);

    const BASEURL = process.env[`${ENVTYPE}_${APP.toUpperCase()}_BASEURL`];
    const FIREBASE_API_KEY = process.env[`${ENVTYPE}_FIREBASE_API_KEY`];
    const FIREBASE_AUTH_DOMAIN = process.env[`${ENVTYPE}_FIREBASE_AUTH_DOMAIN`];
    const FIREBASE_DATABASE_URL = process.env[`${ENVTYPE}_FIREBASE_DATABASE_URL`];
    const FIREBASE_PROJECT_ID = process.env[`${ENVTYPE}_FIREBASE_PROJECT_ID`];
    const FIREBASE_STORAGE_BUCKET = process.env[`${ENVTYPE}_FIREBASE_STORAGE_BUCKET`];
    const FIREBASE_MESSAGING_SENDER_ID = process.env[`${ENVTYPE}_FIREBASE_MESSAGING_SENDER_ID`];
    const SENTRY_DSN = process.env[`${ENVTYPE}_SENTRY_DSN`];
    const LOGROCKET_KEY = process.env[`${ENVTYPE}_LOGROCKET_KEY`];
    // console.log(`process.env1: ${JSON.stringify(process.env)}`);
    const RELEASE = `${process.env.CI_BUILD_NUMBER}_${process.env.CI_COMMIT_ID.substring(0, 6)}`;

    const filePath = `angular/apps/${APP}/src/environments/environment.prod.ts`;
    const filePathLocal = `angular/apps/${APP}/src/environments/environment.ts`;
    const fileContent = `import { Environment, EnvironmentType } from './environment.interface';

export const environment: Environment = {
  type: EnvironmentType.${env === 'dev' ? 'dev' : 'prod'},
  baseUrl: '${BASEURL}',
  firebase: {
    apiKey: '${FIREBASE_API_KEY}',
    authDomain: '${FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${FIREBASE_DATABASE_URL}',
    projectId: '${FIREBASE_PROJECT_ID}',
    storageBucket: '${FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${FIREBASE_MESSAGING_SENDER_ID}'
  },
  sentry: '${SENTRY_DSN}',
  logRocket: '${LOGROCKET_KEY}',
  release: '${RELEASE}'
};
`;

    fs.writeFileSync(filePathLocal, fileContent);
    console.log(`Success! File saved to "${filePathLocal}"`);

    // TODO: dirty workaround for https://github.com/angular/angular-cli/issues/10881
    fs.writeFileSync(filePath, fileContent);
    console.log(`Success! File saved to "${filePath}"`);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};
