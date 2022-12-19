import { Account } from "@/features/accounts/account-model";
import { coreHttp } from "@/app/axios";
import { FilterData } from "../users/user-slice";

export interface GetAccountListResponse {
  items: Account[];
  max_page: number;
  total_count: number;
  page: number;
  limit: number;
}

export function getAccounts(
  page: number,
  limit: number,
  merchant_id: string,
  filterData: FilterData
) {
  return new Promise((resolve, reject) => {
    const filterParam = new URLSearchParams(Object.entries({ ...filterData }).reduce(
      (total: Record<string, string>, [key, value]) => {
        if (value.length > 0) {
          total[key] = value;
        }
        return total;
      },
      {}
    )).toString();

    coreHttp
      .get<GetAccountListResponse>(
        `/accounts?page=${page}&limit=${limit}&merchant_id=${merchant_id}${filterParam.length > 0 ? `&${filterParam}` : ''}`
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
