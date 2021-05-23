import { Constants } from '../../../constants';
import { BaseComponent } from '../../../base-component';
import './info-item.sass';

export class InfoItem extends BaseComponent {
  public Constants: Constants = new Constants();

  constructor(number: number, text: string, img: string) {
    super('div', ['info-item']);
    const circle = this.makeElement('div', ['info-item__circle'], String(number));
    const container = this.makeElement('div', ['info-item__container'], '');

    const image = document.createElement('img');
    image.setAttribute('src', img);

    const p = this.makeElement('p', ['info-item__text'], text);

    this.element.append(container, image);
    container.append(circle, p);

    container.style.height = this.Constants.infoCardsHeight[number - 1];
  }
}