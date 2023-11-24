import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {ProductModel} from '@src/services/product/product.model';
const url = endpoints.product;

export default class ProductService extends BaseService<ProductModel> {
    constructor() {
        super(url);
    }

    public async getProduct() {
        const {data} = await http.get<ProductModel>(`${url}/product`);
        return data;
    }

    public async getProductByIdCategory(categoryId: number) {
        const { data } = await http.get<ProductModel>(`${url}/product/${categoryId}`);
        return data;
    }
    


}