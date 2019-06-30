/* https://github.com/a-tarasyuk/webpack-typescript-babel */
/* https://github.com/a-tarasyuk/webpack-typescript-babel */

import express from 'express';

import bodyParser from 'body-parser';
import { setEnv } from '../config/env';
import { connectdb_Auth } from '../config/db';

const app = express();

//configure
app.use(bodyParser.json());
setEnv();
//apiRouters(app);
connectdb_Auth();


app.get('/', (_req, res, _next) => {
    res.status(200).send("auth api service");
});

const port: number = process.env.PORT_NUMBER_AUTH ? <number><unknown>process.env.PORT_NUMBER_AUTH : 4200;

app.listen(port, 'localhost', () => {
    console.log(`api server running on port ${process.env.PORT_NUMBER_AUTH}`);
    console.log(`api server running: http://${process.env.HOST}:${process.env.PORT_NUMBER_AUTH}`);
});