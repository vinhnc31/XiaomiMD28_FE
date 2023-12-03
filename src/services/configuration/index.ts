import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {ConfigurationModel} from "@src/services/configuration/configuration.model";
const url = endpoints.configuration;

// http://10.10.66.115:3000/api/category/category
export default class ConfigurationService extends BaseService<ConfigurationModel> {
    constructor() {
        super(url.default);
    }

    public async fetchConfiguration() {
        const {data} = await http.get<ConfigurationModel>(url.getConfiguration);
        return data;
    }


}
