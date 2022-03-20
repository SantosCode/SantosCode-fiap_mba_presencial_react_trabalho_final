export interface FetchProductsRequest {
  token: string;
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc"
  search?: string;
}