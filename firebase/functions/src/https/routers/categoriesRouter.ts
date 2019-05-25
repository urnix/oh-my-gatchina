import { Logger } from '../../+utils/logger';
import { handleError } from '../utils/handleError';
import { getFirestore, unwrapCollectionSnapshot } from '../../+utils/firestore';
import * as express from 'express';
const router = express.Router();
const firestore = getFirestore();
export const categoriesRouter = createRouter();

function createRouter() {
  const logger = new Logger('categoriesRouter');
  router.get('', async (req, res) => {
    const params = { ...req.query };
    try {
      //logger.debug('Search request: ', { params });
      const events = await getCategories(params);
      res.json(events);
    } catch (error) {
      handleError(logger, error, res, 500, 'Something went wrong. Try again later');
    }
  });
  return router;
}

async function getCategories(params?) {
  const eventsSnapshot = await firestore.collection('categories').get();
  return unwrapCollectionSnapshot(eventsSnapshot);
}
