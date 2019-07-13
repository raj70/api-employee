import { Schema, Document, Model, model } from "mongoose";
//import { EnumRoles } from "../models/Role";
import IRole from "../models/IRole";
import { EnumRoles } from "../models/Role";

export interface IDbRole extends IRole, Document {

}

const roleSchema: Schema = new Schema({
    name: {
        type: String,
        enum: Object.values(EnumRoles),
        required: true,
        unique: true,
        //enum: EnumRoles,
        //default: EnumRoles.Employee
    }
});

roleSchema.set('timestamps', true);


const DbRole: Model<IDbRole> = model<IDbRole>("DbRole", roleSchema);

export default DbRole;