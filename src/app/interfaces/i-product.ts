export interface IProduct {
  id?:number;
  title:string;
  description:string;
  stock:number;
  price:number;
  image:string;
  userId:number;
  categoryId:number;
  created_at?: Date;
}
