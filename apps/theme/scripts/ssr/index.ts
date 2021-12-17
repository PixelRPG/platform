import { SSRModule } from "@ribajs/ssr";
import { Riba, coreModule } from "@ribajs/core";
import { Bs5IconComponent, bs5Module } from "@ribajs/bs5";
import { artAndCodeStudioModule } from "@ribajs/artcodestudio";
import { strapiModule } from "@ribajs/strapi";

// Own
import * as pageComponents from "./pages";

const riba = new Riba();

// These Riba settings are necessary for the ssr
riba.configure({
  prefix: ["rv", "ssr-rv"],
  blockUnknownCustomElements: false,
  templateDelimiters: ["[", "]"],
});

// Regist custom components
riba.module.component.regists({ ...pageComponents });

bs5Module.init();
riba.module.component.regists({
  Bs5IconComponent,
});
riba.module.regist(
  coreModule.init({
    lifecycle: {
      timeout: 9000,
    },
  })
);
riba.module.regist(artAndCodeStudioModule.init({}));
riba.module.regist(strapiModule.init({}));
riba.module.regist(SSRModule.init({}));

riba.bind(document?.body, window.ssr.templateVars);
