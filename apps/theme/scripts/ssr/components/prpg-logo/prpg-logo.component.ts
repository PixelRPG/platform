import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./prpg-logo.component.pug";

interface PRPGLogoComponentScope {

}

export class PRPGLogoComponent extends Component {
  public static tagName = "prpg-logo";

  static get observedAttributes() {
    return [];
  }

  public scope: PRPGLogoComponentScope = {};

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PRPGLogoComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
