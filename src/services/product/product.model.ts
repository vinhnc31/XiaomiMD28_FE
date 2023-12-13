export interface ProductModel {
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    images: string,
    CategoryId: number,
    commentCount: number,
    averageRating: string,
    createdAt: Date, // Sửa kiểu dữ liệu thành Date
    updatedAt: Date, // Sửa kiểu dữ liệu thành Date
}

export interface ProductDetailModel {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string;
  CategoryId: number;
  commentCount: number;
  averageRating: string;
  comments: [
    {
      images: string;
      id: number;
      commentBody: string;
      star: number;
      AccountId: number;
      productId: number;
    },
  ];
  colorProducts: [
    Array<{
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
    }>,
  ];
  createdAt: Date; // Sửa kiểu dữ liệu thành Date
  updatedAt: Date; // Sửa kiểu dữ liệu thành Date
}

export interface CommentProductId {
  images: string;
  id: number;
  commentBody: string;
  star: number;
  createdAt: Date;
  updatedAt: Date;
  AccountId: number;
  productId: number;
  Account: {
    id: number;
    avatar: string;
    name: string;
  }
}