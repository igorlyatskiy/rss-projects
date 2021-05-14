import { BaseComponent } from './../base-component';
import './card.sass';
export class Card extends BaseComponent {
  constructor(img: string) {
    super('div', ['card-container']);
    this.element.innerHTML=`
    
    `
  }
}