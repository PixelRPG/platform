import { strapiConfig } from "./settings";
import { init } from "@pixelrpg/sdk";
init(strapiConfig.graphql.url.local, strapiConfig.url.remote, strapiConfig.auth.token);
export * from "@pixelrpg/sdk";