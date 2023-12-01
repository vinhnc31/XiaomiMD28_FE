import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {FavoriteModel, AddFavoriteModel} from "@src/services/favorite/favorite.model";
const url = endpoints.favorites;

export default class FavoriteService extends BaseService<FavoriteModel> {
    constructor() {
        super(url.default);
    }

    public async fetchFavorite(accountId: number) {
        const {data} = await http.get<FavoriteModel>(`${url.default}/${accountId}`);
        return data;
    }

    public async addFavorite(body: AddFavoriteModel) {
        const {data} = await http.post<FavoriteModel>(url.postfavorite, body);
        return data;
      }


}