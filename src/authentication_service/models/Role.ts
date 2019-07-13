import IRole from './IRole';

export enum EnumRoles { Admin, Manager, Employee }

export class Role implements IRole {
    /**
     * Id created form Db
     */
    userId!: string;
    name!: EnumRoles;
}