import { InfoItem } from './info-item/info-item';
import { BaseComponent } from './../../base-component';
import './cards-field.sass';
import './img/first.png'
import './img/second.png'
import './img/third.png'
export class CardsField extends BaseComponent {
  private readonly firstRule: InfoItem;
  private readonly secondRule: InfoItem;
  private readonly thirdRule: InfoItem;
  constructor() {
    super("div", ["cards-field"]);

    const p = document.createElement("p");
    p.classList.add("info-item__title");
    this.element.append(p);
    p.innerHTML = "How to play?";

    this.firstRule = new InfoItem(1, "Register new player in game", './img/first.png');
    this.element.append(this.firstRule.element);

    this.secondRule = new InfoItem(2, "Register new player in game", './img/second.png');
    this.element.append(this.secondRule.element);

    this.thirdRule = new InfoItem(3, "Register new player in game", './img/third.png');
    this.element.append(this.thirdRule.element);
  }
  showField() {

  }
}