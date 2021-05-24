import FinalPopap from './popap/popap';
import Constants from '../constants';
import Card from './card/card';
import BaseComponent from '../base-component';
import './game.sass';

import '../../img/deer.png';
import '../../img/cow.png';
import '../../img/crab.png';
import '../../img/frog.png';
import '../../img/pig.png';
import '../../img/turtle.png';
import '../../img/beetle.png';
import '../../img/buffalo.png';
import '../../img/bullfinch.png';
import '../../img/butterfly.png';
import '../../img/cat.png';
import '../../img/lion.png';
import '../../img/owl.png';
import '../../img/parrot.png';
import '../../img/rhino.png';
import '../../img/snake.png';
import '../../img/spider.png';
import '../../img/squid.png';

import '../../img/bike.png';
import '../../img/trailer.png';
import '../../img/porsche.png';
import '../../img/scooter.png';
import '../../img/skateboard.png';
import '../../img/mustang.png';
import '../../img/volkswagen.png';
import '../../img/truck.png';
import '../../img/airplane.png';
import '../../img/tanker-truck.png';
import '../../img/helicopter.png';
import '../../img/ship.png';
import '../../img/zeppelin.png';
import '../../img/dragster.png';
import '../../img/jet-ski.png';
import '../../img/crane.png';
import '../../img/hot-air-balloon.png';
import '../../img/yacht.png';

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
    this.unicCardsNumber = (!Number.isNaN(settingsCardsNumber)) ? settingsCardsNumber : this.Constants.DEFAULT_CARDS_NUMBER;

    this.initPictures();
  }

  initPictures() {
    const pictures = this.Constants.getPictures(this.cardsType);
    this.pictures = pictures
      .slice(0, this.unicCardsNumber ** 2 / 2)
      .concat(pictures.slice(0, this.unicCardsNumber ** 2 / 2))
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