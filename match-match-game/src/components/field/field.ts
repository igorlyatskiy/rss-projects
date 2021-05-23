import CardsField from './cards-field/cards-field';
import BaseComponent from '../base-component';
import './field.sass';

class Field extends BaseComponent {
  public readonly CardsField: CardsField;

  public readonly shadowBox: HTMLElement;

  constructor() {
    super('main', ['field']);
    this.CardsField = new CardsField();
    this.shadowBox = this.makeElement('div', ['shadow-box'], '');
    this.element.append(this.CardsField.element, this.shadowBox);
  }

  activateShadowBox() {
    this.shadowBox.classList.add('shadow-box_active');
  }

  deactivateShadowBox() {
    this.shadowBox.classList.remove('shadow-box_active');
  }
}

export { Field as default };