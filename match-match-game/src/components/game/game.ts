import FinalPopap from './popap/popap';
import Constants from '../constants';
import Card from './card/card';
import BaseComponent from '../base-component';
import './game.sass';


class Game extends BaseComponent {
  public cards: Card[] = [];

  public popap: FinalPopap = new FinalPopap();

  public Constants: Constants = new Constants();

  public pictures: string[] = [];

  public cardsType: string;

  public unicCardsNumber: number;

  constructor(typeOfCards: string, settingsCardsNumber: number) {
    super('div', ['game']);

    this.cardsType = typeOfCards;
    const CARDS_IN_ONE_LINE = (!Number.isNaN(settingsCardsNumber)) ? settingsCardsNumber : this.Constants.DEFAULT_CARDS_NUMBER;
    this.unicCardsNumber = CARDS_IN_ONE_LINE ** 2 / 2;
    this.initPictures();
  }

  initPictures() {
    const pictures = this.Constants.getPictures(this.cardsType);
    this.pictures = pictures
      .slice(0, this.unicCardsNumber)
      .concat(pictures.slice(0, this.unicCardsNumber))
      .sort(() => Math.random() - 0.5);
  }

  freezePictures() {
    this.cards.forEach((e) => e.element.classList.add(this.Constants.BLOCKED_CLASS));
    setTimeout(() => this.cards.forEach((e) => e.element.classList.remove(this.Constants.BLOCKED_CLASS)), this.Constants.cardWaitingTime);
    setTimeout(() => this.hideAllCards(), this.Constants.cardWaitingTime - this.Constants.cardRotationTime);
  }

  hideAllCards() {
    this.cards.forEach((e) => e.flipToBack());
  }

  removeGuessedCards(url: string) {
    this.cards.forEach((e) => {
      if (e.url === url) {
        e.element.classList.add(this.Constants.GUESSED_CLASS);
      }
    });
  }

  highlightWrongCards() {
    this.cards.forEach((e) => {
      if (e.card.classList.contains(this.Constants.FLIPPED_CLASS) && !e.element.classList.contains(this.Constants.GUESSED_CLASS)) {
        e.card.classList.add(this.Constants.WRONG_CLASS);
        setTimeout(() => e.card.classList.remove(this.Constants.WRONG_CLASS), this.Constants.cardWaitingTime - this.Constants.cardRotationTime);
      }
    });
  }

}

export { Game as default };