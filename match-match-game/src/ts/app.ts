import { Header } from './../components/header/header';
import { Field } from '../components/field/field';
export class App {
  private readonly Field: Field;
  public readonly Header: Header;
  constructor(private readonly rootElement: HTMLElement) {
    this.Field = new Field();
    this.Header = new Header();
    this.rootElement.append(this.Header.element);
    this.rootElement.append(this.Field.element);
  }
}