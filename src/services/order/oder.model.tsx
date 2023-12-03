export interface OrderModel {
  message: string;
  AccountId: number;
  AddressId: number;
  PayId: number;
  PromotionId:number;
  products: Product[];
}
export interface Product {
  quantity: number;
  productId: number;
  productColorId: number;
  productColorConfigId: number;
}
export interface GetOrderModel {
  id: number;
  message: string;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  AccountId: number;
  AddressId: number;
  PayId: number;
  PromotionId: number;
}
export interface Status{
  status:string
}