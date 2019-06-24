import express from 'express';

export const isAuthenticated = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    if (req.body.Authorization) {
        const user = req.body.user;
        const password = req.body.password;
        console.log(user, password);
        next();
    } else {
        _res.status(400).send({ message: "User not valid" });
    }
}