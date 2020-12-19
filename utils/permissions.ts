import { IApplicationConfig } from "../interfaces/config";
import config from "../config";
import Axios from "axios";
export const checkAccess = (
  token: string,
  channel: string,
  applicationConfig: IApplicationConfig
): Promise<void> =>
  Axios.get("/broker/verify-token", {
    params: { channel },
    headers: { Authorization: "Bearer " + token },
    baseURL: applicationConfig.base_url,
  });

export const checkIp = (serverIp: string): IApplicationConfig | undefined =>
  config.find((cnf) => cnf.ips.find((ip) => ip === serverIp));
