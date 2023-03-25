import { IProduct } from "./i-product";
import { IUser } from "./i-user";

export interface Email {
  user: IUser,
  products: IProduct[],
  total: number
}
