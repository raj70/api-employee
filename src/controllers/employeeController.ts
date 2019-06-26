import { Employee } from "../models/Employee";
import { IController } from './iController';
import { Message } from '../models/Message';

export class EmployeeController implements IController<Employee>{

    constructor() {

    }

    add(employee: Employee): Message {
        //validate
        let validMesssage = employee.validate();

        console.log(employee, validMesssage);
        return new Message();
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
