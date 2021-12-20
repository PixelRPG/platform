import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./prpg-footer.component.pug";

interface PRPGFooterComponentScope {

}

export class PRPGFooterComponent extends Component {
  public static tagName = "prpg-footer";

  static get observedAttributes() {
    return [];
  }

  public scope: PRPGFooterComponentScope = {};

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PRPGFooterComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
