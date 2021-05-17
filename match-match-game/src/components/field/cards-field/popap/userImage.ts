import { BaseComponent } from './../../../base-component';
import "./img/userDark.png";
export class UserImage extends BaseComponent {
  constructor() {
    super("img", ["popap__img"]);
    this.element.setAttribute("src", "./img/userDark.png");
    this.element.setAttribute("alt", "User image");
  }
}