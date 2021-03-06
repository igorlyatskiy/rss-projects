import Constants from '../../constants';
import BaseComponent from '../../base-component';
import './card.sass';
import './img/default.png';

class Card extends BaseComponent {
  public Constants: Constants = new Constants();

  public card: HTMLElement = this.makeElement('div', ['card'], '');

  constructor(public url: string) {
    super('div', ['card-container']);
    this.url = url;
    this.element.append(this.card, this.makeElement('div', ['card-container__shadow'], ''));

    this.initCardSides();
  }

  initCardSides = () => {
    const cardBack = this.makeElement('div', ['card__back'], '');
    cardBack.setAttribute('style', `background-image: url('${this.url}')`);
    this.card.append(
      this.makeElement('div', ['card__front'], ''),
      cardBack,
    );
  };

  flipToFront = () => {
    this.card.classList.add(this.Constants.FLIPPED_CLASS);
  };

  flipToBack() {
    if (!this.element.classList.contains(this.Constants.GUESSED_CLASS)) {
      this.card.classList.remove(this.Constants.FLIPPED_CLASS);
    }
  }

  freezeCard() {
    this.element.classList.add(this.Constants.BLOCKED_CLASS);
  }

  unfreezeCard(element: HTMLElement) {
    if (element) {
      element.classList.remove(this.Constants.BLOCKED_CLASS);
    } else {
      this.element.classList.remove(this.Constants.BLOCKED_CLASS);
    }
  }

}

export { Card as default };