import express from 'express';

export function setRouter(router: express.Router): void {
    router.get('/Auth/:id([a-zA-Z0-9]{24}$)/', getRole);
    router.get('/Auth/User/:id([a-zA-Z0-9]{24}$)/', getUser);
    router.post('/Auth', register);
    router.put('/Auth', validate);
}

function getRole(_req: express.Request, _res: express.Response): void {
    _res.send("Hello from GetRole");
}

function getUser(_req: express.Request, _res: express.Response): void {
    _res.send("Hello from GetUser");
}

function register(_req: express.Request, _res: express.Response): void {
    _res.send("Hello from GetRegister");
}

function validate(_req: express.Request, _res: express.Response): void {
    _res.send("Hello from GetValidate");
}