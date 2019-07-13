import IUser from './IUser';

export class User implements IUser {
    email!: string;
    password!: string;
    roles!: string[];
    /**
     *
     */
    constructor() {
        this.roles = [];
    }
}