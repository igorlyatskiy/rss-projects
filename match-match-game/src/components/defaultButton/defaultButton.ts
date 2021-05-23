import BaseComponent from '../base-component';
import './defaultButton.sass';

class Button extends BaseComponent {
  constructor(buttonText: string) {
    super('button', ['btn-main']);
    this.element.innerHTML = buttonText;
  }
}
export { Button as default };