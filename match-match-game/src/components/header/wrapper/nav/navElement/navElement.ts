import { BaseComponent } from '../../../../base-component';
import './navElement.sass';
export class navElement {
  public element: HTMLElement;
  constructor(imgSrc: string, private text: string, private name: string) {
    this.element = document.createElement("nav");
    this.element.classList.add("nav__element");
    this.element.innerHTML = `
    <img src="${imgSrc}" alt="image" class="nav__img nav__img_${name}"></img>
    <p class="nav__text nav__text__${name}">${text}</p>
    `;
  }
}