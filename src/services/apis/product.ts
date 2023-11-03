import { Response, get, post } from '@utils/axios';

export interface ProductSearchParams {
  name?: string;
  type?: string;
  manufacturer?: string;
}

export interface ProductCreateParams {
  code: string;
  name: string;
  type: string;
  manufacturer: string;
  detail: string;
  size: string;
  sellPrice: string;
  cost: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Products {
  id: number;
  code: string;
  name: string;
  type: string;
  pathImage: string;
  amount: number;
  detail: string;
  size: string;
  sellPrice: number;
  cost: number;
  manufacturer: Manufacturer;
  createdAt: string;
  updatedAt: string;
}

export function getProducts(params: ProductSearchParams): Promise<Response<Products[]>> {
  return get<Products[]>('/products-admin', { params });
}

export function createProduct(params: FormData): Promise<Response<string>> {
  return post<string>('/product', params);
}