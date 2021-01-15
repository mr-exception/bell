import { IApplicationConfig } from "./interfaces/config";
const config: IApplicationConfig[] = process.env.CONFIGS.split("@").map(
  (conf) => {
    const parts = conf.split(",");
    return {
      name: parts[0],
      auth_token: parts[1],
      base_url: parts[2],
    };
  }
);
console.log(config);
export default config;
