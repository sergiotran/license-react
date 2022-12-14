import { Account } from '@/features/accounts/account-model';
import { coreHttp } from '@/app/axios';

export function getAccount(id: string) {
  return new Promise((resolve, reject) => {
    coreHttp.get<Account>(`/accounts/${id}`).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  })
}

export function updateAccount(id: string, payload: Partial<Account>) {
  return new Promise((resolve, reject) => {
    coreHttp.put<Account>(`/accounts/${id}`, payload).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  })
}