/* https://github.com/a-tarasyuk/webpack-typescript-babel */
/* https://github.com/a-tarasyuk/webpack-typescript-babel */

import express from 'express';

import { setEnv } from '../config/env';
import { apiRouters } from './routers/routers';
import bodyParser from 'body-parser';
import { connectdb } from '../config/db';

const app = express();

//configure
app.use(bodyParser.json());
setEnv();
apiRouters(app);
connectdb();


app.get('/', (_req, res, _next) => {
    res.status(200).send("api service");
});

const port: number = process.env.PORT_NUMBER ? <number><unknown>process.env.PORT_NUMBER : 9000;
app.listen(port, 'localhost', () => {
    console.log(`api server running on port ${process.env.PORT_NUMBER}`);
    console.log(`api server running: http://${process.env.HOST}:${process.env.PORT_NUMBER}`);
});