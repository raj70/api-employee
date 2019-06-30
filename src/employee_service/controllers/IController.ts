import { Message } from "../models/Message";

export interface IController<T> {
    add(model: T): Promise<Message>;
    delete(id: Number): Promise<Message>;
    get(id: Number): Promise<Message>;
    getAll(): Promise<Message>;
    update(id: Number, model: T): Promise<Message>;
}