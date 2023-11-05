import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {CategoryModel} from "@src/services/category/category.model";
const url = endpoints.categories;

// http://10.10.66.115:3000/api/category/category
export default class CategoryService extends BaseService<CategoryModel> {
    constructor() {
        super(url);
    }

    public async fetchCategory() {
        const {data} = await http.get<CategoryModel>(`${url}/category`);
        return data;
    }


}
