import { exit } from 'process';

const messageFormatDescription = `Please write anything like this:\n\n\tfeat(path/to/changed/files)PR-001: implement any feature\n\nSee more here: https://github.com/anton-shubin-and-partners/styleguides/blob/master/gitflow.md#commit-message-format`;
const merge = 'Merge\\040.+';
const type = '(feat|fix|hotfix|chore|refactor|environment|epic)';
const scope = '\\([\\w\\-\\.\\_\\+\\/\\040\\,\\*\\|\\{\\}]+\\)';
const task = '([A-Z]{2}\\-\\d{1,4})?\\:\\040';
const description = '.+'; // '[\\w\\040\\,\\"\\”\\`\\\'\\.\\-\\:\\@\\>\\<\\/\\+\\&\\;\\(\\)\\=\\|\\!\\*]+'
const regex = `^(${merge})|(${type}${scope}${task}${description})\n?$`;
const myRegex = new RegExp(regex);

// '.git/COMMIT_EDITMSG', can be passed only through package.json->husky->hooks->commit-msg
const commitMsgPath = process.env.HUSKY_GIT_PARAMS;
const commitMsg = commitMsgPath
  ? require('fs').readFileSync(commitMsgPath, 'utf8')
  : `${process.env.CI_COMMIT_MESSAGE}`;

if (!myRegex.test(commitMsg)) {
  console.error(`Invalid commit message!\n\n\t${commitMsg}\n${messageFormatDescription}`);
  exit(1);
}
