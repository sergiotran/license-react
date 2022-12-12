import { API_CORE_URL, AUTH_API_URL } from "@/common/constants/endpoints";
import axios from "axios";

const HTTP_TIMEOUT = 1000;
const HTTP_HEADERS = {
  "Content-Type": "application/json",
};

const authHttp = axios.create({
  baseURL: AUTH_API_URL,
  timeout: HTTP_TIMEOUT,
  headers: HTTP_HEADERS,
});

const coreHttp = axios.create({
  baseURL: API_CORE_URL,
  timeout: HTTP_TIMEOUT,
  headers: HTTP_HEADERS,
});

export { authHttp, coreHttp };
