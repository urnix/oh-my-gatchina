import { ErrorHandler, Injectable } from '@angular/core';
import { User as FirebaseUser } from 'firebase/app';
import * as LogRocket from 'logrocket';
import * as Sentry from '@sentry/browser';
import { environment } from '../../../environments/environment';
import { EnvironmentType } from '../../../environments/environment.interface';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {
    Sentry.withScope(scope => {
      scope.setExtra('debug', false);
      Sentry.captureException(error.originalError || error);
    });
    throw error;
  }
}

@Injectable()
export class LoggerService {
  private logRocketSessionURL = null;

  constructor() {
    this.debug('LoggerService.constructor()');
    if (environment.type === EnvironmentType.prod && environment.sentry) {
      Sentry.init({
        dsn: environment.sentry,
        release: environment.release || undefined
      });

      LogRocket.getSessionURL(sessionURL => {
        this.logRocketSessionURL = sessionURL;
      });

      Sentry.configureScope(scope => {
        scope.addEventProcessor(async event => {
          event.extra.sessionURL = this.logRocketSessionURL;
          return event;
        });
      });

      if (!environment.release) {
        this.error(
          'LoggerService.constructor() - no "environment.release" provided'
        );
      }
    }
  }

  setUser(user: FirebaseUser): void {
    const context = user
      ? { id: user.uid, email: user.email, username: user.displayName }
      : undefined;
    Sentry.configureScope(scope => {
      scope.setUser(context);
    });
  }

  debug(message: string, params?: { [key: string]: any }) {
    if (environment.type === EnvironmentType.prod) {
      return; // no output to console on production
    }
    console.log(message, params || '');
  }

  warn(message: string, params?: { [key: string]: any }) {
    console.warn(message, params || '');
    Sentry.withScope(scope => {
      scope.setExtra('params', params);
      scope.setLevel(Sentry.Severity.Warning);
      Sentry.captureMessage(message);
    });
  }

  error(message: string, error?: Error, params?: { [key: string]: any }) {
    console.error(message, error, params);
    Sentry.withScope(scope => {
      scope.setExtra('message', message);
      scope.setExtra('params', params);
      scope.setLevel(Sentry.Severity.Error);
      Sentry.captureException(error);
    });
  }
}
