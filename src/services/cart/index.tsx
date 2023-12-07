import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {CartModel, deleteItem, putItem, postItemCart} from "@src/services/cart/cart.model";
const url = endpoints.cart;
export default class CartService extends BaseService<CartModel> {
    constructor() {
        super(url.default);
    }

    public async fetchCart(id:number) {
        const {data} = await http.get<CartModel>(`${url.getCart}/${id}`);
        return data;
    }
    public async putCart(id:number, body:putItem) {
        const {data} = await http.put<CartModel>(`${url.putCart}/${id}`,body);
        return data;
    }
    public async deleteCart(id:number) {
        const {data} = await http.delete<CartModel>(`${url.deleteCart}/${id}`);
        return data;
    }


    public async postCart(body: postItemCart) {
        const {data} = await http.post<CartModel>(`${url.postCart}`,body);
        return data;
    }

}