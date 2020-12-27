import { IApplicationConfig } from "./interfaces/config";
const config: IApplicationConfig[] = [
  // sparow application
  {
    name: "sparow",
    auth_token: "test-auth-token",
    base_url: "http://core:5000/api",
  },
];

export default config;
