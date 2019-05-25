import * as express from 'express';
import * as functions from 'firebase-functions';
import { unescape } from 'querystring';
import { Logger } from '../+utils/logger';

const app = express();

app.use((req: express.Request, res: express.Response, next: Function) => {
  const logger = new Logger('https', true);
  logger.debug(`${req.method} ${unescape(req.originalUrl)}`);
  next();
});

const apiRouter = express.Router();
apiRouter.use('/hello', (req, res) => res.send('Hello world!'));

app.use('/api', apiRouter);
app.use('*', (req, res) => res.status(404).send('Sorry... Nothing here'));

exports = module.exports = functions.https.onRequest(app);
