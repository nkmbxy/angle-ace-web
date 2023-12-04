import { Response, post } from '@utils/axios';

export interface SignupParams {
  email: string;
  password: string;
  address: string;
  firstname: string;
  lastname: string;
  phone: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  token: string;
}

export function signup(params: SignupParams): Promise<Response<Signup>> {
  return post<Signup>('/signup', params);
}

export function login(params: LoginParams): Promise<Response<Signup>> {
  return post<Signup>('/login', params);
}
