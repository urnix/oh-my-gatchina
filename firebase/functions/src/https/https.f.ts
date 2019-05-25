import * as express from 'express';
import * as functions from 'firebase-functions';
import { unescape } from 'querystring';
import { Logger } from '../+utils/logger';
import { eventsRouter } from './routers/eventsRouter';
import { categoriesRouter } from './routers/categoriesRouter';

const app = express();

app.use((req: express.Request, res: express.Response, next: Function) => {
  const logger = new Logger('https', true);
  logger.debug(`${req.method} ${unescape(req.originalUrl)}`);
  next();
});

const apiRouter = express.Router();
apiRouter.use('/hello', (req, res) => res.send('Hello world!'));
apiRouter.use('/events', eventsRouter);
apiRouter.use('/categories', categoriesRouter);

app.use('/api', apiRouter);
app.use('*', (req, res) => res.status(404).send('Sorry... Nothing here'));

exports = module.exports = functions.https.onRequest(app);
