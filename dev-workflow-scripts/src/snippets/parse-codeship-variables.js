/**
 * Snippet for fast extract all variables from codeship page
 * https://app.codeship.com/projects/<PROJECT_ID>/environment/edit using browser console
 */

function escape(str) {
  return str.replace(new RegExp('"', 'g'), '\\"');
}

function getPrefix(str) {
  return str.substr(0, str.indexOf('_'));
}

function sortFields(fields) {
  return fields
    .sort(function(a, b) {
      const a_ = a
        .replace('PROD_', '')
        .replace('QA_', '')
        .replace('E2E_', '')
        .replace('INST_PROD_', '')
        .replace('INST_QA_', '');
      const b_ = b
        .replace('PROD_', '')
        .replace('QA_', '')
        .replace('E2E_', '')
        .replace('INST_PROD_', '')
        .replace('INST_QA_', '');
      if (a_ < b_) {
        return -1;
      }
      if (a_ > b_) {
        return 1;
      }
      return 0;
    })
    .join('\n');
}

vars = {};
[].map.call(document.querySelectorAll('.existing-environment-variable'), row => {
  let arr = [];
  [].map.call(row.querySelectorAll('input'), (input, i) => {
    arr[i] = input.value;
  });
  vars[arr[0]] = escape(arr[1]);
});
vars['CI_BUILD_NUMBER'] = 'fakeString';
vars['CI_COMMIT_ID'] = 'fakeString';

files = { PROD: [], QA: [], E2E: [] };
[].map.call(Object.keys(vars), name => {
  let value = vars[name];
  let group = getPrefix(name);
  if (group === 'INST') {
    group += '_' + getPrefix(name.substr(5));
  }
  if (['PROD', 'QA', 'E2E', 'INST_PROD', 'INST_QA'].indexOf(group) === -1) {
    group = 'COMMON';
  }

  const str = name + '="' + value + '"';
  if (group === 'COMMON') {
    files['PROD'].push(str);
    files['QA'].push(str);
    files['E2E'].push(str);
  } else if (group === 'INST_PROD') {
    files['PROD'].push(str);
  } else if (group === 'INST_QA') {
    files['QA'].push(str);
    files['E2E'].push(str);
  } else {
    files[group].push(str);
  }
});

[].map.call(Object.keys(files), filename => {
  console.log(`${filename}:\n ${sortFields(files[filename])}`);
});
