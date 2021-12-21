import { PageComponent } from "@ribajs/ssr";
import { TemplateFunction } from "@ribajs/core";

import pugTemplate from "./games.component.pug";

import { GamesService, GameDetailFragment, Scalars } from "../../../common";

export interface Scope {
  title: string;
  game: GameDetailFragment | null;
}

export class GamesPageComponent extends PageComponent {
  public static tagName = "games-page";
  public _debug = true;
  protected autobind = true;
  protected games = new GamesService();

  scope: Scope = {
    title: "",
    game: null,
  };

  static get observedAttributes(): string[] {
    return [];
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
    this.scope.game = game?.data?.[0]?.attributes || null;
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return pugTemplate(this.scope);
  }
}
