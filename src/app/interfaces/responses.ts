import { IProduct } from "./i-product";

export interface Responses {
    ok?:boolean;
    producto: IProduct;
    error?:string;
}

export interface Responses {
    productos: IProduct[];
}
