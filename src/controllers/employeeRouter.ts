import express from 'express';

import { isAuthenticated } from '../auth/authMiddleware';
import { Employee } from '../models/Employee';
import { EmployeeController } from './employeeController';
import { Message } from '../models/Message';

export function setRouter(router: express.Router): void {
    router.get('/Employees', getEmployees);
    router.get('/Employee/:id(\\d+)/', getEmployeeById);
    router.post('/Employee', addEmployee); //create
    router.put('/Employee/:id(\\d+)/', updateEmployee); //update
    router.delete('/Employee/:id(\\d+)/', isAuthenticated, deleteEmployee);
}

function deleteEmployee(_req: express.Request, _res: express.Response): void {
    const controller = new EmployeeController();
    let message = new Message();

    const employeeId = _req.params.id;
    if (!employeeId) {
        message.statusCode = 400;
        message.message = "not valid employee id";
        _res.status(400).send({
            message
        });
        return;
    }

    message = controller.delete(employeeId);
    createResponse("Deleted Successful: " + employeeId, message, _res);
}

function updateEmployee(_req: express.Request, _res: express.Response): void {
    const controller = new EmployeeController();
    let message = new Message();

    const employeeId = _req.params.id;

    if (!employeeId) {
        message.statusCode = 400;
        message.message = "not valid employee id";
        _res.status(400).send({
            message
        });
        return;
    }

    if (!_req.body) {
        message.statusCode = 400;
        message.message = "Please provide data";
        _res.status(400).send({
            message
        });
        return;
    }

    message = controller.update(employeeId, createEmployee(_req));

    createResponse("Updated Successful: " + employeeId, message, _res);
}

async function addEmployee(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new EmployeeController();
    let message = new Message();

    if (!_req.body) {
        message.statusCode = 400;
        message.message = "Please provide data";

        _res.status(400).send({
            message
        });
        return;
    }

    message = await controller.add(createEmployee(_req));
    // const result = controller.add(createEmployee(_req));
    // result.then(message => {
    //     createResponse("Added Successful", message, _res);
    // });

    // result.catch(reason => {
    //     message = reason;
    //     //console.log("Fail: Add ", reason);
    //     createResponse("Fail", message, _res);
    // });

    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Added Successful", message, _res);
    }
}

function getEmployeeById(_req: express.Request, _res: express.Response): void {
    const controller = new EmployeeController();
    let message = new Message();

    const employeeId = _req.params.id;

    if (!employeeId) {
        message.statusCode = 400;
        message.message = "not valid employee id";
        _res.status(400).send({
            message
        });
        return;
    }

    message = controller.get(employeeId);
    createResponse("Retrieve Successful", message, _res);
}

function getEmployees(_req: express.Request, _res: express.Response): void {
    const controller = new EmployeeController();
    let message = controller.getAll();
    createResponse("Retrieve Successful", message, _res);
}

function createEmployee(_req: express.Request): Employee {
    const employee = new Employee();
    employee.title = _req.body.title;
    employee.name = _req.body.name;
    employee.lastName = _req.body.lastName;
    employee.middleName = _req.body.middleName;
    employee.email = _req.body.email;
    employee.phone = _req.body.phone;
    employee.mobile_phone = _req.body.mobile_phone;
    employee.Dob = _req.body.dob;
    return employee;
}

function createResponse(successMessage: string, message: Message, _res: express.Response) {
    if (message.isError) {
        _res.status(message.statusCode).send(message);
    }
    else {
        message.message = successMessage;
        _res.status(200).send({
            message
        });
    }
}