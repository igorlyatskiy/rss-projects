import { BaseComponent } from './../../../../base-component';
export class Input {
  public element: HTMLInputElement;
  constructor(type: string) {
    this.element = document.createElement("input");
    this.element.classList.add("popap__input");
    this.element.setAttribute("placeholder", "Your info");
    this.element.setAttribute("maxlength", "30");
    this.element.setAttribute("type", type);
  }

}