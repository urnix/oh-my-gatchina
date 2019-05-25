import { deployFirebase } from './deploy-firebase';
import { exit } from 'process';
import { Env } from '../apply-environment';

const argv = require('minimist')(process.argv.slice(2));
const scriptName = 'deployFirebase';

deployFirebase(<Env>argv._[0], argv._[1], argv._[2], argv._[3], argv._[4], argv._[5], argv._[6])
  .then(() => {
    console.log(`Script "${scriptName}": successfully finished`);
    return exit();
  })
  .catch(error => {
    console.log(`Script "${scriptName}": failed with error "${error}"`);
    return exit();
  });
