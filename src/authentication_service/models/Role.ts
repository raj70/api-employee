import IRole from './IRole';

export enum EnumRoles { Admin, Manager, Employee }

export class Role implements IRole {
    userId!: string;
    assignRole: [] = [];
}