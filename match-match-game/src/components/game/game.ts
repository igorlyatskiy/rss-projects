import { Constants } from './../constants';
import { App } from './../../ts/app';
import { Card } from './card/card';
import { BaseComponent } from "../base-component";
import "../../img/deer.png"
import "../../img/cow.png"
import "../../img/crab.png"
import "../../img/frog.png"
import "../../img/pig.png"
import "../../img/turtle.png"
import { app } from '../../ts/index'
import "./game.sass";

export class Game extends BaseComponent {
  public cards: Card[] = [];
  public app: App = app;
  public Constants: Constants = new Constants()
  public pictures: string[] = [];
  public cardsType: string = (this.app.Controller.Model.settings[0] !== this.Constants.settingsDefault[0]) ? this.app.Controller.Model.settings[0] : this.Constants.SettingsOptions[0][0];
  public unicCardsNumber: number = (!isNaN(+this.app.Controller.Model.settings[1].split("x")[0])) ? +this.app.Controller.Model.settings[1].split("x")[0] : 4;
  constructor() {
    super("div", ["game"]);
    this.initPictures()
    // console.log(this.pictures);
    // this.pictures.forEach((e, index) => {
    //   this.cards.push(new Card(e))
    //   this.element.append(this.cards[index].element)
    // });
  }

  initField() {

  }

  initPictures() {
    this.pictures = this.Constants.pictures
      .slice(0, this.unicCardsNumber)
      .concat(this.Constants.pictures.slice(0, this.unicCardsNumber))
      .sort(() => Math.random() - 0.5);
  }
}