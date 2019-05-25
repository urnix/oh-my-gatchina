
import * as express from 'express';
import { Logger } from '../../+utils/logger';

export function handleError(
  logger: Logger,
  error: any,
  res: express.Response,
  status: number,
  text: string,
  params?: { [key: string]: any },
): void {
  logger.error(null, new Error(error), params);
  res.status(status).send(text);
}
