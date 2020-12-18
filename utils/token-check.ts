import { IApplicationConfig } from "../interfaces/config";
import config from "../config";
export const checkToken = (token:string): boolean => {
    return token === "1234";
}

export const checkIp = (serverIp:string): IApplicationConfig | undefined =>  
    config.find(cnf => cnf.ips.find(ip => ip === serverIp))