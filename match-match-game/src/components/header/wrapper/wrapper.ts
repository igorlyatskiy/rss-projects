import { headerRightWrapper } from './headerRightWrapper/headerRightWrapper';
import { Nav } from './nav/nav';
import { BaseComponent } from '../../base-component';
export class Wrapper extends BaseComponent {
  public readonly Nav: Nav;
  public headerRightWrapper: headerRightWrapper;
  constructor() {
    super('div', ['wrapper']);
    this.Nav = new Nav();
    this.headerRightWrapper = new headerRightWrapper();
    this.element.innerHTML = `
      <a class="header__match-match">
        <button class="btn-match btn-match_empty">match</button>
        <button class="btn-match btn-match_filled">match</button>
      </a>
    `;
    this.element.append(this.Nav.element)
    this.element.append(this.headerRightWrapper.element);
  }
}