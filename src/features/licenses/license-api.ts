import { coreHttp } from "@/app/axios";
import { License } from './license-mode';

export type GetLicenseResponse = {
  items: License[];
  max_page: number;
  total_count: number;
  page: number;
  limit: number;
};

export function getLicenses(): Promise<GetLicenseResponse> {
  return new Promise((resolve, reject) => {
    coreHttp
      .get<GetLicenseResponse>(`/licenses?page=1&limit=50`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
