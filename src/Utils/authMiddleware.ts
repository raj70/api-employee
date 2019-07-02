import express from 'express';
import { JwtUtil } from './TokenUtil';
import { VerifyErrors } from 'jsonwebtoken';

/**
 * Is user login?
 * Send auth info on header
 * @param req 
 * @param res 
 * @param next 
 */
export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers.Authorization || req.headers['authorization']) {
        let errorMessage = '';

        let authValue = '';
        authValue = getAuthToken(req);

        let isValid = false;
        if (authValue !== '') {
            const token = new JwtUtil();
            isValid = token.validate(authValue, error);
        }

        if (authValue === '' || !isValid) {
            res.status(400).send({ message: "User not valid. Please login " + errorMessage });
        }

        next();

        function error(error: VerifyErrors) {
            if (error) {
                errorMessage = error.message;
            }
        }
    } else {
        res.status(400).send({ message: "User not valid" });
    }
}

export const getAuthToken = (req: express.Request): string => {
    if (req.headers.Authorization || req.headers['authorization']) {
        let authValue = '';

        if (req.headers.Authorization) {
            authValue = req.headers.Authorization[0];
        } else if (req.headers['authorization']) {
            authValue = req.headers['authorization'];
        }
        return authValue;
    } else {
        return '';
    }
}