/* https://github.com/a-tarasyuk/webpack-typescript-babel */
/* https://github.com/a-tarasyuk/webpack-typescript-babel */

import express from 'express';

import { setEnv } from './config/env';
import { apiRouters } from './config/routers';
import bodyParser from 'body-parser';
import { connectdb } from './config/db';

const app = express();

//configure
app.use(bodyParser.json());
setEnv();
apiRouters(app);
connectdb();


app.get('/', (_req, res, _next) => {
    res.status(200).send("api service");
});

app.listen(4100, 'localhost', () => {
    console.log(`api server running on port ${process.env.PORT}`);
    console.log(`api server running: http://${process.env.HOST}:${process.env.PORT}`);
});