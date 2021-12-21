import { PageComponent } from "@ribajs/ssr";
import { TemplateFunction } from "@ribajs/core";

import pugTemplate from "./index.component.pug";

import { GamesService, GameBasicEntityFragment, Scalars } from "../../../common";

export interface Scope {
  title: string;
  games: GameBasicEntityFragment[];
}

export class IndexPageComponent extends PageComponent {
  public static tagName = "index-page";
  public _debug = true;
  protected autobind = true;
  protected games = new GamesService();

  protected head = {
    title: "PixelRPG",
  };

  scope: Scope = {
    title: "PixelRPG",
    games: []
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IndexPageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    const locale = typeof this.ctx.query?.locale === 'string' ? this.ctx.query.locale : "en";
    const games = await this.games.list(locale as Scalars['I18NLocaleCode']);
    this.scope.games = games?.data || [];
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return pugTemplate(this.scope);
  }
}
