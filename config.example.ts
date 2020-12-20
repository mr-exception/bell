import { IApplicationConfig } from "./interfaces/config";
const config: IApplicationConfig[] = [
  // sparow application
  {
    name: "sparow",
    ips: ["::1", "95.81.78.23", "154.28.188.219"],
    auth_token: "test-auth-token",
    base_url: "http://localhost:5000/api",
  },
];

export default config;
