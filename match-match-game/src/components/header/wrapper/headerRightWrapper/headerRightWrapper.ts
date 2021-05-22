import { Image } from './../../../image/image';
import { Button } from './../../../defaultButton/defaultButton';
import { BaseComponent } from './../../../base-component';
import './headerRightWrapper.sass';
export class headerRightWrapper extends BaseComponent {
  public readonly headerButton: Button;
  public headerImage: Image;
  constructor() {
    super('div', ['header__right-wrapper']);

    this.headerButton = new Button("register new player");

    this.showGuest();
  }

  showGuest() {
    this.clearComponent();
    this.element.append(this.headerButton.element)
  }

  showWaitingPlayer() {
    this.headerImage = new Image()
    this.headerImage.element.classList.add("header__avatar");
    this.clearComponent();
    this.element.append(this.headerButton.element, this.headerImage.element);
    this.headerButton.element.innerText = "Start game";
  }

  showActivePlayer() {
    this.headerButton.element.innerText = "STOP GAMe";
  }


}