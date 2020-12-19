import { IApplicationConfig } from "../interfaces/config";
import config from "../config";
import Axios from "axios";
export const checkToken = (
  token: string,
  applicationConfig: IApplicationConfig
): Promise<void> =>
  Axios.get("/broker/verify-token", {
    headers: { Authorization: token },
    baseURL: applicationConfig.base_url,
  });

export const checkIp = (serverIp: string): IApplicationConfig | undefined =>
  config.find((cnf) => cnf.ips.find((ip) => ip === serverIp));
