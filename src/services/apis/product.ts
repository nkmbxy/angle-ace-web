import { Response, get, post } from '@utils/axios';
import { ProductSearchParams, Products, SummaryParams, SummaryProfit, addStockParams } from '../../../typings/products';

export function getProducts(params: ProductSearchParams): Promise<Response<Products[]>> {
  return get<Products[]>('/products', { params });
}

export function getDetailProducts(id: number): Promise<Response<Products>> {
  return get<Products>(`/product/${id}`);
}

export function getDetailCustomer(id: number): Promise<Response<Products>> {
  return get<Products>(`/product/${id}`);
}

export function editProduct(id: number, params: FormData): Promise<Response<string>> {
  return post<string>(`/product/${id}`, params);
}

export function getProfitSummary(params: SummaryParams): Promise<Response<SummaryProfit[]>> {
  return get<SummaryProfit[]>('/profit-summary', { params });
}

export function createProduct(params: FormData): Promise<Response<string>> {
  return post<string>('/product', params);
}

export function addStockProduct(params: addStockParams[]): Promise<Response<string>> {
  return post<string>('/product-order', params);
}
