export interface CartModel {
  id: number;
  quantity: number;
  AccountId: number;
  productId: number;
  ProductColorId: number;
  ProductColorConfigId: number;
  Product: Array<{
    id: number;
    name: string;
    price: number;
    description: string;
    images: string;
    CategoryId: number;
  }>;
}
export interface deleteItem {
  productId: number;
  AccountId: number;
  quantity: number;
  ProductColorId: number;
  ProductColorConfigId: number;
}