import HeaderRightWrapper from './headerRightWrapper/headerRightWrapper';
import Nav from './nav/nav';
import BaseComponent from '../../base-component';

class Wrapper extends BaseComponent {
  public readonly Nav: Nav = new Nav();

  public headerRightWrapper: HeaderRightWrapper = new HeaderRightWrapper();

  public logo: HTMLElement;

  constructor() {
    super('div', ['wrapper']);
    this.drawGuest();
  }

  drawGuest() {
    this.clearComponent();
    this.logo = this.makeElement('span', ['header__match-match'], '');
    this.element.append(this.logo);
    const btnFilled = this.makeElement('button', ['btn-match', 'btn-match_filled'], 'match');
    const btnEmpty = this.makeElement('button', ['btn-match', 'btn-match_empty'], 'match');
    this.logo.append(btnEmpty);
    this.logo.append(btnFilled);
    this.element.append(this.Nav.element);
    this.element.append(this.headerRightWrapper.element);
  }

}

export { Wrapper as default };