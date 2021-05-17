import { Timer } from './../../timer/timer';
import { settingsPage } from './settings/settingsPage';
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
  public Rules: Array<BaseComponent>
  public readonly Constants: Constants;
  public RegisterPopap: RegisterPopap = new RegisterPopap();
  public settingsPage: settingsPage = new settingsPage();
  public Timer: Timer;
  constructor() {
    super("div", ["cards-field"]);
    this.Constants = new Constants();

    this.makeAboutPage();
  }

  makeAboutPage() {
    this.clearComponent();
    const p = this.makeElement("p", ["info-item__title"], "How to play?");
    p.innerHTML = "How to play?";

    this.Rules = [];
    for (let i = 0; i < this.Constants.infoCardsNumber; i++) {
      this.Rules[i] = new InfoItem(i + 1, this.Constants.infoCardsText[i], this.Constants.infoCardsImages[i]);
      this.element.append(this.Rules[i].element);
    }

    this.element.append(this.RegisterPopap.element);
    this.RegisterPopap.element.classList.remove("register-popap_active")
  }

  makeGamePage() {
    this.clearComponent();
    this.Timer = new Timer();
    this.element.append(this.Timer.element);
  }

  makeSettingsPage() {
    this.clearComponent();
    this.element.append(this.RegisterPopap.element, this.settingsPage.element);
  }

  makeBestScorePage() {
    this.clearComponent();
    this.element.append(this.RegisterPopap.element);
  }

}