import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {IAccount, IChangePassReq, ILoginData, IRegisterData} from './account.model';
const url = endpoints.account;
export default class AccountService extends BaseService<IAccount> {
  constructor() {
    super(url.default);
  }

  public async logIn(body: ILoginData) {
    const {data} = await http.post<IAccount>(url.login, body);
    return data;
  }

  public async register(body: IRegisterData) {
    const {data} = await http.post<IAccount>(url.register, body);
    return data;
  }

  public async logOut() {
    await http.post(url.logout);
  }

  public async changePass(id: string, obj: IChangePassReq) {
    const {data} = await http.put<IAccount>(`${url}/changePassword`, obj);
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
