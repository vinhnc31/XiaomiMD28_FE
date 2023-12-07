export interface HistoryOrderModel {
  id: number;
  message: string;
  total: number;
  status: string;
  statusOrder: number;
  createdAt: string;
  updatedAt: string;
  AccountId: number;
  AddressId: number;
  PayId: number;
  PromotionId: number;
  OrdersProducts: Array<{
    id: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    OrderId: number;
    productId: number;
    ProductColorId: number;
    ProductColorConfigId: number;
    Product: {
      id: 1;
      name: string;
      price: number;
      description: string;
      images: string;
      createdAt: string;
      updatedAt: string;
      CategoryId: number;
    };
    productcolor: Array<{
      id: number;
      image: string;
      createdAt: string;
      updatedAt: string;
      colorId: number;
      productId: number;
    }>;
    ProductColorConfig: Array<{
      id: number;
      quantity: number;
      price: number;
      createdAt: string;
      updatedAt: string;
      configId: number;
      ProductColorId: number;
    }>;
  }>;
  Address: Array<{
    id: number;
    nameReceiver: string;
    phoneReceiver: string;
    note: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    AccountId: number;
  }>;
  Promotion: {
    id: number;
    name: string;
    image: string;
    discount: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  };
}
