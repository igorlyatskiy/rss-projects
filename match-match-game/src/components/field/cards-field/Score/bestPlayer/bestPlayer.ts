import Constants, { UserType } from '../../../../constants';
import BaseComponent from '../../../../base-component';

import './img/userDark.png';
import './bestPlayer.sass';

class BestPlayer extends BaseComponent {
  Constants: Constants = new Constants();

  constructor(user: UserType) {
    super('div', ['top-player']);

    const img = this.makeElement('img', ['top-player__img'], '');
    img.setAttribute('src', (user.avatar !== this.Constants.DEFAULT_USER_LINK) ? user.avatar : this.Constants.DEFAULT_USER_LINK_dark);

    const wrapper = this.makeElement('div', ['top-player__wrapper'], '');
    const textWrapper = this.makeElement('div', ['top-player__text-wrapper'], '');


    const name = this.makeElement('h3', ['top-player__name'], `${user.name} ${user.surname}`);
    const email = this.makeElement('p', ['top-player__email'], user.email);

    const score = this.makeElement('span', ['top-player__score'], 'Score: ');
    score.append(this.makeElement('b', ['top-player__score-number'], `${user.score}`));


    this.element.append(wrapper, score);
    wrapper.append(img, textWrapper);
    textWrapper.append(name, email);
  }
}

export { BestPlayer as default };