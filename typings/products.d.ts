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

export interface addStockRow {
  product_id: number;
  cost: number;
  sellPrice: number;
  name: string;
  amountS: number;
  amountM: number;
  amountL: number;
  amountXL: number;
}

export interface addStock {
  product_id: number;
  cost: number;
  sellPrice: number;
  amountS: number;
  amountM: number;
  amountL: number;
  amountXL: number;
}

export interface Stock {
  product_id: number;
  name: string;
  amount: number;
  cost: number;
  profit: number;
}
