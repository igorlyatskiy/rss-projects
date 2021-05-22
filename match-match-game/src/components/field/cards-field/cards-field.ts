import { Score } from './Score/score';
import { Game } from './../../game/game';
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
  public Game: Game;
  public Score: Score;
  constructor() {
    super("div", ["cards-field"]);
    this.Constants = new Constants();

    this.makeAboutPage();
  }

  makeAboutPage() {
    this.element.classList.remove("cards-field_active");
    this.clearComponent();
    const p = this.makeElement("p", ["info-item__title"], "How to play?");
    p.innerText = "How to play?";

    this.Rules = [];
    for (let i = 0; i < this.Constants.infoCardsNumber; i++) {
      this.Rules[i] = new InfoItem(i + 1, this.Constants.infoCardsText[i], this.Constants.infoCardsImages[i]);
      this.element.append(this.Rules[i].element);
    }

    this.element.append(this.RegisterPopap.element);
    this.RegisterPopap.element.classList.remove("register-popap_active")
  }

  makeGamePage() {
    this.Game = new Game();
    this.clearComponent();
    this.element.classList.add("cards-field_active");
    this.Timer = new Timer();
    this.element.append(this.Timer.element, this.Game.element);
  }

  makeSettingsPage() {
    this.element.classList.remove("cards-field_active");
    this.clearComponent();
    this.element.append(this.RegisterPopap.element, this.settingsPage.element);
  }

  makeBestScorePage() {
    this.Score = new Score();
    this.element.classList.remove("cards-field_active");
    this.clearComponent();
    this.element.append(this.RegisterPopap.element);
    this.element.append(this.Score.element);
  }


}