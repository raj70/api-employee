import { Message } from "../../models/Message";
import { Role } from "../models/Role";
import DbRole from "../dbModels/DbRole";
import DbUser from "../dbModels/DbUser";

export class RoleController {
    constructor() {
    }

    getRole(_roleId: string): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            await DbRole.findOne({ _id: _roleId }, (error, role) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = "Role not found";
                    reject(message);
                } else if (!role) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = "Role not found";
                    reject(message);
                } else {
                    message.data.push(role.name as unknown as object);
                    resolve(message);
                }
            });

        }).catch(reason => {
            return reason;
        });
    }

    getRoles(_userId: string): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            await DbUser.findById(_userId, async (error, user) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = "User not found";
                    reject(message);
                } else if (!user) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = "User not found";
                    reject(message);
                } else {
                    const d = await this.findRoles(user.roles);
                    message.data = d.map(x => x as unknown as object);
                    resolve(message);
                }
            });

        });
    }

    findRoles(ids: string[]): Promise<string[]> {
        return new Promise<string[]>(async (resolve, reject) => {
            let rs: string[] = [];
            ids.forEach(async id => {
                await DbRole.findById(id, (_error, role) => {
                    if (_error || !role) {
                        reject(rs);
                    }
                    if (role) {
                        rs.push(role.name.toString());
                        resolve(rs);
                    }
                });
            });
        }).catch(reason => reason);
    }

    setRole(_role: Role): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            var dbRole = new DbRole();
            dbRole.name = _role.name;

            DbRole.findOne({ name: dbRole.name }, (error, role) => {
                if (error || role) {
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Duplicate Role";
                }
            });

            // roles found so
            if (message.isError) {
                reject(message);
            }

            await dbRole.save(error => {
                if (error) {
                    message.isError = true;
                    if (error.code === 11000) {
                        message.statusCode = 400;
                        message.message = "Duplicate Role";
                    } else {
                        message.statusCode = 500;
                        message.message = error.message;
                    };
                    reject(message);
                } else {
                    resolve(message);
                }
            });
        }).catch(reason => {
            return reason;
        });
    }
}