import { finalPopap } from './popap/popap';
import { Constants } from './../constants';
import { App } from './../../ts/app';
import { Card } from './card/card';
import { BaseComponent } from "../base-component";
import { app } from '../../ts/index'
import "./game.sass";

import "../../img/deer.png"
import "../../img/cow.png"
import "../../img/crab.png"
import "../../img/frog.png"
import "../../img/pig.png"
import "../../img/turtle.png"
import "../../img/beetle.png";
import "../../img/buffalo.png";
import "../../img/bullfinch.png";
import "../../img/butterfly.png";
import "../../img/cat.png";
import "../../img/deer.png";
import "../../img/cow.png";
import "../../img/crab.png";
import "../../img/frog.png";
import "../../img/pig.png";
import "../../img/turtle.png";
import "../../img/lion.png";
import "../../img/owl.png";
import "../../img/parrot.png";
import "../../img/rhino.png";
import "../../img/snake.png";
import "../../img/spider.png";
import "../../img/squid.png";

import "../../img/bike.png";
import "../../img/trailer.png";
import "../../img/porsche.png";
import "../../img/scooter.png";
import "../../img/skateboard.png";
import "../../img/mustang.png";
import "../../img/volkswagen.png";
import "../../img/truck.png";
import "../../img/airplane.png";
import "../../img/tanker-truck.png";
import "../../img/helicopter.png";
import "../../img/ship.png";
import "../../img/zeppelin.png";
import "../../img/dragster.png";
import "../../img/jet-ski.png";
import "../../img/crane.png";
import "../../img/hot-air-balloon.png";
import "../../img/yacht.png";

export class Game extends BaseComponent {
  public cards: Card[] = [];
  public popap: finalPopap = new finalPopap();
  public app: App = app;
  public Constants: Constants = new Constants()
  public pictures: string[] = [];
  public cardsType: string = (this.app.Controller.Model.settings[0] !== this.Constants.settingsDefault[0]) ? this.app.Controller.Model.settings[0] : this.Constants.SettingsOptions[0][0];
  public unicCardsNumber: number = (!isNaN(+this.app.Controller.Model.settings[1].split("x")[0])) ? +this.app.Controller.Model.settings[1].split("x")[0] : 4;

  constructor() {
    super("div", ["game"]);
    this.initPictures()
    this.initField();
  }

  initField = () => {
    this.app.Controller.Model.activeCards = [];
    this.app.Controller.Model.guessedCards = [];
    this.app.Controller.Model.comparissonNumber = 0;
    this.app.Controller.Model.wrongComparissonNumber = 0;
    this.pictures.forEach((e, index) => {
      this.cards.push(new Card(e))
      this.element.append(this.cards[index].element)
      this.cards[index].element.addEventListener("click", (e) => this.cards[index].flipCard(true));
      this.cards[index].element.classList.remove(...this.Constants.picturesClasses);
      this.cards[index].element.classList.add(this.Constants.getPicturesClasses(this.unicCardsNumber));
    });
  }

  initPictures() {
    this.pictures = this.Constants.getAnimalPictures(this.cardsType)
      .slice(0, this.unicCardsNumber ** 2 / 2)
      .concat(this.Constants.getAnimalPictures(this.cardsType).slice(0, this.unicCardsNumber ** 2 / 2))
      .sort(() => Math.random() - 0.5);
  }

  freezePictures() {
    this.cards.forEach((e) => e.element.classList.add(this.Constants.BLOCKED_CLASS));
    setTimeout(() => this.cards.forEach((e) => e.element.classList.remove(this.Constants.BLOCKED_CLASS)), this.Constants.cardWaitingTime);
    setTimeout(() => this.hideAllCards(), this.Constants.cardWaitingTime - this.Constants.cardRotationTime);
  }

  hideAllCards() {
    this.cards.forEach((e) => e.flipToBack())
  }

  removeGuessedCards(url: string) {
    this.cards.forEach((e, index) => {
      if (e.url === url) {
        e.element.classList.add(this.Constants.GUESSED_CLASS);
      }
    });
  }

  highlightWrongCards() {
    this.cards.forEach((e, index) => {
      if (e.card.classList.contains(this.Constants.FLIPPED_CLASS) && !e.element.classList.contains(this.Constants.GUESSED_CLASS)) {
        e.card.classList.add(this.Constants.WRONG_CLASS);
        setTimeout(() => e.card.classList.remove(this.Constants.WRONG_CLASS), this.Constants.cardWaitingTime - this.Constants.cardRotationTime);
      }
    });
  }


  showVictoryPopap() {
    this.element.append(this.popap.element);
    this.app.Controller.View.Field.activateShadowBox();
    this.popap.p.innerText = this.Constants.getFinalPopapText(this.app.Controller.View.Field.CardsField.Timer.getTime())
    this.app.Controller.View.Field.CardsField.Timer.stopTimer();
    this.app.Controller.initFinalButtonListener();
  }

  removeVictoryPopap = () => {
    this.popap.element.classList.add(this.Constants.HIDDEN_FINAL_POPAP_CLASS);
    this.app.Controller.View.Field.deactivateShadowBox();
  }
}