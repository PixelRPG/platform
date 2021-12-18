import { PageComponent } from "@ribajs/ssr";
import { TemplateFunction } from "@ribajs/core";

import { GamesService, GameBasicFragment } from "../../../common";

import pugTemplate from "./index.component.pug";

export interface Scope {
  title: string;
  games: GameBasicFragment['data']
}

export class IndexPageComponent extends PageComponent {
  public static tagName = "index-page";
  public _debug = true;
  protected autobind = true;
  protected games = new GamesService();

  protected head = {
    title: "You are on home",
  };

  scope: Scope = {
    title: "Hello from ssr",
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
    const locale = "en"; // TODO
    const games = await this.games.list(locale);
    this.scope.games = games.games?.data || [];
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    return pugTemplate(this.scope);
  }
}
