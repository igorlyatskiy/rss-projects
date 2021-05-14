import { BaseComponent } from '../base-component';
import './defaultButton.sass';
export class Button extends BaseComponent {
  constructor(buttonText: string) {
    super("button", ['btn-main btn-main_white']);
    this.element.innerHTML = buttonText;
  }
}