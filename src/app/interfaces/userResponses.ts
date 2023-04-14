import { IUser } from "./i-user";

export interface UserResponses {
    ok?:boolean;
    user: IUser;
    error?:string;
}

export interface UserResponses {
    users: IUser[];
}
