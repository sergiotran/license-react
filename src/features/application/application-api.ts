import { coreHttp } from '@/app/axios';
import { Application } from './application-model';

export interface GetApplicationResponse {
  items: Application[];
  max_page: number;
  total_count: number;
  page: number;
  limit: number;
}

export function getApplications() {
  return new Promise((resolve, reject) => {
    coreHttp.get<GetApplicationResponse>(`/applications?page=1&limit=50`).then((res) => {
      resolve(res.data.items);
    }).catch((err) => {
      reject(err);
    })
  })
}