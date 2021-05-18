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
    this.element.append(this.card);
    this.card.innerHTML = `
    <div class="card__front"></div>
    <div class="card__back" style="background-image: url('${url}')"></div>
    `;
  }

  flipToBack() {
    this.card.classList.remove("card_flipped");
  }
  flipToFront() {
    return this.flipCard();
  }

  flipCard = (flag?: boolean) => {
    this.card.classList.toggle("card_flipped");
    this.freezeCard();
    const Model = this.app.Controller.Model;
    const activeCardsNumber = this.app.Controller.Model.activeCards.length;
    (activeCardsNumber === 0) ? Model.activeCards.push(this.url) : this.compareCards(Model.activeCards[0]);
    this.checkGameStatus()
  }

  compareCards = (firstElement: string) => {
    this.app.Controller.View.Field.CardsField.Game.freezePictures();
    if (firstElement === this.url) {
      this.app.Controller.Model.guessedCards.push(this.url);
      this.app.Controller.View.Field.CardsField.Game.removeGuessedCards(this.url);
    }
    this.app.Controller.Model.activeCards = [];
  }

  freezeCard() {
    this.element.classList.add("card-container_blocked");
  }
  unfreezeCard(element: HTMLElement) {
    if (element) {
      element.classList.add("card-container_blocked");
    } else {
      this.element.classList.add("card-container_blocked");
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