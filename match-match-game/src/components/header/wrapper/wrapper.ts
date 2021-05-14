import { headerRightWrapper } from './headerRightWrapper/headerRightWrapper';
import { Nav } from './nav/nav';
import { BaseComponent } from '../../base-component';
export class Wrapper extends BaseComponent {
  private readonly Nav: Nav;
  public headerRightWrapper: headerRightWrapper;
  constructor() {
    super('div', ['wrapper']);
    this.Nav = new Nav();
    this.headerRightWrapper = new headerRightWrapper();
    this.element.innerHTML = `
      <a class="header__match-match">
        <button class="btn-main btn-main_empty">match</button>
        <button class="btn-main btn-main_filled">match</button>
      </a>
    `;
    this.element.append(this.Nav.element)
    this.element.append(this.headerRightWrapper.element);
  }
}