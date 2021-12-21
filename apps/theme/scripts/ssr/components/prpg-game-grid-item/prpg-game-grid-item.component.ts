import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./prpg-game-grid-item.component.pug";

import { GameBasicFragment } from "../../../common";

interface PRPGGameGridItemComponentScope {
  game: GameBasicFragment | null;
  displaySummary: boolean;
}

export class PRPGGameGridItemComponent extends Component {
  public static tagName = "prpg-game-grid-item";

  static get observedAttributes() {
    return ['game', 'display-summary'];
  }

  static get requiredAttributes() {
    return ['game'];
  }

  public scope: PRPGGameGridItemComponentScope = {
    game: null,
    displaySummary: true
  };

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PRPGGameGridItemComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
