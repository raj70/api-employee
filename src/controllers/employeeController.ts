import { Employee } from "../models/Employee";
import { IController } from './iController';
import { Message } from '../models/Message';
import { DbEmployee } from '../dbModels/DbEmployee';

export class EmployeeController implements IController<Employee>{

    constructor() {

    }

    async add(employee: Employee): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            //validate
            let validMesssage = employee.validate();
            if (validMesssage.length > 0) {
                message.statusCode = 400;
                message.message = validMesssage;
                console.log(employee, validMesssage);
                reject(message);
            } else {
                //add to Db
                const dbEmployee = new DbEmployee();
                dbEmployee.title = employee.title;
                dbEmployee.name = employee.name;
                dbEmployee.middleName = employee.middleName;
                dbEmployee.lastName = employee.lastName;
                dbEmployee.email = employee.email;
                dbEmployee.phone = employee.phone;
                dbEmployee.mobile_phone = employee.mobile_phone;
                dbEmployee.Dob = employee.Dob;

                await dbEmployee.save(error => {
                    if (error) {
                        message.isError = true;
                        message.statusCode = 500;
                        message.message = error.message;
                        //console.log("error encoutered while saving :", error.message);
                        reject(message);
                    }
                });
            }
            resolve(message);
        }).catch((reason) => {
            return reason;
        });
    }

    delete(id: Number): Message {
        console.log(id);
        return new Message();
    }

    get(id: Number): Message {
        console.log(id);
        return new Message();
    }

    getAll(): Message {
        const message = new Message();
        message.data = [];
        return new Message();
    }

    update(id: number, model: Employee): Message {
        console.log(id, model);
        return new Message();
    }


}
