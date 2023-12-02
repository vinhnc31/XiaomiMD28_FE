import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { PayModel } from './pay.mode';
const url = endpoints.pay;
export default class PayService extends BaseService<PayModel> {
    constructor() {
        super(url.default);
    }
    public async postPay(body:PayModel) {
        const {data} = await http.post<PayModel>(`${url.postPay}`,body);
        return data;
    }

}