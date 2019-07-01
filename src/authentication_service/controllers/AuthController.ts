import bcrypt from 'bcrypt-nodejs';
import { User } from "../models/User";
import { Message } from "../../models/Message";
import DbUser from "../dbModels/DbUser";

export class AuthController {
    constructor() {
    }

    getUser(_id: string): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            DbUser.findOne({ _id: _id }, (error, user) => {
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
                }
                else {
                    message.data = [{ _id: user._id, email: user.email }];
                    resolve(message);
                }
            });
        }).catch(reason => {
            return reason;
        });
    }

    validate(_id: string, _user: User): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            const errorMessage = "User or Password not valid";
            DbUser.findOne({ _id }, (error, user) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = errorMessage;
                    reject(message);
                } else if (!user) {
                    message.isError = true;
                    message.statusCode = 500;
                    message.message = errorMessage;
                    reject(message);
                } else {
                    if (_user.email === user.email && bcrypt.compareSync(_user.password, user.password)) {
                        message.data = [{ _id: user._id, email: user.email }];
                        resolve(message);
                    } else {
                        message.isError = true;
                        message.statusCode = 500;
                        message.message = errorMessage;
                        reject(message);
                    }
                }
            });
        }).catch(reason => {
            return reason;
        });
    }
}