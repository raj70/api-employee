//https://www.npmjs.com/package/ts.validator.fluent
//https://www.c-sharpcorner.com/article/ts-validator-typescript-based-generic-validation-framework/

import { IValidator, ValidationResult, Validator } from 'ts.validator.fluent/dist';
import IEmployee from '../models/IEmployee'

export class Employee implements IEmployee {
    title: string;
    name: string;
    lastName: string;
    middleName: string;
    email!: string;
    joinDate: Date = new Date();
    phone!: number;
    mobile_phone!: number;
    Dob!: Date;

    constructor() {
        this.title = "Mr";
        this.name = "";
        this.middleName = "";
        this.lastName = "";
        this.joinDate = new Date();
    }

    fullName() {
        return `${this.name} ${this.lastName}`;
    }

    private validateNullValue(validator: IValidator<Employee>): ValidationResult {
        let nullMessage = "Should not be null";
        return validator
            .NotNull(m => m.title, nullMessage, "Employee.name.Null")
            .NotNull(m => m.lastName, nullMessage, "Employee.lastName.Null")
            .NotNull(m => m.name, nullMessage, "Employee.name.Null")
            .NotNull(m => m.email, nullMessage, "Employee.email.null").ToResult();
    }


    private validateEmptyValue(validator: IValidator<Employee>): ValidationResult {
        let emptyMessage = "Should not empty";
        return validator
            .NotEmpty(m => m.title, emptyMessage, "Emplyee.name.Empty")
            .NotEmpty(m => m.name, emptyMessage, "Employee.name.Empty")
            .NotEmpty(m => m.lastName, emptyMessage, "Employee.lastName.Empty")
            .NotEmpty(m => m.name, emptyMessage, "Employee.name.Empty")
            .NotEmpty(m => m.email, emptyMessage, "Employee.email.Empty").ToResult();
    }

    private validateIsEmail(validator: IValidator<Employee>): ValidationResult {

        return validator.Email(x => x.email, "Not a valid email", "Employee.email.Not_Valid").ToResult();
    }

    private validateDob(validator: IValidator<Employee>): ValidationResult {

        return validator
            .NotNull(x => x.Dob, "Not a valid Dob", "Employee.Dob.NotValid")
            .ToResult();
    }

    private validatePhone(validator: IValidator<Employee>): ValidationResult {

        return validator
            .If(x => x.phone === undefined,
                validator => validator
                    .NotNull(x => x.mobile_phone, "Mobile number cannot be null", "Employee.Mobile.IsNull")
                    .If(x => x.mobile_phone !== undefined,
                        validator => validator.Matches(x => x.mobile_phone.toString(), "^[0-9]{8,10}$", "Not a valid number", "Employee.mobile_phone.Not_Valid").ToResult())
                    .ToResult())
            .If(x => x.mobile_phone === undefined,
                validator => validator
                    .NotNull(x => x.phone, "Mobile or phone is required", "Employee.phone.IsNull")
                    .If(x => x.phone !== undefined,
                        validator => validator.Matches(x => x.phone.toString(), "^[0-9]{8,10}$", "Not a valid number", "Employee.phone.Not_Valid").ToResult())
                    .ToResult())
            .ToResult();
    }

    validate(): string {
        let error: string = '';
        let resultNullValue = new Validator(this).Validate(this.validateNullValue);
        let resultEmptyValue = new Validator(this).Validate(this.validateEmptyValue);
        let resultEmailValue = new Validator(this).Validate(this.validateIsEmail);
        let resultPhoneValue = new Validator(this).Validate(this.validatePhone);
        let resultDobValue = new Validator(this).Validate(this.validateDob);

        if (!resultNullValue.IsValid
            || !resultEmptyValue.IsValid
            || !resultEmailValue.IsValid
            || !resultPhoneValue.IsValid
            || !resultDobValue.IsValid) {

            resultNullValue.Errors.forEach(x =>
                error += `Error: ${x.Identifier}-${x.Value}: ${x.Message} \n`
            );

            resultEmptyValue.Errors.forEach(x =>
                error += `Error: ${x.Identifier}-${x.Value}: ${x.Message} \n`
            );

            resultEmailValue.Errors.forEach(x =>
                error += `Error: ${x.Identifier}-${x.Value}: ${x.Message} \n`
            );

            resultPhoneValue.Errors.forEach(x =>
                error += `Error: ${x.Identifier}-${x.Value}: ${x.Message} \n`
            );

            resultDobValue.Errors.forEach(x =>
                error += `Error: ${x.Identifier}-${x.Value}: ${x.Message} \n`
            );
        }
        return error;
    }
}
