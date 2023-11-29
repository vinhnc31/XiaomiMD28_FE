export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: string;
  CategoryId: number;
  createdAt: Date; // Sửa kiểu dữ liệu thành Date
  updatedAt: Date; // Sửa kiểu dữ liệu thành Date
}

export interface ProductDetailModel {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string;
  CategoryId: number;
  colorProducts: [
    {
      id: number;
      image: string;
      colorId: number;
      productId: number;
      Color: {
        id: number;
        nameColor: string;
      };
      colorConfigs: [
        {
          id: number;
          quantity: number;
          price: number;
          configId: number;
          ProductColorId: number;
          Config: {
            id: number;
            nameConfig: string;
          };
        },
      ];
    },
  ];
  createdAt: Date; // Sửa kiểu dữ liệu thành Date
  updatedAt: Date; // Sửa kiểu dữ liệu thành Date
}
