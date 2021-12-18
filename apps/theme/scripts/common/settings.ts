// Defined by webpack DefinePlugin
declare let STRAPI_REMOTE_URL: string;
declare let STRAPI_LOCAL_URL: string;
declare let STRAPI_API_TOKEN: string;
declare let STRAPI_GRAPHQL_PATH: string;


/** Used for client side requests to strapi */
const strapiRemoteUrl = STRAPI_REMOTE_URL || "https://strapi.pixelrpg.org";

/** Used for server side requests to strapi */
const strapiLocalUrl = STRAPI_LOCAL_URL || "http://localhost:3102";

const strapiApiToken = STRAPI_API_TOKEN || "";

const strapiGrapqlPath = STRAPI_GRAPHQL_PATH || "/graphql";

export const strapiConfig = {
    url: {
      remote: strapiRemoteUrl,
      local: strapiLocalUrl,
    },
    auth: {
      token: strapiApiToken,
    },
    graphql: {
      path: strapiGrapqlPath,
      url: {
        remote: strapiRemoteUrl + strapiGrapqlPath,
        local: strapiLocalUrl + strapiGrapqlPath,
      },
    },
  };