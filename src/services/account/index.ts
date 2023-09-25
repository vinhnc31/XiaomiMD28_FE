import {BaseService} from '@src/services/base.service';
import endpoints from '@src/services/config/endpoint';
import http from '@src/services/config/http';
import {
  IAccount,
  IChangePassReq,
  ICheckPhone,
  ILoginData,
  IPhoneOtpReq,
  IRegisterReq,
  IVerifyPhoneOtpReq,
} from './account.model';

const url = endpoints.account;
const urlAuth = endpoints.auth;
const urlPhoneOtp = endpoints.phoneOtp;
const urlOneSignal = endpoints.account_onsignal;
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

  public async sendOtp(payload: IPhoneOtpReq) {
    const {data} = await http.post<IAccount>(urlPhoneOtp.send, payload);
    console.log('dataOTP', data);
    return data;
  }

  public async verifyOtp(payload: IVerifyPhoneOtpReq) {
    const {data} = await http.post<IAccount>(urlPhoneOtp.verify, payload);
    return data;
  }

  public async register({dialCode, name, email, phone, files}: IRegisterReq) {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }
    if (email) {
      formData.append('email', email);
    }
    if (files) {
      formData.append('files', files);
    }
    formData.append('dialCode', dialCode);
    formData.append('phone', phone);
    const {data} = await http.post<IAccount>(urlAuth.register, formData);
    return data;
  }

  public async checkPhone({phone, dialCode}: ICheckPhone) {
    const res = await http.post<any>(urlAuth.checkPhone, {phone, dialCode});
    return res;
  }

  public override async update(id: string, obj: IAccount) {
    const {data} = await http.put<IAccount>(`${url}/update/${id}`, obj);
    return data;
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

  public async postOnesignal(playerId: string) {
    const {data} = await http.post<any>(urlOneSignal, {playerId});
    return data;
  }
}
