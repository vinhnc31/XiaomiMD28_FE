import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { HistoryOrderModel } from './history.model';
import { GetOrderModel } from '../order/oder.model';
const url = endpoints.order;
export default class HistoryOrderService extends BaseService<HistoryOrderModel> {
    constructor() {
        super(url.default);
    }
    public async getOrder(id:number,status:string) {
        const {data} = await http.get<GetOrderModel>(`${url.getOrder}/listOrder?AccountId=${id}&status=${status}`);
        return data;
    }

}