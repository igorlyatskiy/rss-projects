import { BaseComponent } from './../../../../base-component';
export class Input {
  public element: HTMLInputElement;
  constructor() {
    this.element = document.createElement("input");
    this.element.classList.add("popap__input");
    this.element.setAttribute("placeholder", "Your info");
  }

}