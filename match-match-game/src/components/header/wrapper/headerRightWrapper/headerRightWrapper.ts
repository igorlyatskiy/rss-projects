import { startGameButton } from './buttons/startGameButton';
import { registerButton } from './buttons/registerButton';
import { BaseComponent } from './../../../base-component';
import './headerRightWrapper.sass';
export class headerRightWrapper extends BaseComponent {
  private readonly registerButton: registerButton;
  private readonly startGameButton: startGameButton;
  constructor() {
    super('div', ['header__right-wrapper']);

    this.registerButton = new registerButton();
    this.startGameButton = new startGameButton();

    this.showGuest();
  }

  showGuest() {
    this.clearComponent();
    this.element.append(this.registerButton.element)
  }

  showUser() {
    this.clearComponent();
    this.element.append(this.startGameButton.element);
    // this.element.append(this.image)
  }


}