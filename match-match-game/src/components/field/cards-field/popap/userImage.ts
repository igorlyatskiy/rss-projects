import { BaseComponent } from './../../../base-component';
import "./img/user.png";
export class UserImage extends BaseComponent {
  constructor() {
    super("img", ["popap__img"]);
    this.element.setAttribute("src", "./img/user.png");
    this.element.setAttribute("alt", "User image");
  }
}