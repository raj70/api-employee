import { Message } from "../models/Message";

export interface IController<T> {
    add(model: T): Message;
    delete(id: Number): Message;
    get(id: Number): Message;
    getAll(): Message;
    update(id: Number, model: T): Message;
}