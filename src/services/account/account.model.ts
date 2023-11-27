export interface IAccount {
  id: number;
  name: string;
  phone: string;
  dialCode: string;
  email: string;
  type: ACCOUNT_TYPE;
  rank: any;
  status: string;
  updatedAt: string;
  createdAt: string;
  accessToken: string;
  refreshToken: string;
  avatar?: string;
  birthday?: string;
  password:string
}

export type AuthStatus = 'idle' | 'pending' | 'resolved' | 'rejected';

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface IChangePassReq {
  newPassword: string;
  reNewPassword: string;
}

export interface ICheckPhone {
  phone: string;
  dialCode: string;
}

export interface IRegisterReq {
  name: string;
  phone: string;
  email: string;
  dialCode: string;
  files: any[];
}

export interface IPhoneOtpReq {
  phone: string;
  dialCode: string;
  isLogin?: boolean;
}

export interface IVerifyPhoneOtpReq extends IPhoneOtpReq {
  code: string;
  deviceId?: string;
}

export interface ACCOUNT_TYPE {
  CUSTOMER: 'CUSTOMER';
}
