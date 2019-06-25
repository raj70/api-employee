import { validate, IsInt, Length, IsEmail, IsDate, Min, Max } from 'class-validator';

export class Employee {
    @Length(3, 10)
    title: string;

    name: string;
    lastName: string;
    middleName: string;

    @IsEmail()
    email!: string;
    @IsDate()
    joinDate: Date = new Date();

    @IsInt()
    @Min(8)
    @Max(10)
    phone!: number;

    @IsInt()
    @Min(8)
    @Max(10)
    mobile_phone!: number;

    constructor(name: string, lastName: string) {
        this.title = "Mr.";
        this.name = name;
        this.middleName = "";
        this.lastName = lastName;
        this.joinDate = new Date();
    }

    validation() {
        return validate(this);
    }

    fullName() {
        return `${this.name} ${this.lastName}`;
    }
}