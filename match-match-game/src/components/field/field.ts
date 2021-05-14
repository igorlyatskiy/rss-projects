import { CardsField } from './cards-field/cards-field';
import { BaseComponent } from '../base-component';
import './field.sass'
export class Field extends BaseComponent {
  private readonly CardsField: CardsField;
  constructor() {
    super('main', ['field']);
    this.CardsField = new CardsField();
    this.element.append(this.CardsField.element);
  }
}