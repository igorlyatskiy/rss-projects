import { Constants } from '../../components/constants';
import { Header } from '../../components/header/header';
import { Field } from "../../components/field/field";

export class View {
  public readonly Field: Field;
  public readonly Header: Header;
  public Constants: Constants;
  constructor(private readonly rootElement: HTMLElement) {
    this.Field = new Field();
    this.Header = new Header();
    this.Constants = new Constants();
    this.rootElement.append(this.Header.element);
    this.rootElement.append(this.Field.element);
  }
}