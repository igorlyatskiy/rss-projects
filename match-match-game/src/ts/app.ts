import { Header } from './../components/header/header';
import { CardsField } from './../components/cards-field/cards-field';
export class App {
  private readonly CardsField: CardsField;
  public readonly Header: Header;
  constructor(private readonly rootElement: HTMLElement) {
    this.CardsField = new CardsField();
    this.Header = new Header();
    this.rootElement.append(this.Header.element);
    this.rootElement.append(this.CardsField.element);
  }
}