import { Schema, Document, Model, model } from "mongoose";
//import { EnumRoles } from "../models/Role";
import IRole from "../models/IRole";

export interface IDbRole extends IRole, Document {

}

const roleSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    assignRole: {
        type: [String],
        required: true,
        //enum: EnumRoles,
        //default: EnumRoles.Employee
    }
});

roleSchema.set('timestamps', true);

const DbRole: Model<IDbRole> = model<IDbRole>("DbRole", roleSchema);

export default DbRole;