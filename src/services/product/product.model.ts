export interface ProductModel {
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    images: string,
    CategoryId: number,
    createdAt: Date, // Sửa kiểu dữ liệu thành Date
    updatedAt: Date, // Sửa kiểu dữ liệu thành Date
}

export interface ProductDetailModel {
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    images: string[],
    CategoryId: number,
    createdAt: Date, // Sửa kiểu dữ liệu thành Date
    updatedAt: Date, // Sửa kiểu dữ liệu thành Date
}
