import Constants, { UserType } from '../../../constants';
import BestPlayer from './bestPlayer/bestPlayer';

import BaseComponent from '../../../base-component';

class Score extends BaseComponent {

  public users: UserType[] = [];

  public Constants: Constants = new Constants();

  constructor() {
    super('div', ['score-page']);
  }


  drawBestScorePage = (res: unknown) => {
    this.element.append(this.makeElement('h2', ['title'], 'Best players'));
    this.makeTopUsersList(res);
    for (let i = 0; i < Math.min(this.Constants.topPlayersNumber, this.users.length); i += 1) {
      this.element.append(new BestPlayer(this.users[i]).element);
    }
  };

  isTypeofUser = (e: object) => {
    return Object.keys(e).includes('score');
  };

  makeTopUsersList = (res: unknown) => {
    if (Array.isArray(res)) {
      res.forEach((e) => {
        if (typeof e === 'object') {
          if (this.isTypeofUser(e)) {
            this.users.push(e);
          }
        }
      });
    }
    this.users.sort((a, b) => b.score - a.score);
  };
}

export { Score as default };