import express from 'express';

import * as exployeeRouter from '../controllers/employeeRouter';

const router = express.Router();
/**
 * set routers for the api
 */
export const apiRouters = (app: express.Express) => {

    exployeeRouter.setRouter(router);
    app.use('/api', router);

}

