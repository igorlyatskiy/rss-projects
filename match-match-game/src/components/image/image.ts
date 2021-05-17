import { BaseComponent } from "../base-component";
import "../../img/user.png"
export class Image extends BaseComponent {
  constructor(src: string = "../../img/user.png") {
    super("img", []);
    this.element.setAttribute("alt", "Image");
    this.element.setAttribute("crossOrigin", "anonymous");
    this.element.setAttribute("src", src);
  }
}