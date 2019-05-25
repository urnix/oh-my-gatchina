import { Severity } from '@sentry/types';
// import { config } from './config';
import * as Sentry from '@sentry/node';
import * as shortid from 'shortid';
// noinspection TypeScriptPreferShortImport
import { WrappedError } from '../../../../shared/types/errorWrapper.class';

// if (config.sentry && ['qa', 'e2e', 'prod'].includes(config.env.type)) {
//   const release = config.env && config.env.release;
//   if (!release) {
//     console.error('Logger: no "env.release" provided');
//   }
//   Sentry.init({
//     dsn: config.sentry.dsn,
//     release,
//     //integrations: [new Sentry.Integrations.RewriteFrames()],
//   });
// }

export class Logger {
  prefix: string;
  static rootFunctionId: string;

  constructor(callerFunctionName: string, isHeaderLogger?: boolean) {
    const id = shortid.generate();
    if (isHeaderLogger) {
      Logger.rootFunctionId = id;
    }
    this.prefix = `${Logger.rootFunctionId}${isHeaderLogger ? `>${id}` : ''} | ${callerFunctionName}`;
  }

  debug(message: string, details?: { [key: string]: any }) {
    console.log(this.getPrefixedMessage(message, details));
  }

  warn(message: string, details?: { [key: string]: any }) {
    const prefixedMessage = this.getPrefixedMessage(message, details);
    console.warn(prefixedMessage);
    Sentry.captureMessage(prefixedMessage, Severity.Warning);
  }

  error(message?: string, error?: Error, details?: { [key: string]: any }) {
    const prefixedMessage = this.getPrefixedMessage(message, details);
    console.error(prefixedMessage, error ? error : '');
    Sentry.captureException(new WrappedError(prefixedMessage, error));
  }

  private getPrefixedMessage(message: string, details?: { [key: string]: any }): string {
    return `${this.prefix} | ${message || ''}${details ? `\n${JSON.stringify(details, null, 2)}` : ''}`;
  }
}
