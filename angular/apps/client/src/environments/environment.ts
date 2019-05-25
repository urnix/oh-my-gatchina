import { Environment, EnvironmentType } from './environment.interface';

export const environment: Environment = {
  production: false,
  type: EnvironmentType.dev,
  baseUrl: 'https://foodrazor-dev-clearing.firebaseapp.com/',
  firebase: {
    apiKey: 'AIzaSyD1n3R56zTJyrTue1wgTrzuLygALeNpEA8',
    authDomain: 'oh-my-gatchina.firebaseapp.com',
    databaseURL: 'https://oh-my-gatchina.firebaseio.com',
    projectId: 'oh-my-gatchina',
    storageBucket: 'oh-my-gatchina.appspot.com',
    messagingSenderId: '56080447669'
  },
  sentry: '',
  logRocket: 'fakeString',
  release: 'fakeString_fakeSt'
};
