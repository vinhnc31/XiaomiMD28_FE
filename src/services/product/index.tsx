import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {ProductDetailModel, ProductModel} from '@src/services/product/product.model';
const url = endpoints.products;

export default class ProductService extends BaseService<ProductModel> {
    constructor() {
        super(url.default);
    }

    public async getProduct() {
        const {data} = await http.get<ProductModel>(url.getProduct);
        return data;
    }

    public async getProductByIdCategory(categoryId: number) {
        const { data } = await http.get<ProductModel>(`${url.getProductByIdCategory}/${categoryId}`);
        return data;
    }

    public async getProductId(productId: number) {
        const { data } = await http.get<ProductDetailModel>(`${url.getProductId}/${productId}`);
        return data;
    }
    
}
