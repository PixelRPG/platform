import "dotenv/load.ts"; // Auto load .env file
import { AppSettings } from "alosaur/mod.ts";
import { ApiArea } from "./areas/backend/api/api.area.ts";
import { Log } from "./middlewares/log.middleware.ts";

/** Used for client side requests to strapi */
const STRAPI_REMOTE_URL = Deno.env.get("STRAPI_REMOTE_URL") ||
  `http://localhost:3002`;

/** Used for server side requests to strapi */
const STRAPI_LOCAL_URL = Deno.env.get("STRAPI_LOCAL_URL") ||
  `http://localhost:3002`;

const STRAPI_API_TOKEN = Deno.env.get("STRAPI_API_TOKEN") || "";

const STRAPI_GRAPHQL_PATH = Deno.env.get("STRAPI_GRAPHQL_PATH") || "/graphql";

export const appSettings: AppSettings = {
  areas: [ApiArea],
  middlewares: [Log],
};

export const strapiConfig = {
  url: {
    remote: STRAPI_REMOTE_URL,
    local: STRAPI_LOCAL_URL,
  },
  auth: {
    token: STRAPI_API_TOKEN,
  },
  graphql: {
    path: STRAPI_GRAPHQL_PATH,
    url: {
      remote: STRAPI_REMOTE_URL + STRAPI_GRAPHQL_PATH,
      local: STRAPI_LOCAL_URL + STRAPI_GRAPHQL_PATH,
    },
  },
};

export const templateVars = {
  env: {
    STRAPI_REMOTE_URL,
  },
};
