import { App } from "alosaur/mod.ts";
import { getSettings } from "alosaur-theme/mod.ts";
import { appSettings, templateVars } from "./settings.ts";

const bootstrap = async () => {
  const { themeAppSettings, viewRenderConfig, serverSettings } =
    await getSettings({
      templateVars,
    });

  const settings = {
    ...themeAppSettings,
    ...appSettings,
    areas: [...themeAppSettings.areas, ...appSettings.areas],
    middlewares: [
      ...(themeAppSettings.middlewares || []),
      ...(appSettings.middlewares || []),
    ],
    providers: [
      ...(themeAppSettings.providers || []),
      ...(appSettings.providers || []),
    ],
  };

  console.debug("settings", settings);

  // create application
  const app = new App(settings);

  app.useViewRender(viewRenderConfig);

  console.info("Deno version: ", Deno.version);

  app.listen(serverSettings);
};

bootstrap();
