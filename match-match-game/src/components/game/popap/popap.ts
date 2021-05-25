import Constants from '../../constants';
import Button from '../../defaultButton/defaultButton';
import './popap.sass';
import Popap from '../../popap/popap';

class FinalPopap extends Popap {
  public finalPopapButton: Button = new Button('ok');

  public p: HTMLElement = this.makeElement('p', ['final-popap__text'], '');

  public Constants: Constants = new Constants();

  constructor() {
    super(['final-popap']);

    this.element.append(this.p, this.finalPopapButton.element);
    this.finalPopapButton.element.classList.add('final-popap__button');
  }
}

export { FinalPopap as default };