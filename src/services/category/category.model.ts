export interface CategoryModel {
    // data(arg0: string, data: any): unknown;
    id: number,
    name: string,
    image: string,
    productCount: number,
    Products: Array<{ name: string }>,// Mảng các sản phẩm có một thuộc tính name
}
