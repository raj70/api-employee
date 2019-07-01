import { User } from "../models/User";
import { Message } from "../../models/Message";
import DbUser from "../dbModels/DbUser";

export class RegisterController {
    constructor() {
    }

    register(_user: User): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            const dbUser = new DbUser();
            dbUser.email = _user.email;
            dbUser.password = _user.password;

            dbUser.save((error, user) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = "User not able to save";
                    reject(message);
                } else {
                    message.data = [user];
                    resolve(message);
                }
            });
        }).catch(reason => {
            return reason;
        });
    }
}