import Header from '../../components/header/header';
import Field from '../../components/field/field';

class View {
  public readonly Field: Field = new Field();

  public readonly Header: Header = new Header();

  constructor(private readonly rootElement: HTMLElement) {
    this.rootElement.append(this.Header.element, this.Field.element);
  }
}

export { View as default };