import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { RoleController } from '../controllers/RoleController';
import { RegisterController } from '../controllers/RegisterController';

export function setRouter(router: express.Router): void {
    router.get('/Auth/Role/:id([a-zA-Z0-9]{24}$)/', checkIfAdmin, getRole);
    router.get('/Auth/User/:id([a-zA-Z0-9]{24}$)/', getUser); /** why do I need this? */
    router.post('/Auth/User', register);
    router.post('/Auth/Role', checkIfAdmin, setRole);
    router.put('/Auth/User/:id([a-zA-Z0-9]{24}$)/', validate);
}

/**
 * request must not be from client; request must be from known host 
 */
async function getRole(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();
    const message = await controller.getRole(_req.params.id);
    _res.status(200).send({ message });
}

/** check the user is authenticated and role is admin */
async function setRole(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();

    const role = new Role();
    role.assignRole = _req.body.assignRole;
    role.userId = _req.body.userId; /* this is id created by Db,in case of MongoDb */

    const message = await controller.setRole(role);
    _res.status(200).send({ message });
}

async function getUser(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new AuthController();
    const message = await controller.getUser(_req.params.id);
    _res.status(200).send({ message });
}

async function register(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RegisterController();

    const user = new User();
    user.email = _req.body.email;
    user.password = _req.body.password;

    const message = await controller.register(user);
    _res.status(200).send({ message });
}

async function validate(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new AuthController();

    const user = new User();
    user.email = _req.body.email;
    user.password = _req.body.password;
    const message = await controller.validate(_req.params.id, user);
    _res.status(200).send({ message });
}

/**
 * must supplied role._id; supply it either on params or post on body
 * @param _req 
 * @param _res 
 * @param _next 
 */
async function checkIfAdmin(_req: express.Request, _res: express.Response, _next: express.NextFunction) {

    let _id = '';

    if (_req.params._id) {
        _id = _req.params._id;
    }

    if (_req.body) {
        _id = _req.body._id;
    }

    if (_id === '') {
        _res.status(500).send({
            message: {
                message: "Fail",
                statusCode: "400",
            }
        });
    }

    const controller = new RoleController();
    const message = await controller.getRole(_id);

    if (message.isError) {
        _res.status(500).send({
            message: {
                message: "Fail",
                statusCode: "400",
            }
        });
    }

    if (!message.isError && message.data.length > 0) {
        const roles = (message.data[0] as Role).assignRole;
        let isAdmin = false;
        roles.forEach(x => {
            isAdmin = x === "Admin";
        });

        if (!isAdmin) {
            _res.status(500).send({
                message: {
                    message: "Fail",
                    statusCode: "400",
                }
            });
        }

    } else {
        _res.status(500).send({
            message: {
                message: "Fail",
                statusCode: "400",
            }
        });
    }

    _next();
}