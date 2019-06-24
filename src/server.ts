/* https://github.com/a-tarasyuk/webpack-typescript-babel */
/* https://github.com/a-tarasyuk/webpack-typescript-babel */

import express from 'express';

const app = express();

app.get('*', (_req, res, _next) => {
    res.status(200).send("api service");
});


const PORT = 4100;
app.listen(PORT, 'localhost', () => {
    console.log(`api server running on port ${PORT}`);
    console.log(`api server running: http://localhost:${PORT}`);
});