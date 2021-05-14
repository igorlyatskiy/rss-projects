import { navElement } from './navElement/navElement';
import { BaseComponent } from '../../../base-component';
import './nav.sass';
import './img/aboutGame.svg'
import './img/bestScore.svg'
import './img/gameSettings.svg'

export class Nav extends BaseComponent {
  private readonly aboutGame: navElement;
  private readonly bestScore: navElement;
  private readonly gameSettings: navElement;
  constructor() {
    super('nav', ['nav']);
    this.aboutGame = new navElement("./img/aboutGame.svg", "About Game", "aboutGame");
    this.bestScore = new navElement("./img/bestScore.svg", "Best Score", "bestScore");
    this.gameSettings = new navElement("./img/gameSettings.svg", "Game Settings", "gameSettings");
    this.element.append(this.aboutGame.element);
    this.element.append(this.bestScore.element);
    this.element.append(this.gameSettings.element);
  }
}