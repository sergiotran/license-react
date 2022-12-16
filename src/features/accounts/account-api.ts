import { Account } from "@/features/accounts/account-model";
import { coreHttp } from "@/app/axios";

export interface GetAccountListResponse {
  items: Account[];
  max_page: number;
  total_count: number;
  page: number;
  limit: number;
}

export function getAccounts(page: number, limit: number, merchant_id: string) {
  return new Promise((resolve, reject) => {
    coreHttp
      .get<GetAccountListResponse>(
        `/accounts?page=${page}&limit=${limit}&merchant_id=${merchant_id}`
      )
      .then((res) => {
        resolve(res.data.items);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getAccount(id: string) {
  return new Promise((resolve, reject) => {
    coreHttp
      .get<Account>(`/accounts/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateAccount(id: string, payload: Partial<Account>) {
  return new Promise((resolve, reject) => {
    coreHttp
      .put<Account>(`/accounts/${id}`, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
