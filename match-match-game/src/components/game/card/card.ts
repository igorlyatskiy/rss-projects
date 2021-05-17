import { BaseComponent } from "../../base-component";
import "./card.sass";
export class Card extends BaseComponent {
  public isFlipped: boolean;
  constructor(public url: string) {
    super("div", ["card-container"]);
    this.element.innerHTML = `
    <div class="card">
      <div class="card__front" style="background-image: url("${url}")"></div>
      <div class="card__back"></div>
    </div>
    `;
  }

  flipToBack() {
    return this.flipCard(true);
  }
  flipToFront() {
    return this.flipCard();
  }

  flipCard(flag?: boolean) {
    this.element.classList.toggle("card_flipped")
    if (flag) {

    }
    return this.url;
  }
}