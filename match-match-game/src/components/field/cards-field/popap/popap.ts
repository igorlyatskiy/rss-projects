import { Checkbox } from './checkbox/checkbox';
import { Button } from './../../../defaultButton/defaultButton';
import { UserImage } from './userImage';
import { Input } from './input/input';
import { Constants } from './../../../constants';
import { BaseComponent } from './../../../base-component';
import "./assets/bootstrap.css";
import "./popap.sass";
export class RegisterPopap extends BaseComponent {
  public readonly Constants: Constants;
  public readonly inputs: Input[] = [];
  public readonly div: HTMLElement[] = [];
  public readonly addUserButton: Button = new Button("Add user");
  public readonly cancelButton: Button = new Button("Cancel");
  public readonly UserImage: UserImage;
  public readonly Checkbox: Checkbox[] = [];
  constructor() {
    super("div", ["register-popap"]);
    this.Constants = new Constants();

    const title = this.makeElement("p", ["popap__title"], "Register new Player");
    this.element.append(title);

    this.initInputs();

    this.UserImage = new UserImage();
    this.element.append(this.UserImage.element);

    this.addUserButton.element.classList.add("popap__add-user");
    this.cancelButton.element.classList.add("popap__cancel");

    this.element.append(this.addUserButton.element);
    this.element.append(this.cancelButton.element);
  }

  showPopap() {
    this.element.classList.add("register-popap_active");
  }

  hidePopap() {
    this.element.classList.remove("register-popap_active");
  }

  initInputs() {
    const inputsContainer = this.makeElement("div", ["inputs-container"], "");
    this.element.append(inputsContainer);
    this.Constants.popapTitles.forEach((e, index) => {
      const div = this.makeElement("div", ["container"], "");
      this.div.push(div);
      inputsContainer.append(this.div[index]);
      const input = new Input();
      this.div[index].append(input.element);
      this.inputs.push(input);
      const checkbox = new Checkbox();
      this.div[index].append(checkbox.element);
      this.Checkbox.push(checkbox);
      this.div[index].append(this.makeElement("p", ["popap__p"], e));
    });
  }
}