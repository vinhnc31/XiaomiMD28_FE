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

