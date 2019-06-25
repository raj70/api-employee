import express from 'express';

export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers.Authorization || req.headers['authorization']) {
        const user = req.body.user;
        console.log(user, req.headers.Authorization, req.headers['authorization']);
        next();
    } else {
        res.status(400).send({ message: "User not valid" });
    }
}