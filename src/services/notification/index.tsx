import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import { NotificationModel } from './notification.model';
const url = endpoints.notification;
export default class NotificationService extends BaseService<NotificationModel> {
    constructor() {
        super(url.default);
    }
    public async getNotification(AccountId: number) {
        const {data} = await http.get<NotificationModel>(`${url.getNotification}/${AccountId}`);
        return data;
    }

}