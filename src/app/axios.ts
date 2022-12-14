import { API_CORE_URL } from "@/common/constants/endpoints";
import axios from "axios";

const HTTP_TIMEOUT = 3000;
const HTTP_HEADERS = {
  "Content-Type": "application/json",
};

const coreHttp = axios.create({
  baseURL: API_CORE_URL,
  timeout: HTTP_TIMEOUT,
  headers: HTTP_HEADERS,
});

export { coreHttp };
