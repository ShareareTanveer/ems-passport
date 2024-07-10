import { Permission } from "../entities/user/permission.entity";
import { User } from "../entities/user/user.entity";

export interface ICreateRole {
    name: string;
    users?: User[];
    permissions?: Permission[];
  }
  
export interface IUpdateRole {
    name?: string;
    users?: User[];
    permissions?: Permission[];
  }
  