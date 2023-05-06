export interface Product {
  _id: any;
  name: string;
  category: string;
}

export interface ResponseData {
  found: Product[];
  suggested: Product[];
}
