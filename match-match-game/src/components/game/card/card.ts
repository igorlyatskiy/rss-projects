import { Constants } from './../../constants';
import { App } from './../../../ts/app';
import { BaseComponent } from "../../base-component";
import "./card.sass";
import "../../../img/default.png"
import { app } from '../../../ts/index'
export class Card extends BaseComponent {
  public Constants: Constants = new Constants();
  public isFlipped: boolean;
  public card: HTMLElement = this.makeElement("div", ["card"], "");
  public app: App = app;
  constructor(public url: string) {
    super("div", ["card-container"]);
    this.url = url;
    this.element.append(this.card, this.makeElement("div", ["card-container__shadow"], ""));

    const cardBack = this.makeElement("div", ["card__back"], "");
    cardBack.setAttribute("style", `background-image: url('${url}')`);

    this.card.append(
      this.makeElement("div", ["card__front"], ""),
      cardBack
    );
  }

  flipToBack() {
    (!this.element.classList.contains(this.Constants.GUESSED_CLASS)) ?
      this.card.classList.remove(this.Constants.FLIPPED_CLASS) : 0;
  }
  flipToFront() {
    return this.flipCard();
  }

  flipCard = (flag?: boolean) => {
    this.card.classList.toggle(this.Constants.FLIPPED_CLASS);
    this.freezeCard();
    const Model = this.app.Controller.Model;
    const activeCardsNumber = Model.activeCards.length;
    (activeCardsNumber === 0) ? Model.activeCards.push(this.url) : this.compareCards(Model.activeCards[0]);
    this.checkGameStatus()
  }

  compareCards = (firstElement: string) => {
    this.app.Controller.View.Field.CardsField.Game.freezePictures();
    if (firstElement === this.url) {
      this.app.Controller.Model.guessedCards.push(this.url);
      this.app.Controller.View.Field.CardsField.Game.removeGuessedCards(this.url);
    } else {
      this.app.Controller.View.Field.CardsField.Game.highlightWrongCards();
      this.app.Controller.Model.wrongComparissonNumber++;
    }
    this.app.Controller.Model.activeCards = [];
    this.app.Controller.Model.comparissonNumber++;
  }

  freezeCard() {
    this.element.classList.add(this.Constants.BLOCKED_CLASS);
  }
  unfreezeCard(element: HTMLElement) {
    if (element) {
      element.classList.add(this.Constants.BLOCKED_CLASS);
    } else {
      this.element.classList.add(this.Constants.BLOCKED_CLASS);
    }
  }

  checkGameStatus() {
    if (this.checkVictory()) {
      setTimeout(() => this.app.Controller.View.Field.CardsField.Game.showVictoryPopap(), this.Constants.cardRotationTime + this.Constants.cardWaitingTime);
    }
  }

  checkVictory() {
    return this.app.Controller.View.Field.CardsField.Game.cards.length / 2 === this.app.Controller.Model.guessedCards.length
  }
}