import { Wrapper } from './wrapper/wrapper';
import { BaseComponent } from './../base-component';
import './header.sass';
export class Header extends BaseComponent {
  private readonly Wrapper: Wrapper;
  constructor() {
    super('header', ['header']);
    this.Wrapper = new Wrapper();
    this.element.append(this.Wrapper.element);
  }
}