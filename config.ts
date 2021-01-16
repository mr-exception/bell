import { IApplicationConfig } from "./interfaces/config";
const config: IApplicationConfig[] = (process.env.CONFIGS || "")
  .split("@")
  .map((conf) => {
    const parts = (conf || "").split(",");
    if (parts.length !== 3) return undefined;
    return {
      name: parts[0],
      auth_token: parts[1],
      base_url: parts[2],
    };
  })
  .filter((c) => c);
console.log(config);
export default config;
