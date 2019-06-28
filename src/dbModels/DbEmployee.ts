//https://mongoosejs.com/docs/api.html#Model
//https://mongoosejs.com/docs/schematypes.html

import { Schema, Document, Model, model } from "mongoose";

export interface IEmployee extends Document {
    title: string;
    name: string;
    lastName: string;
    middleName: string;
    email: string;
    joinDate: Date;
    phone: Number;
    mobile_phone: Number;
    Dob: Date;

    fullName(): string
}

const employeeSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: String,
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    joinDate: Date,
    phone: Number,
    mobile_phone: Number,
    Dob: {
        type: Date,
        required: true
    },
});

employeeSchema.set("timestamps", true);

employeeSchema.methods.fullName = function (): string {
    return `${this.name} ${this.lastname}`;
}

employeeSchema.pre("save", next => {
    next();
});
//employeeSchema.virtual("fullName").get(() => `${this.name} ${this.lastname}`);

export const DbEmployee: Model<IEmployee> = model<IEmployee>("DbEmployee", employeeSchema);