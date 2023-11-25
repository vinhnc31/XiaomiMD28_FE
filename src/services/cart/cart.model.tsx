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
  productcolor: Array<{
    id: number;
    image: string;
    createdAt: string;
    updatedAt: string;
    colorId: number;
    productId: number;
    Color: Array<{
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    }>;
  }>;
  ProductColorConfig: Array<{
    id: number;
    quantity: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    configId: number;
    ProductColorId: number;
    Config: Array<{
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    }>;
  }>;
}
export interface deleteItem {
  productId: number;
  AccountId: number;
  quantity: number;
  ProductColorId: number;
  ProductColorConfigId: number;
}
