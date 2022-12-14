import { coreHttp } from "../../app/axios";

export interface LoginPayload {
  merchant_id: string | null;
  store_id: string | null;
  username: string | null;
  password: string | null;
  token: string | null;
  pin_code: string | null;
  type: string | null;
  app_id: string | null;
  redirect_url: string | null;
}
export interface LoginResponse {
  account_id: string;
  access_token: string;
  refresh_token: string;
  jwt: string;
}

export function login(payload: Partial<LoginPayload>): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    coreHttp
      .post<LoginResponse>("/accounts/login", payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
