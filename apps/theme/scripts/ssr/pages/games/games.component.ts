import { PageComponent } from "@ribajs/ssr";
import { TemplateFunction } from "@ribajs/core";

import pugTemplate from "./games.component.pug";

import { GamesService, GameDetailFragment, Scalars } from "../../../common";

export interface Scope {
  title: string;
  content: string;
  params: GamesPageComponent["ctx"]["params"];
  game?: GameDetailFragment['data'][0]['attributes'];
}

export class GamesPageComponent extends PageComponent {
  public static tagName = "games-page";
  public _debug = true;
  protected autobind = true;
  protected games = new GamesService();

  scope: Scope = {
    title: "[ params.handle | capitalize ]",
    content: "<p>We are [ params.handle ]!</a>",
    params: {},
    game: undefined,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();
    this.scope.params = this.ctx.params;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(GamesPageComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
    if (!this.ctx.params?.slug) {
      throw new Error('Slug is not defined!')
    }
    const locale = typeof this.ctx.query?.locale === 'string' ? this.ctx.query.locale : "en";
    const game = await this.games.get(this.ctx.params?.slug, locale as Scalars['I18NLocaleCode']);
    this.scope.game = game?.attributes;
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return pugTemplate(this.scope);
  }
}
