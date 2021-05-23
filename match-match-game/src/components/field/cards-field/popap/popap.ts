import Checkbox from './checkbox/checkbox';
import Button from '../../../defaultButton/defaultButton';
import UserImage from './userImage';
import Input from './input/input';
import Constants from '../../../constants';
import BaseComponent from '../../../base-component';
import './assets/bootstrap.css';
import './popap.sass';

class RegisterPopap extends BaseComponent {
  public readonly Constants: Constants;

  public readonly inputs: Input[] = [];

  public readonly div: HTMLElement[] = [];

  public readonly addUserButton: Button = new Button('Add user');

  public readonly cancelButton: Button = new Button('Cancel');

  public readonly UserImage: UserImage;

  public readonly Checkbox: Checkbox[] = [];

  constructor() {
    super('div', ['register-popap']);
    this.Constants = new Constants();

    const title = this.makeElement('p', ['popap__title'], 'Register new Player');
    this.element.append(title);

    this.initInputs();

    this.UserImage = new UserImage();

    this.addUserButton.element.classList.add('popap__add-user');
    this.cancelButton.element.classList.add('popap__cancel');

    this.element.append(this.UserImage.img, this.UserImage.input, this.addUserButton.element, this.cancelButton.element);

    this.lockButton();
  }

  showPopap() {
    this.element.classList.add('register-popap_active');
  }

  hidePopap() {
    this.element.classList.remove('register-popap_active');
  }

  initInputs() {
    const inputsContainer = this.makeElement('div', ['inputs-container'], '');
    this.element.append(inputsContainer);
    this.Constants.popapTitles.forEach((e, index) => {
      const div = this.makeElement('div', ['container'], '');
      this.div.push(div);
      inputsContainer.append(this.div[index]);
      const input = new Input(this.Constants.registerInfo[index]);
      const checkbox = new Checkbox();
      this.div[index].append(input.element, checkbox.element, this.makeElement('p', ['popap__p'], e), this.makeElement('span', ['p_wrong'], "this field isn't correct"));
      this.inputs.push(input);
      this.Checkbox.push(checkbox);
    });
  }

  lockButton() {
    this.addUserButton.element.classList.add('button_locked');
  }

  unlockButton() {
    this.addUserButton.element.classList.remove('button_locked');
  }
}

export { RegisterPopap as default };