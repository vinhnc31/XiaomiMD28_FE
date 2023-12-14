import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {ProductDetailModel, ProductModel} from '@src/services/product/product.model';
const url = endpoints.products;

export default class ProductService extends BaseService<ProductModel> {
  static getSearch(searchQuery: string) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    super(url.default);
  }

  public async getProduct() {
    const {data} = await http.get<ProductModel>(url.getAllProduct);
    return data;
  }

  public async getSearch(searchQuery: string) {
    const {data} = await http.get<ProductModel[]>(`${url.getAllProduct}?name=${encodeURIComponent(searchQuery)}`);
    return data;
  }

  // Thêm hàm mới để lấy sản phẩm theo giá
  public async getProductByPrice(minPrice: number, maxPrice: number, categoryId: number) {
    const { data } = await http.get<ProductModel[]>(`${url.getAllProduct}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}`);
    return data;
  }

  // get màu
  public async getProductByColor(color: string, categoryId: number) {
    const encodedColor = encodeURIComponent(color);
    const { data } = await http.get<ProductModel[]>(`${url.getAllProduct}/filter/Color?color=${encodedColor}&categoryId=${categoryId}`);
    return data;
  }

  public async getProductByConfig(config: string, categoryId: number) {
    const encodedConfig = encodeURIComponent(config);
    const { data } = await http.get<ProductModel[]>(`${url.getAllProduct}/filter/Config?config=${encodedConfig}&categoryId=${categoryId}`);
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

  public async getMostProduct() {
    const {data} = await http.get<ProductModel>(url.getMostProduct);
    return data;
  }

      public async getCommentProductId(productId: number) {
        const { data } = await http.get<ProductDetailModel>(`${url.getCommentProductId}/${productId}`);
        return data;
    }
    
}
