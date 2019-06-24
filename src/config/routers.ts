import express from 'express';
import { isAuthenticated } from './auth';

export const setApiController = (app: express.Express) => {
    app.use('/api', isAuthenticated, (_req: express.Request, res: express.Response) => {
        res.status(200).send({
            message: "Hello from api"
        });
    })
}