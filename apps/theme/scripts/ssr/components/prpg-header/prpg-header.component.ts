import { Component, TemplateFunction } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./prpg-header.component.pug";

interface PRPGHeaderComponentScope {

}

export class PRPGHeaderComponent extends Component {
  public static tagName = "prpg-header";

  static get observedAttributes() {
    return [];
  }

  public scope: PRPGHeaderComponentScope = {};

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PRPGHeaderComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
