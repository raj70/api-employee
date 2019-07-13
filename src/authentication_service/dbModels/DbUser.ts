import { Schema, Document, Model, model } from "mongoose";
import IUser from "../models/IUser";
import bcrypt from 'bcrypt-nodejs';


export interface IDbUser extends IUser, Document {

}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        unique: true,
    },
    roles: {
        required: true,
        type: [String] /* roles Id NOT role itself */
    }
});

userSchema.set('timestamps', true);

userSchema.pre<IDbUser>("save", function (next) {
    const unsafepassword = this.password;
    this.password = bcrypt.hashSync(unsafepassword);
    next();
});

const DbUser: Model<IDbUser> = model<IDbUser>("DbUser", userSchema);

export default DbUser;