import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { GetOrderModel, OrderModel, Status, StatusOrder } from './oder.model';
const url = endpoints.order;
export default class OrderService extends BaseService<OrderModel> {
    constructor() {
        super(url.default);
    }

    public async postOrder(body:OrderModel) {
        const {data} = await http.post<OrderModel>(`${url.postOrder}`,body);
        return data;
    }
    public async getOrder() {
        const {data} = await http.get<GetOrderModel>(url.getOrder);
        return data;
    }
    public async putOrder(id:number,body:Status) {
        const {data} = await http.put<Status>(`${url.getOrder}/${id}`,body);
        return data;
    }
    public async putEvaluate(id:number,body:StatusOrder) {
        const {data} = await http.put<StatusOrder>(`${url.getOrder}/statusOrder/${id}`,body);
        return data;
    }
}