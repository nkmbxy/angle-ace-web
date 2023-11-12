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
  sellPrice: number;
  cost: number;
  amount: number;
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

export interface addStockParams {
  product_id: number;
  cost: number;
  sellPrice: number;
  amountS: number;
  amountM: number;
  amountL: number;
  amountXL: number;
}

export interface stockParams {
  product_id: number;
  name: string;
  amount: number;
  cost: number;
  profit: number;
}

export interface summaryParams {
  startDate?: string;
  endDate?: string;
}

export function getProducts(params: ProductSearchParams): Promise<Response<Products[]>> {
  return get<Products[]>('/products', { params });
}

export function editProduct(product_id: number, params: ProductCreateParams): Promise<Response<string>> {
  return post<string>(`/product/${product_id}`, params);
}

export function getProfitSummary(params: summaryParams): Promise<Response<Products[]>> {
  return get<Products[]>('/summary', { params });
}

export function createProduct(params: FormData): Promise<Response<string>> {
  return post<string>('/product', params);
}

export function addStockProduct(params: addStockParams[]): Promise<Response<string>> {
  return post<string>('/product-order', params);
}
