import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { User } from '../models/User';
import { Role, EnumRoles } from '../models/Role';
import { RoleController } from '../controllers/RoleController';
import { RegisterController } from '../controllers/RegisterController';
import { isAuthenticated, getAuthToken } from '../../Utils/authMiddleware';
import { IDbUser } from '../dbModels/DbUser';
import { Data, JwtUtil } from '../../Utils/TokenUtil';

export function setRouter(router: express.Router): void {
    router.get('/Auth/Role/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, getRole);
    router.get('/Auth/Roles/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, getRoles);
    router.get('/Auth/Roles', isAuthenticated, checkIfAdmin, getAllRoles);
    router.get('/Auth/User/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, checkIfAdmin, getUser); /** why do I need this? */
    router.post('/Auth/User', isAuthenticated, checkIfAdmin, register);
    router.post('/Auth/Role', isAuthenticated, checkIfAdmin, setRole);
    router.post('/Auth/Login', login);
}
/**
 * request must not be from client; request must be from known host 
 */
async function getRole(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();
    const message = await controller.getRole(_req.params.id);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

async function getRoles(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();
    const message = await controller.getRoles(_req.params.id);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

async function getAllRoles(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();
    const message = await controller.getAllRoles();
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

/** check the user is authenticated and role is admin */
async function setRole(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RoleController();

    const role = new Role();
    role.name = _req.body.name as EnumRoles;

    const message = await controller.setRole(role);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

async function getUser(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new AuthController();
    const message = await controller.getUser(_req.params.id);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

async function register(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new RegisterController();

    const user = new User();
    user.email = _req.body.email;
    user.password = _req.body.password;

    const message = await controller.register(user, _req.body.roleId);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

async function login(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new AuthController();

    const user = new User();
    user.email = _req.body.email;
    user.password = _req.body.password;

    const message = await controller.login(user);
    if (message.isError) {
        _res.status(500).send({ message });
    } else {
        _res.status(200).send({ message });
    }
}

/**
 * Is it admin? Must supplied role.userId which is _Id of Login User
 * @param _req 
 * @param _res 
 * @param _next 
 */
export async function checkIfAdmin(_req: express.Request, _res: express.Response, _next: express.NextFunction) {

    const authTokenFromHeader = getAuthToken(_req);

    // get userInfo from token
    const tokenUtil = new JwtUtil();
    const data: Data = await tokenUtil.getUser(authTokenFromHeader);

    // get user from Db
    const authController = new AuthController();
    let userResponse = await authController.getUser(data.data._id);

    if (!userResponse.isError) {
        const ifAdmin = new Promise<boolean>(async (resolve, _reject) => {
            let isAdmin = false;
            const controller = new RoleController();
            const roleIds = (userResponse.data[0] as IDbUser).roles;

            for (let index = 0; index < roleIds.length; index++) {
                await controller.getRole(roleIds[index]).then(m => {
                    //console.log('1', isAdmin, m.data);
                    m.data.forEach(r => {
                        let role = r as String;
                        if (role === 'Admin') {
                            isAdmin = true;
                            //console.log('2', isAdmin, role);
                        }
                    });
                    if (isAdmin) {
                        resolve(isAdmin); /** resolve terminate the promise */
                    }
                });
            }
            resolve(isAdmin);
            /** resolve terminate the promise; if the user is not admin; if we don't have this line, log 3 an log 4 will be seen. */

        }).catch(_reason => false);

        const isAdmin = await ifAdmin;
        //console.log('3', isAdmin);
        if (!isAdmin) {
            //console.log('4', isAdmin)
            /* stop to follow to next middleware */
            _next('router');
        } else {
            //console.log('5', isAdmin)
            _next();
        }

    } else {
        _res.status(400).send({
            message: {
                message: "Fail",
                statusCode: "400",
            }
        });
        _next('router');
    }
}

