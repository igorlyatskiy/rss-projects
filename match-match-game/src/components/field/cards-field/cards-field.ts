import { registerButton } from './../../header/wrapper/headerRightWrapper/buttons/registerButton';
import { RegisterPopap } from './popap/popap';
import { Constants } from './../../constants';
import { App } from './../../../ts/app';
import { InfoItem } from './info-item/info-item';
import { BaseComponent } from './../../base-component';
import './cards-field.sass';
import './img/first.png'
import './img/second.png'
import './img/third.png'
import { Field } from '../field';
export class CardsField extends BaseComponent {
  public readonly Rules: Array<BaseComponent>
  public readonly Constants: Constants;
  public readonly RegisterPopap: RegisterPopap;
  constructor() {
    super("div", ["cards-field"]);
    this.Constants = new Constants();
    this.RegisterPopap = new RegisterPopap();
    const p = this.makeElement("p", ["info-item__title"], "How to play?");
    p.innerHTML = "How to play?";

    this.Rules = [];
    for (let i = 0; i < this.Constants.infoCardsNumber; i++) {
      this.Rules[i] = new InfoItem(i + 1, this.Constants.infoCardsText[i], this.Constants.infoCardsImages[i]);
      this.element.append(this.Rules[i].element);
    }

    this.element.append(this.RegisterPopap.element);
  }

  showField() {

  }

}