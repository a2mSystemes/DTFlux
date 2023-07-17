import * as config from "../dtflux-conf/conf.json";
import axios, { Axios } from "axios";

export class DTFLuxHTTPRequesterService {
  
  
  async request(url: string, data?: any, opts?: any) {
    let resp = new Promise<void>((resolve, reject) => resolve(void 0));
    if (!opts) opts = { method: "GET" };
    if (opts && opts.method) {
      switch (opts.method) {
        case "GET":
          resp = axios
            .get(url);
          break;
        case "POST":
          resp = axios.post(url, data);
          break;
        case "DELETE":
          resp = axios.delete(url, data);
          break;
        case "PUT":
          resp = axios.put(url, data);
          break;
        case "PATCH":
          resp = axios.patch(url, data);
          break;
        default:
          break;
      }
    }
    return resp;
  }
}
