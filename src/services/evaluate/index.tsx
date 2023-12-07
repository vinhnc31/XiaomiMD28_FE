import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { GetOrderModel } from '../order/oder.model';
import { EvaluateModel } from './evaluate.model';
const url = endpoints.evaluate;
export default class EvaluateService extends BaseService<EvaluateModel> {
    constructor() {
        super(url.default);
    }
    public async postEvaluate(body:EvaluateModel) {
        const {data} = await http.post<EvaluateModel>(url.getEvaluate,body);
        return data;
    }
    public async getEvaluate(id:number) {
        const {data} = await http.get<EvaluateModel>(`${url.getEvaluate}/${id}`);
        return data;
    }
    

}