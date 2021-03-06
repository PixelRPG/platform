import type { ThemeConfigFile, ThemeConfig } from "@ribajs/nest-theme";

export const config: ThemeConfigFile = (env: string | undefined) => {
  const config: ThemeConfig = {
    name: "PixelRPG Theme",
    viewEngine: "pug",
    assetsDir: "assets",
    viewsDir: "views/templates",
    pageComponentsDir: "scripts/ssr/pages",
    timeout: 10000,
    ssr: {
      rootTag: "ssr-root-page",
      template: "page-component.pug",
    },
    cache: {
      // One year cache on production
      ttl: env === "production" ? 300000 : 0,
      refresh: {
        active: false,
      },
    },
    routes: [
      {
        path: ["/"],
        component: "index-page",
      },
      {
        path: ["/games/:slug"],
        component: "games-page",
      },
    ],
    errorRoutes: {
      404: {
        component: "not-found-page",
      },
      500: {
        component: "error-page",
      },
    },
  };
  return config;
};
