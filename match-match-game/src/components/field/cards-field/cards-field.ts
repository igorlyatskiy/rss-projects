import Score from './Score/score';
import Game from '../../game/game';
import Timer from '../../timer/timer';
import SettingsPage from './settings/settingsPage';
import BaseComponent from '../../base-component';
import './cards-field.sass';
import './img/first.png';
import './img/second.png';
import './img/third.png';

class CardsField extends BaseComponent {
  public Rules: BaseComponent[] = [];

  public settingsPage: SettingsPage = new SettingsPage();

  public Timer: Timer;

  public Game: Game;

  public Score: Score;

  constructor() {
    super('div', ['cards-field']);
  }

}
export { CardsField as default };