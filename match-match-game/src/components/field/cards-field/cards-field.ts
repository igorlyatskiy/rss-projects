import Score from './Score/score';
import Game from '../../game/game';
import Timer from '../../timer/timer';
import SettingsPage from './settings/settingsPage';
import RegisterPopap from './popap/popap';
import Constants from '../../constants';
import InfoItem from './info-item/info-item';
import BaseComponent from '../../base-component';
import './cards-field.sass';
import './img/first.png';
import './img/second.png';
import './img/third.png';

class CardsField extends BaseComponent {
  public Rules: BaseComponent[] = [];

  public readonly Constants: Constants = new Constants();

  public RegisterPopap: RegisterPopap = new RegisterPopap();

  public settingsPage: SettingsPage = new SettingsPage();

  public Timer: Timer;

  public Game: Game;

  public Score: Score;

  constructor() {
    super('div', ['cards-field']);

    this.makeAboutPage();
  }

  makeAboutPage() {
    this.element.classList.remove('cards-field_active');
    this.clearComponent();
    const p = this.makeElement('p', ['info-item__title'], 'How to play?');
    this.element.append(p);

    for (let i = 0; i < this.Constants.infoCardsNumber; i += 1) {
      this.Rules[i] = new InfoItem(i + 1, this.Constants.infoCardsText[i], this.Constants.infoCardsImages[i]);
      this.element.append(this.Rules[i].element);
    }

    this.element.append(this.RegisterPopap.element);
    this.RegisterPopap.element.classList.remove('register-popap_active');
  }

  makeGamePage(typeOfCards: string, settingsCardsNumber: number) {
    this.clearComponent();
    this.Game = new Game(typeOfCards, settingsCardsNumber);
    this.element.classList.add('cards-field_active');
    this.Timer = new Timer();
    this.element.append(this.Timer.element, this.Game.element);
  }

  makeSettingsPage() {
    this.element.classList.remove('cards-field_active');
    this.clearComponent();
    this.element.append(this.RegisterPopap.element, this.settingsPage.element);
  }

  makeBestScorePage() {
    this.Score = new Score();
    this.element.classList.remove('cards-field_active');
    this.clearComponent();
    this.element.append(this.RegisterPopap.element, this.Score.element);
  }

}
export { CardsField as default };