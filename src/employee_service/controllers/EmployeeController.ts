import { Employee } from "../models/Employee";
import { IController } from './iController';
import { Message } from '../../models/Message';
import DbEmployee, { IDbEmployee } from '../dbModels/DbEmployee';
import IEmployee from "../models/IEmployee";
export class EmployeeController implements IController<Employee>{

    constructor() {

    }

    async add(employee: Employee): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            //validate
            let validMesssage = employee.validate();
            if (validMesssage.length > 0) {
                message.isError = true;
                message.statusCode = 400;
                message.message = validMesssage;
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

                    console.log(error);
                    if (error) {
                        message.isError = true;
                        if (error.code === 11000) {
                            message.statusCode = 400;
                            message.message = "Duplicate Email Address";
                        } else {
                            message.statusCode = 500;
                            message.message = error.message;
                        }
                        reject(message);
                    }
                    else {
                        resolve(message);
                    }
                });

            }
        }).catch((reason) => {
            return reason;
        });
    }

    async delete(id: Number): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            message.statusCode = 200;
            message.message = "Deleted";

            await DbEmployee.findOneAndDelete({ _id: id }, (error, employee) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Error " + error.message;
                    reject(message);
                } else if (!employee) {
                    if (error) {
                        message.isError = true;
                        message.statusCode = 400;
                        message.message = "Not found Error: " + error.message;
                        reject(message);
                    }
                }
            }).catch(error => reject(error));
            resolve(message);
        }).catch(reason => {
            return reason;
        });
    }

    async get(id: Number): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            message.statusCode = 200;
            message.message = "Retrieved";

            await DbEmployee.findOne({ _id: id }, (error, employee) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Error " + error.message;
                    reject(message);
                } else if (!employee) {
                    if (error) {
                        message.isError = true;
                        message.statusCode = 400;
                        message.message = "Not found Error: " + error.message;
                        reject(message);
                    }
                }
                else {
                    const emp = this.createEmployee(employee);
                    message.data = [emp];
                }
            }).catch(error => reject(error));
            resolve(message);
        }).catch(reason => {
            return reason;
        });
    }

    async getAll(): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            message.statusCode = 200;
            message.message = "Retrieved";

            await DbEmployee.find({}, (error, employees) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Error " + error.message;
                    reject(message);
                } else if (!employees) {
                    if (error) {
                        message.isError = true;
                        message.statusCode = 400;
                        message.message = "Not found Error: " + error.message;
                        reject(message);
                    }
                }
                else {
                    const emps = employees.map(x => this.createEmployee(x));
                    message.data = [...emps];
                }
            }).catch(error => reject(error));
            resolve(message);
        }).catch(reason => {
            return reason;
        });
    }

    async update(id: number, model: IEmployee): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
            let message = new Message();
            message.statusCode = 200;
            message.message = "Updated ";
            DbEmployee.findOneAndUpdate({ _id: id, email: model.email }, model, { new: true }, (error, employee) => {
                if (error) {
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Error " + error.message;
                    reject(message);
                }
                else if (!employee) {
                    console.log(employee, error);
                    message.isError = true;
                    message.statusCode = 400;
                    message.message = "Cannot edit email address";
                    reject(message);
                }
                else {
                    console.log(employee);
                    const emp = this.createEmployee(employee);
                    message.data = [emp];
                }
                resolve(message);
            });
        }).catch(reason => {
            return reason;
        });
    }

    private createEmployee(employee: IDbEmployee): IEmployee {
        const emp = new Employee();
        emp.Dob = employee.Dob;
        emp.email = employee.email;
        emp.joinDate = employee.joinDate;
        emp.lastName = employee.lastName;
        emp.middleName = employee.middleName;
        emp.mobile_phone = <number>employee.mobile_phone;
        emp.name = employee.name;
        emp.phone = <number>employee.phone;
        emp.title = employee.title;
        return emp;
    }
}
