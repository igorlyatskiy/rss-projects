import { BaseComponent } from '../../../../base-component';
import './navElement.sass';
export class navElement extends BaseComponent {
  constructor(imgSrc: string, private text: string, private name: string) {
    super('div', ['nav__element']);
    this.element.innerHTML = `
    <img src="${imgSrc}" alt="image" class="nav__img nav__img_${name}"></img>
    <p class="nav__text nav__text_${name}">${text}</p>
    `;
  }
}