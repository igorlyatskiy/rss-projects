import { BaseComponent } from "../../base-component";
import "./card.sass";
import "../../../img/default.png"

export class Card extends BaseComponent {
  public isFlipped: boolean;
  public card: HTMLElement = this.makeElement("div", ["card"], "");
  constructor(public url: string) {
    super("div", ["card-container"]);
    this.element.append(this.card);
    this.card.innerHTML = `
    <div class="card__front"></div>
    <div class="card__back" style="background-image: url('${url}')"></div>
    `;
  }

  flipToBack() {
    return this.flipCard(true);
  }
  flipToFront() {
    return this.flipCard();
  }

  flipCard = (flag?: boolean) => {
    this.card.classList.toggle("card_flipped")
    if (flag) {

    }
    return this.url;
  }
}