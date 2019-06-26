export class Message {

    message: string = '';
    isError: boolean = false;
    data = [];
    statusCode: number = 200;

    /**
     *
     */
    constructor() {
    }

    getMessage(): string {
        return this.message;
    }

    stringfy(): string {
        return JSON.stringify(this);
    }
}