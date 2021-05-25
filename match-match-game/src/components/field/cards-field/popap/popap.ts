import Checkbox from './checkbox/checkbox';
import Button from '../../../defaultButton/defaultButton';
import UserImage from './userImage';
import Input from './input/input';
import Constants from '../../../constants';
import BaseComponent from '../../../base-component';
import './assets/bootstrap.css';
import './popap.sass';
import Popap from '../../../popap/popap';

class RegisterPopap extends Popap {
  public readonly Constants: Constants = new Constants();

  public readonly inputs: Input[] = [];

  public readonly containersForEachInput: HTMLElement[] = [];

  public readonly addUserButton: Button = new Button('Add user');

  public readonly cancelButton: Button = new Button('Cancel');

  public readonly UserImage: UserImage;

  public readonly Checkbox: Checkbox[] = [];

  constructor() {
    super(['register-popap']);

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
    this.element.classList.add(this.Constants.REGISTER_POPAP_ACTIVE_CLASS);
  }

  hidePopap() {
    this.element.classList.remove(this.Constants.REGISTER_POPAP_ACTIVE_CLASS);
  }

  initInputs() {
    const inputsContainer = this.makeElement('div', ['inputs-container'], '');
    this.element.append(inputsContainer);

    this.Constants.popapTitles.forEach((e, index) => {
      const div = this.makeElement('div', ['container'], '');
      this.containersForEachInput.push(div);
      inputsContainer.append(this.containersForEachInput[index]);
      const input = new Input(this.Constants.registerInfo[index]);
      const checkbox = new Checkbox();
      this.containersForEachInput[index].append(input.element, checkbox.element, this.makeElement('p', ['popap__p'], e), this.makeElement('span', ['p_wrong'], "this field isn't correct"));
      this.inputs.push(input);
      this.Checkbox.push(checkbox);
    });
  }

  lockButton() {
    this.addUserButton.element.classList.add(this.Constants.REGISTER_POPAP_BUTTON_BLOCKED_CLASS);
  }

  unlockButton() {
    this.addUserButton.element.classList.remove(this.Constants.REGISTER_POPAP_BUTTON_BLOCKED_CLASS);
  }
}

export { RegisterPopap as default };