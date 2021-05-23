import Wrapper from './wrapper/wrapper';
import BaseComponent from '../base-component';
import './header.sass';

class Header extends BaseComponent {
  public readonly Wrapper: Wrapper;

  constructor() {
    super('header', ['header']);
    this.Wrapper = new Wrapper();
    this.element.append(this.Wrapper.element);
  }
}

export { Header as default };