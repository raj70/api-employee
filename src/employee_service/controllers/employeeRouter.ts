import express from 'express';

import { isAuthenticated } from '../auth/authMiddleware';
import { Employee } from '../models/Employee';
import { EmployeeController } from './employeeController';
import { Message } from '../models/Message';

export function setRouter(router: express.Router): void {
    router.get('/Employees', isAuthenticated, getEmployees);
    router.get('/Employee/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, getEmployeeById);
    router.post('/Employee', isAuthenticated, addEmployee); //create
    router.put('/Employee/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, updateEmployee); //update
    router.delete('/Employee/:id([a-zA-Z0-9]{24}$)/', isAuthenticated, deleteEmployee);
}

async function deleteEmployee(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new EmployeeController();
    let message = new Message();

    const employeeId = _req.params.id;
    if (!employeeId) {/* probable this will never happen */
        message.statusCode = 400;
        message.message = "not valid employee id";
        _res.status(400).send({
            message
        });
        return;
    }

    message = await controller.delete(employeeId);

    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Deleted Successful", message, _res);
    }
}

async function updateEmployee(_req: express.Request, _res: express.Response): Promise<void> {
    console.log("update employee");
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

    message = await controller.update(employeeId, createEmployee(_req));

    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Updated Successful", message, _res);
    }
}

async function addEmployee(_req: express.Request, _res: express.Response): Promise<void> {

    const controller = new EmployeeController();
    let message = new Message();

    console.log(_req.body);
    if (!_req.body) {
        message.statusCode = 400;
        message.message = "Please provide data";

        _res.status(400).send({
            message
        });
        return;
    }

    message = await controller.add(createEmployee(_req));

    console.log(message);
    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Added Successful", message, _res);
    }
}

/**
 * Get Employee by Id
 * @param _req 
 * @param _res 
 */
async function getEmployeeById(_req: express.Request, _res: express.Response): Promise<void> {
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

    message = await controller.get(employeeId);

    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Retrieved Successful", message, _res);
    }
}

/**
 * Get All Employes
 * @param _req 
 * @param _res 
 */
async function getEmployees(_req: express.Request, _res: express.Response): Promise<void> {
    const controller = new EmployeeController();
    let message = await controller.getAll();

    if (message.isError) {
        createResponse("Failed", message, _res);
    } else {
        createResponse("Retrieved Successful", message, _res);
    }
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