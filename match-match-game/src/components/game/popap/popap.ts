import { App } from '../../../ts/app';
import { Constants } from '../../constants';
import { Button } from '../../defaultButton/defaultButton';
import { BaseComponent } from '../../base-component';
import './popap.sass';
import { app } from '../../../ts/index';

export class FinalPopap extends BaseComponent {
  public finalPopapButton: Button = new Button('ok');

  public p: HTMLElement = this.makeElement('p', ['final-popap__text'], '');

  public Constants: Constants = new Constants();

  public app: App = app;

  constructor() {
    super('div', ['final-popap']);
    this.element.append(this.p, this.finalPopapButton.element);
    this.finalPopapButton.element.classList.add('final-popap__button');
  }
}