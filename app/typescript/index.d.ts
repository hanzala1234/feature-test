import { CoreApiToken } from "../../shared/typescript";

export interface FeatureConfig {
  id: string,
  version: string,
  name: string,
  description: string,
  route: string,
  dbCredentials: {
    user: string,
    password: string,
    server: string,
    dbName: string,
  }
  coreApiCredentials: {
    user: string,
    password: string,
  }
}

export type CoreApiTokens = Record<string, CoreApiToken>