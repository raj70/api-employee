export class Message {

    message: string = '';
    isError: boolean = false;
    data = [] as object[];
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