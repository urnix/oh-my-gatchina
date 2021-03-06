import * as express from 'express';
import { Logger } from '../../+utils/logger';
import { handleError } from '../utils/handleError';
import { getFirestore, unwrapCollectionSnapshot } from '../../+utils/firestore';
const router = express.Router();
const firestore = getFirestore();
export const eventsRouter = createRouter();

function createRouter() {
  const logger = new Logger('eventsRouter');
  router.get('', async (req, res) => {
    const params = { ...req.query };
    try {
      //logger.debug('Search request: ', { params });
      const events = await getEvents(params);
      res.json(events);
    } catch (error) {
      handleError(logger, error, res, 500, 'Something went wrong. Try again later');
    }
  });
  return router;
}

async function getEvents(params?) {
  const eventsSnapshot = await firestore.collection('events').get();
  return unwrapCollectionSnapshot(eventsSnapshot);
}
