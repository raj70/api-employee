import express from 'express';

//import { isAuthenticated } from './auth';
import EmployeeController from '../controllers/employeeController';

const router = express.Router();
/**
 * set routers for the api
 */
export const apiRouters = (app: express.Express) => {
    console.log("router registration");

    /** employee controller */
    const employeeController = new EmployeeController();
    employeeController.setRouter(router);

    //app.use('/api', isAuthenticated, router);
    app.use('/api', router);

}

