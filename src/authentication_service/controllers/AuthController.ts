import bcrypt from 'bcrypt-nodejs';
import { User } from "../models/User";
import { Message } from "../../models/Message";
import DbUser from "../dbModels/DbUser";
import { JwtUtil } from '../../Utils/TokenUtil';

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

    validate(_user: User): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            const message = new Message();
            message.message = "Successful";
            message.statusCode = 200;

            const errorMessage = "User or Password not valid";
            DbUser.findOne({ email: _user.email }, (error, user) => {
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

                        const jwtUtil = new JwtUtil();
                        const token = jwtUtil.generate(user._id, user.email);

                        message.data = [{
                            token: token
                        }];

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