import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {FavoriteModel} from "@src/services/favorite/favorite.model";
const url = endpoints.favorites;

// http://192.168.1.82:3000/api/favorites/
export default class FavoriteService extends BaseService<FavoriteModel> {
    constructor() {
        super(url.default);
    }

    public async fetchFavorite(accountId: number) {
        const {data} = await http.get<FavoriteModel>(`${url.default}/${accountId}`);
        return data;
    }


}