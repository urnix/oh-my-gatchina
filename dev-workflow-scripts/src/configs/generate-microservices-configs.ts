import { exit } from 'process';

export const generateMicroservicesConfiguration = () => {
  try {
    const fs = require('fs');
    const availableEnvironments = ['dev', 'e2e', 'qa', 'prod'];
    if (!availableEnvironments.includes(process.argv[2])) {
      console.error(
        `Please provide one of environments -  "dev", "e2e", "qa" or "prod". Example: "$ node generate-microservices-configs dev"\n`,
      );
      exit(1);
    }

    const ENVTYPE = process.argv[2].toUpperCase();
    const INST = ENVTYPE === 'PROD' ? 'INST_PROD' : 'INST_QA';

    // console.log('\nEnvironment:', ENVTYPE);

    const SQL_MICROSERVICE_SERVICE_NAME = process.env[`${ENVTYPE}_SQL_MICROSERVICE_SERVICE_NAME`];
    const CLOUD_SQL_INSTANCE = process.env[`${INST}_CLOUD_SQL_INSTANCE`];
    const SQL_PASSWORD = process.env[`${INST}_SQL_PASSWORD`];
    const ACCOUNT_KEY: string = process.env[`${INST}_GAE_ACCOUNT_KEY`];
    const SQL_MICROSERVICE_SERVICE_SECRETKEY = process.env[`${ENVTYPE}_SQL_MICROSERVICE_SERVICE_SECRETKEY`];
    const SENTRY_DSN = process.env[`${ENVTYPE}_SENTRY_DSN`];

    // ACCOUNT KEY
    const accountKeyFilePath = `gaeAccountKey.json`;
    if (fs.existsSync(accountKeyFilePath)) {
      fs.unlinkSync(accountKeyFilePath);
      console.log(`Success! Existing file deleted: "${accountKeyFilePath}"`);
    }
    if (ACCOUNT_KEY && !['fakeString', ''].includes(ACCOUNT_KEY)) {
      // fs.writeFileSync(accountKeyFilePath, ACCOUNT_KEY);
      fs.writeFileSync(
        accountKeyFilePath,
        ACCOUNT_KEY.replace(new RegExp('\\n', 'g'), '\\n').replace(new RegExp('\\\\"', 'g'), '"'),
      );
      console.log(`Success! File saved to "${accountKeyFilePath}"`);
    } else {
      console.log(`Success! File skipped "${accountKeyFilePath}"`);
    }

    // MICROSERVICE ENV
    const envFilePath = `microservices/sql-mirror/production.env`;
    const envFileContent = `SECRETKEY=${SQL_MICROSERVICE_SERVICE_SECRETKEY}
SENTRYDSN=${SENTRY_DSN}
`;
    fs.writeFileSync(envFilePath, envFileContent);
    console.log(`Success! File saved to "${envFilePath}"`);

    // YAML
    const yamlFilePath = `microservices/sql-mirror/app.yaml`;
    const yamlFileContent = `runtime: nodejs
env: flex
manual_scaling:
  instances: 1
resources:
  cpu: 1
  memory_gb: 0.5 
  disk_size_gb: 10
beta_settings:
  cloud_sql_instances: ${CLOUD_SQL_INSTANCE}
${ENVTYPE === 'PROD' ? '' : 'service: ' + SQL_MICROSERVICE_SERVICE_NAME}
`;
    fs.writeFileSync(yamlFilePath, yamlFileContent);
    console.log(`Success! File saved to "${yamlFilePath}"`);

    // ORM
    const ormFilePath = `microservices/sql-mirror/ormconfig.json`;
    const ormFileContent = `{
  "name": "default",
  "type": "postgres",
  "extra": {
    "socketPath": "/cloudsql/${CLOUD_SQL_INSTANCE}"
  },
  "host": "/cloudsql/${CLOUD_SQL_INSTANCE}",
  "username": "postgres",
  "password": "${SQL_PASSWORD}",
  "database": "firestore-mirror${ENVTYPE === 'PROD' ? '' : '-' + SQL_MICROSERVICE_SERVICE_NAME}",
  "entities": ["dist/**/**.entity.js"],
  "synchronize": true
}
`;
    fs.writeFileSync(ormFilePath, ormFileContent);
    console.log(`Success! File saved to "${ormFilePath}"`);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};
