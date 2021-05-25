import BaseComponent from "../base-component";
import './popap.sass';

class Popap extends BaseComponent {
  constructor(classList: string[]) {
    super("div", ["popap"]);
    this.element.classList.add(...classList);
  }
}

export { Popap as default }