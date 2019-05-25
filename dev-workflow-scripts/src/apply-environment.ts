import { run, setProcessEnvFromFile } from './+utils/utils';
import { generateAngularConfiguration } from './configs/generate-angular-configs';
import { generateFirebaseFunctionConfiguration } from './configs/generate-functions-configs';
import { generateMicroservicesConfiguration } from './configs/generate-microservices-configs';
// noinspection TypeScriptPreferShortImport
import { sequential } from '../../shared/helpers/async.helper';

const fs = require('fs-extra');

export type Env = 'dev' | 'e2e' | 'qa' | 'prod';
export type EnvUpp = 'DEV' | 'E2E' | 'QA' | 'PROD';
export type App = 'eatery' | 'clearing';
type VarsMap = { [varName: string]: string };

const argv = require('minimist')(process.argv.slice(2));
const ENV: Env = argv._[0] as Env;
const ENV_UPP = ENV.toUpperCase() as EnvUpp;

function generateConfigs(env: Env) {
  // console.log(`process.env2: ${JSON.stringify(process.env)}`);
  console.log(`\nGenerating configs for environment: ${JSON.stringify(env)}`);
  generateFirebaseFunctionConfiguration();
  generateAngularConfiguration('eatery' as App, env);
  generateAngularConfiguration('clearing' as App, env);
  generateMicroservicesConfiguration();
  console.log(`Generating configs finished.\n`);
}

function getAuthOpts(envTypeUpp: EnvUpp) {
  const firebaseProject = process.env[`${envTypeUpp}_FIREBASE_PROJECT_NAME`];
  const firebaseToken = process.env[`${envTypeUpp}_FIREBASE_TOKEN`];
  return firebaseProject && firebaseToken ? ` --project ${firebaseProject} --token ${firebaseToken}` : '';
}

// TODO: handle promise if havent token
async function chooseProject(envUpp: EnvUpp) {
  const projectId = process.env[`${envUpp}_FIREBASE_PROJECT_ID`];
  await run(`firebase use ${projectId}${getAuthOpts(envUpp)}`);
}

function getAliases(envTypeUpp: EnvUpp) {
  return {
    eatery: process.env[`${envTypeUpp}_HOSTING_ALIAS_EATERY`],
    clearing: process.env[`${envTypeUpp}_HOSTING_ALIAS_CLEARING`],
    website: process.env[`${envTypeUpp}_HOSTING_ALIAS_WEBSITE`],
  };
}

async function setTargets(envTypeUpp: EnvUpp) {
  const aliasesMap = getAliases(envTypeUpp);
  await sequential(Object.keys(aliasesMap), appName =>
    run(`firebase target:apply hosting ${appName} ${aliasesMap[appName]}${getAuthOpts(envTypeUpp)}`),
  );
}

async function varsFromEnv(env: Env): Promise<VarsMap> {
  return new Promise<VarsMap>(async (resolve, reject) => {
    try {
      const envTypeUpp = env.toUpperCase() as EnvUpp;
      const releaseCmd = 'bash dev-workflow-scripts/+utils/generateReleaseNumber.bash';
      const release: string = ((await run(releaseCmd, true, 'verbose')) as string).trim();
      const vars: VarsMap = {
        'env.type': env,
        'env.release': release,
        'env.eateryfrontendurl': process.env[`${envTypeUpp}_EATERY_BASEURL`],
        'env.clearingfrontendurl': process.env[`${envTypeUpp}_CLEARING_BASEURL`],
        'sentry.dsn': process.env[`${envTypeUpp}_SENTRY_DSN`],
        'sendgrid.secretkey': process.env[`${envTypeUpp}_SENDGRID_SECRETKEY`],
        'cron.key': process.env[`${envTypeUpp}_CRON_KEY`],
        'twilio.sid': process.env[`TWILIO_SID`],
        'twilio.token': process.env[`TWILIO_TOKEN`],
        'twilio.from': process.env[`TWILIO_FROM`],
        'hoiio.appid': process.env[`HOIIO_APPID`],
        'hoiio.accesstoken': process.env[`HOIIO_ACCESSTOKEN`],
        'website.scheduledemoemail': process.env[`${envTypeUpp}_WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL`],
        'website.mailchimpkey': process.env[`MAILCHIMP_KEY`],
        'xero.apptype': process.env[`${envTypeUpp}_XERO_APP_TYPE`],
        'xero.consumerkey': process.env[`${envTypeUpp}_XERO_CONSUMER_KEY`],
        'xero.consumersecret': process.env[`${envTypeUpp}_XERO_CONSUMER_SECRET`],
        'xero.privatekeystring': process.env[`${envTypeUpp}_XERO_PRIVATE_KEY_STRING`],
        'sql.microserviceurl': process.env[`${envTypeUpp}_SQL_MICROSERVICE_SERVICE_URL`],
        'sql.microservicesecretkey': process.env[`${envTypeUpp}_SQL_MICROSERVICE_SERVICE_SECRETKEY`],
      };
      resolve(vars);
    } catch (e) {
      reject(e);
    }
  });
}

async function setEnv(env: Env) {
  const envTypeUpp = env.toUpperCase() as EnvUpp;
  const vars = await varsFromEnv(env);
  const varsStr = Object.keys(vars).reduce((acc, cur) => `${acc}\t${cur}="${vars[cur]}" \\\n`, '');
  let cmd = 'firebase functions:config:set' + getAuthOpts(envTypeUpp) + ' \\\n' + varsStr;
  cmd = cmd.replace(/\\n/g, '\u000A'); // important trick!
  await run(cmd, false, 'hide');
}

function getContentIfFileExists(path: string) {
  let content;
  try {
    content = fs.readFileSync(path);
  } catch (e) {}
  return content;
}

// TODO: populate RELEASE in .runtimeconfig
async function main(): Promise<void> {
  let source;
  if (argv.source) {
    source = argv.source;
  } else {
    const pathFromEnv = `../../envs/${ENV}/${ENV}.env`;
    if (getContentIfFileExists(pathFromEnv)) {
      source = pathFromEnv;
    } else {
      const pathFromName = `../../envs/${argv._[1]}/${argv._[1]}.env`;
      if (getContentIfFileExists(pathFromName)) {
        source = pathFromName;
      }
    }
  }
  setProcessEnvFromFile(source);

  generateConfigs(ENV);
  await chooseProject(ENV_UPP);
  await setTargets(ENV_UPP);
  await setEnv(ENV);
}

void main();
