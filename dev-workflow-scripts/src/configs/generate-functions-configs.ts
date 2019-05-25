import { exit } from 'process';

const ENV = process.argv[2];
const ENV_UP = ENV.toUpperCase();

export const generateFirebaseFunctionConfiguration = () => {
  try {
    const fs = require('fs');
    const availableEnvironments = ['prod', 'dev', 'qa', 'e2e'];
    if (!availableEnvironments.includes(ENV)) {
      console.error(
        `Please provide one of environments - "prod", "dev", "qa" or "e2e". Example: "$ node generate-firebase-runtimeconfig e2e"\n`,
      );
      exit(1);
    }

    // console.log('\nEnvironment:', ENVTYPE);

    const FIREBASE_DATABASE_URL = process.env[`${ENV_UP}_FIREBASE_DATABASE_URL`];
    const FIREBASE_PROJECT_ID = process.env[`${ENV_UP}_FIREBASE_PROJECT_ID`];
    const FIREBASE_STORAGE_BUCKET = process.env[`${ENV_UP}_FIREBASE_STORAGE_BUCKET`];
    const FIREBASE_API_KEY = process.env[`${ENV_UP}_FIREBASE_API_KEY`];
    const EATERY_FRONTEND_URL = process.env[`${ENV_UP}_EATERY_BASEURL`];
    const CLEARING_FRONTEND_URL = process.env[`${ENV_UP}_CLEARING_BASEURL`];
    // const RELEASE = process.env[`RELEASE`];
    const RELEASE = process.argv[3] || 'fakeRelease';
    const SENDGRID_SECRETKEY = process.env[`${ENV_UP}_SENDGRID_SECRETKEY`];
    const WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL =
      process.env[`${ENV_UP}_WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL`];
    const MAILCHIMP_KEY = process.env[`MAILCHIMP_KEY`];
    const XERO_APP_TYPE = process.env[`${ENV_UP}_XERO_APP_TYPE`];
    const XERO_CONSUMER_KEY = process.env[`${ENV_UP}_XERO_CONSUMER_KEY`];
    const XERO_CONSUMER_SECRET = process.env[`${ENV_UP}_XERO_CONSUMER_SECRET`];
    const XERO_PRIVATE_KEY_STRING = process.env[`${ENV_UP}_XERO_PRIVATE_KEY_STRING`];
    const CRON_KEY = process.env[`${ENV_UP}_CRON_KEY`];
    const TWILIO_SID = process.env[`TWILIO_SID`];
    const TWILIO_TOKEN = process.env[`TWILIO_TOKEN`];
    const TWILIO_FROM = process.env[`TWILIO_FROM`];
    const HOIIO_APPID = process.env[`HOIIO_APPID`];
    const HOIIO_ACCESSTOKEN = process.env[`HOIIO_ACCESSTOKEN`];
    const SENTRY_DSN = process.env[`${ENV_UP}_SENTRY_DSN`];
    const SQL_MICROSERVICE_SERVICE_URL = process.env[`${ENV_UP}_SQL_MICROSERVICE_SERVICE_URL`];
    const SQL_MICROSERVICE_SERVICE_SECRETKEY = process.env[`${ENV_UP}_SQL_MICROSERVICE_SERVICE_SECRETKEY`];
    const FIREBASE_SERVICE_ACCOUNT_ACCESS_KEY = process.env[`${ENV_UP}_FIREBASE_SERVICE_ACCOUNT_ACCESS_KEY`];

    const filePath = `firebase/functions/.runtimeconfig.json`;
    // 'apiKey' - just for test Security Rules using 'firebase' package
    const fileContent = `{
    "firebase": {
      "apiKey": "${FIREBASE_API_KEY}",
      "databaseURL": "${FIREBASE_DATABASE_URL}",
      "projectId": "${FIREBASE_PROJECT_ID}",
      "storageBucket": "${FIREBASE_STORAGE_BUCKET}"
    },
    "sendgrid": {
      "secretkey": "${SENDGRID_SECRETKEY}"
    },
    "website": {
      "scheduledemoemail": "${WEBSITE_SCHEDULE_A_DEMO_DESTINATION_EMAIL}",
      "mailchimpkey": "${MAILCHIMP_KEY}"
    },
    "cron": {
      "key": "${CRON_KEY}"
    },
    "twilio": {
      "token": "${TWILIO_TOKEN}",
      "sid": "${TWILIO_SID}",
      "from": "${TWILIO_FROM}"
    },
    "env": {
      "type": "${ENV}",
      "release": "${RELEASE}",
      "eateryfrontendurl": "${EATERY_FRONTEND_URL}",
      "clearingfrontendurl": "${CLEARING_FRONTEND_URL}"
    },
    "hoiio": {
      "appid": "${HOIIO_APPID}",
      "accesstoken": "${HOIIO_ACCESSTOKEN}"
    },
    "sentry": {
      "dsn": "${SENTRY_DSN}"
    },
    "xero": {
      "apptype": "${XERO_APP_TYPE}",
      "consumerkey": "${XERO_CONSUMER_KEY}",
      "consumersecret": "${XERO_CONSUMER_SECRET}",
      "privatekeystring": "${XERO_PRIVATE_KEY_STRING.replace(/\n/g, '\\n')}"
    },
    "sql": {
      "microserviceurl": "${SQL_MICROSERVICE_SERVICE_URL}",
      "microservicesecretkey": "${SQL_MICROSERVICE_SERVICE_SECRETKEY}"
    }
}
`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`Success! File saved to "${filePath}"`);

    if (ENV === 'e2e') {
      const firebaseServiceAccountFilePath = `firebase/configs/${ENV.toLowerCase()}-account-key.json`;
      const firebaseServiceAccountFileContent = `${FIREBASE_SERVICE_ACCOUNT_ACCESS_KEY}` || {};

      const configsFolderPath = 'firebase/configs/';
      if (!fs.existsSync(configsFolderPath)) {
        fs.mkdirSync(configsFolderPath);
      }
      fs.writeFileSync(firebaseServiceAccountFilePath, firebaseServiceAccountFileContent);
      console.log(`Success! File saved to "${firebaseServiceAccountFilePath}"`);
    }
  } catch (error) {
    console.error(error);
    exit(1);
  }
};
