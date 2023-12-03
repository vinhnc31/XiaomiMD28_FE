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
    await http.get(url.logout);
  }

  public async changePass(id: number, obj: IChangePassReq) {
    const {data} = await http.post<IAccount>(`${url.default}/changePassword/${id}`, obj);
    return data;
  }

  public async updateProfile(id:number,obj: FormData) {
    const {data} = await http.put<IAccount>(`${url.default}/updateProfile/${id}`, obj);
    return data;
  }

  public async fetchProfile() {
    const {data} = await http.get<IAccount>(`${url.default}/profile`);
    return data;
  }

  public async fogotpass(params: any) {
    const {data} = await http.post<IAccount>(`${url.default}/forgotPassword`, params);
    return data;
  }

  public async loginGoogle(id_token:string) {
    const {data} = await http.post<IAccount>(`${url.default}/login-google`, {id_token});
    return data;
  }
}
