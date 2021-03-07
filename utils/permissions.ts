import { IApplicationConfig } from "../interfaces/config";
import config from "../config";
import Axios from "axios";
export const checkAccess = (
  token: string,
  channel: string,
  applicationConfig: IApplicationConfig
): Promise<void> => {
  return Axios.post(
    "/broker/verify-access",
    { channel },
    {
      headers: { Authorization: "Bearer " + token },
      baseURL: applicationConfig.base_url,
    }
  );
};

export const checkToken = (token: string): IApplicationConfig | undefined =>
  config.find((cnf) => cnf.auth_token === token);
