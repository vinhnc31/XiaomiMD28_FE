import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { VoucherModel } from './voucher.model';
const url = endpoints.voucher;

export default class VouCherService extends BaseService<VoucherModel> {
    constructor() {
        super(url.default);
    }
    public async getVoucher() {
        const {data} = await http.get<VoucherModel>(url.getPromotion);
        return data;
    }
}