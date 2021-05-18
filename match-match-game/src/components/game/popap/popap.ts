import { Constants } from './../../constants';
import { Button } from './../../defaultButton/defaultButton';
import { BaseComponent } from "../../base-component";
import "./popap.sass";
export class finalPopap extends BaseComponent {
  public finalPopapButton: Button = new Button("ok");
  public Constants: Constants = new Constants();
  constructor() {
    super("div", ["final-popap"]);
    this.element.append(this.makeElement("p", ["final-popap__text"], this.Constants.finalPopapText), this.finalPopapButton.element);
    this.finalPopapButton.element.classList.add("final-popap__button");
  }
}