import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { AddressModel ,postAddress, putAddress} from './address.model';
const url = endpoints.address;
export default class AddressService extends BaseService<AddressModel> {
    constructor() {
        super(url.default);
    }
    public async postAddress(body:postAddress) {
        const {data} = await http.post<AddressModel>(url.postAddress,body);
        return data;
    }
    public async fetchAddress(id:number) {
        const {data} = await http.get<AddressModel>(`${url.getAddress}/${id}`);
        return data;
    }
    public async putAddress(id:number, body:putAddress) {
        const {data} = await http.put<AddressModel>(`${url.putAddress}/${id}`,body);
        return data;
    }
    public async deleteAddress(id:number) {
        const {data} = await http.delete<AddressModel>(`${url.deleteAddress}/${id}`);
        return data;
    }

}