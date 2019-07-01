import { Message } from "../../models/Message";
import { Role } from "../models/Role";
import DbRole from "../dbModels/DbRole";

export class RoleController {
    constructor() {
    }

    getRole(_id: string): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            DbRole.findById(_id, (error, role) => {
                if (error) {
                    message.statusCode = 500;
                    message.message = "Role not found";
                    reject(message);
                } else if (!role) {
                    message.statusCode = 500;
                    message.message = "Role not found";
                    reject(message);
                }
                else {
                    message.data = [role];
                    resolve(message);
                }
            });

        }).catch(reason => {
            return reason;
        });
    }

    setRole(_role: Role): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            var dbRole = new DbRole();
            dbRole.userId = _role.userId;
            dbRole.assignRole = _role.assignRole;

            await dbRole.save(error => {
                if (error) {
                    message.isError = true;
                    if (error.code === 11000) {
                        message.statusCode = 400;
                        message.message = "Duplicate User";
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