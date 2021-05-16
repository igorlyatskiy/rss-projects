import { Constants } from './../../../constants';
import { navElement } from './navElement/navElement';
import { BaseComponent } from '../../../base-component';
import './nav.sass';
import './img/aboutGame.svg'
import './img/bestScore.svg'
import './img/gameSettings.svg'

export class Nav extends BaseComponent {
  public readonly navElementsList: navElement[] = [];
  public readonly Constants: Constants = new Constants();
  constructor() {
    super('nav', ['nav']);
    this.Constants.NavImages.forEach((e, index) => {
      this.navElementsList.push(
        new navElement(this.Constants.NavImages[index], this.Constants.NavText[index], this.Constants.NavClass[index])
      )
      this.changeActiveElement(0);
      this.element.append(this.navElementsList[index].element);
    });
  }
  changeActiveElement(index: number) {
    this.navElementsList.forEach((el) => el.element.classList.remove("nav__element_active"));
    this.navElementsList[index].element.classList.add("nav__element_active");
  }
}