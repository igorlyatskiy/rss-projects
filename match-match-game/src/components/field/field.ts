import CardsField from './cards-field/cards-field';
import BaseComponent from '../base-component';
import './field.sass';
import Score from './cards-field/Score/score';
import Game from '../game/game';
import Timer from '../timer/timer';
import InfoItem from './cards-field/info-item/info-item';
import Constants from '../constants';
import RegisterPopap from './registerPopap/popap';

class Field extends BaseComponent {
  public readonly CardsField: CardsField;

  public readonly Constants: Constants = new Constants();

  public RegisterPopap: RegisterPopap = new RegisterPopap();

  public readonly shadowBox: HTMLElement;

  constructor() {
    super('main', ['field']);
    this.CardsField = new CardsField();
    this.shadowBox = this.makeElement('div', ['shadow-box'], '');
    this.element.append(this.CardsField.element, this.shadowBox);

    this.makeAboutPage();
  }

  makeAboutPage() {
    this.CardsField.element.classList.remove('cards-field_active');
    this.CardsField.clearComponent();
    const p = this.makeElement('p', ['info-item__title'], 'How to play?');
    this.CardsField.element.append(p);

    for (let i = 0; i < this.Constants.infoCardsNumber; i += 1) {
      this.CardsField.Rules[i] = new InfoItem(i + 1, this.Constants.infoCardsText[i], this.Constants.infoCardsImages[i]);
      this.CardsField.element.append(this.CardsField.Rules[i].element);
    }

    this.CardsField.element.append(this.RegisterPopap.element);
    this.RegisterPopap.hidePopap();
  }

  makeGamePage(typeOfCards: string, settingsCardsNumber: number) {
    this.CardsField.clearComponent();
    this.CardsField.Game = new Game(typeOfCards, settingsCardsNumber);
    this.CardsField.element.classList.add('cards-field_active');
    this.CardsField.Timer = new Timer();
    this.CardsField.element.append(this.CardsField.Timer.element, this.CardsField.Game.element);
  }

  makeSettingsPage() {
    this.CardsField.element.classList.remove('cards-field_active');
    this.CardsField.clearComponent();
    this.CardsField.element.append(this.RegisterPopap.element, this.CardsField.settingsPage.element);
  }

  makeBestScorePage() {
    this.CardsField.Score = new Score();
    this.CardsField.element.classList.remove('cards-field_active');
    this.CardsField.clearComponent();
    this.CardsField.element.append(this.RegisterPopap.element, this.CardsField.Score.element);
  }

  activateShadowBox() {
    this.shadowBox.classList.add('shadow-box_active');
  }

  deactivateShadowBox() {
    this.shadowBox.classList.remove('shadow-box_active');
  }
}

export { Field as default };