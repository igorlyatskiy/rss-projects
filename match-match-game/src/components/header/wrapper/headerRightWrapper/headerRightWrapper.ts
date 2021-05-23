import Image from '../../../newImage/image';
import Button from '../../../defaultButton/defaultButton';
import BaseComponent from '../../../base-component';
import Constants from '../../../constants'
import './headerRightWrapper.sass';

class HeaderRightWrapper extends BaseComponent {
  public readonly Constants: Constants = new Constants();

  public readonly headerButton: Button;

  public headerImage: Image;

  constructor() {
    super('div', ['header__right-wrapper']);

    this.headerButton = new Button(this.Constants.DEFAULT_HEADER_BUTTON_CONTENT);

    this.showGuest();
  }

  showGuest() {
    this.clearComponent();
    this.element.append(this.headerButton.element);
  }

  showWaitingPlayer(url: string) {
    this.headerImage = new Image(url);
    this.headerImage.element.classList.add('header__avatar');
    this.clearComponent();
    this.element.append(this.headerButton.element, this.headerImage.element);
    this.headerButton.element.textContent = this.Constants.waitingPlayerHeaderButtonContent;
  }

  showActivePlayer() {
    this.headerButton.element.textContent = this.Constants.activePlayerHeaderButtonContent;
  }
}

export { HeaderRightWrapper as default };