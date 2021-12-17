export default (env) => {
  const config = {
    name: "PixelRPG Theme",
    viewEngine: "pug",
    assetsDir: "assets",
    viewsDir: "views/templates",
    pageComponentsDir: "scripts/ssr/pages",
    ssr: {
      rootTag: "ssr-root-page",
      template: "page-component.pug",
    },
    cache: {
      // One year cache on production
      ttl: env === "production" ? 300000 : 30000,
      refresh: {
        active: false,
      },
    },
    routes: [
      // {
      //   path: ["/"],
      //   component: "index-page",
      // },
      {
        path: ["/pages/:handle"],
        component: "pages-page",
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
