export class Employee {
    private name: string;
    private lastName: string;
    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
    }

    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    fullName() {
        return `${this.name} ${this.lastName}`;
    }
}