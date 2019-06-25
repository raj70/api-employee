import express from 'express';

import { Employee } from "../models/Employee";
import { isNull } from 'util';

export default class EmployeeController {

    constructor() {
    }

    setRouter(router: express.Router): void {
        router.get('/Employees', this.getEmployeesAsync);
        router.get('/Employee/:id(\\d+)/', this.getEmployeeById);
        router.post('/AddEmployee', this.addEmployee);
        router.put('/UpdateEmployee/:id(\\d+)/', this.UpdateEmployee);
    }

    private async UpdateEmployee(_req: express.Request, _res: express.Response) {
        try {
            await this.validateData(_req);
        } catch (error) {
            _res.status(400).send(error);
        }

        //TODO: update db

        const employeeId = _req.params.id
        _res.status(200).send({ message: "update successful " + employeeId })
    }

    private async addEmployee(_req: express.Request, _res: express.Response) {
        try {
            await this.validateData(_req);
        } catch (error) {
            _res.status(400).send(error);
        }

        _res.status(200).send({ message: "add Employee " })
    }

    private getEmployeeById(_req: express.Request, _res: express.Response) {
        const employeeId = _req.params.id
        _res.status(200).send({ message: "one Employee " + employeeId })
    }

    private getEmployeesAsync(_req: express.Request, _res: express.Response): void {
        _res.status(200).send({ message: "All Employees" })
    }

    private async validateData(_req: express.Request) {
        if (isNull(_req.body)) {
            throw new Error("error: please include employee detail")
        }
        //create employee
        const employee = this.createEmployee(_req);
        //validate
        await this.validateEmployee(employee);
    }

    private createEmployee(_req: express.Request): Employee {
        var employee = new Employee("", "");


        //TODO: create employee

        return employee;
    }

    private async validateEmployee(employee: Employee) {
        const validateError = await employee.validation();
        if (validateError.length > 0) {
            const errors = validateError.map(error => {
                let e = {
                    property: '', value: ''
                };
                e.property = error.property;
                e.value = error.value;
                return e;
            })
            throw new Error(`Validation Error ${errors}`);
        }
    }
}