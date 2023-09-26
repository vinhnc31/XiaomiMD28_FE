import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {IAccount, IChangePassReq, ILoginData} from './account.model';
const url = endpoints.account;
const urlAuth = endpoints.auth;
export default class AccountService extends BaseService<IAccount> {
  constructor() {
    super(url);
  }

  public async logIn({phone}: ILoginData) {
    const {data} = await http.post<IAccount>(urlAuth.login, {phone});
    return data;
  }

  public async logOut() {
    await http.post(urlAuth.logout);
  }

  public async changePass(id: string, obj: IChangePassReq) {
    const {data} = await http.put<IAccount>(`${url}/change-pass/${id}`, obj);
    return data;
  }

  public async updateProfile(obj: FormData) {
    const {data} = await http.put<IAccount>(`${url}/profile`, obj);
    return data;
  }

  public async fetchProfile() {
    const {data} = await http.get<IAccount>(`${url}/profile`);
    return data;
  }
}
