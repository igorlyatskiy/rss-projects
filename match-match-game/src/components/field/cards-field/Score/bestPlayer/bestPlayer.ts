import { UserType } from '../../../../constants';
import BaseComponent from '../../../../base-component';
import '../../../../../img/userDark.png';
import './bestPlayer.sass';

class BestPlayer extends BaseComponent {
  constructor(user: UserType) {
    super('div', ['top-player']);
    const DEFAULT_USER_LINK = '../../../../../img/userDark.png';

    const img = this.makeElement('img', ['top-player__img'], '');
    img.setAttribute('src', (user.avatar !== '') ? user.avatar : DEFAULT_USER_LINK);
    img.setAttribute('crossorigin', 'anonymous');

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