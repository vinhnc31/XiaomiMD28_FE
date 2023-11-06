import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {FavoriteModel} from "@src/services/favorite/favorite.model";
const url = endpoints.favorites;

// http://192.168.1.82:3000/api/favorite/
export default class FavoriteService extends BaseService<FavoriteModel> {
    constructor() {
        super(url);
    }

    public async fetchCategory() {
        const {data} = await http.get<FavoriteModel>(`${url}/favorite`);
        return data;
    }


}