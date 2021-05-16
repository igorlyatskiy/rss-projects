import { registerButton } from './../../components/header/wrapper/headerRightWrapper/buttons/registerButton';
import { Model } from './../../Model/Model';
import { View } from './view';
export class Controller {
  public readonly View: View = new View(document.body);
  public readonly Model: Model = new Model();
  constructor() {
    const registerButton = this.View.Header.Wrapper.headerRightWrapper.registerButton.element;
    const shadow = this.View.Field.shadowBox;
    const clearRegistrationButton = this.View.Field.CardsField.RegisterPopap.cancelButton.element;

    registerButton.addEventListener("click", () => this.showRegistrationPopap());
    shadow.addEventListener("click", () => this.hideRegistrationPopap());
    clearRegistrationButton.addEventListener("click", () => this.clearPopapInputs());

  }
  showRegistrationPopap() {
    this.View.Field.activateShadowBox();
    this.View.Field.CardsField.RegisterPopap.showPopap()
  }

  hideRegistrationPopap() {
    this.View.Field.deactivateShadowBox();
    this.View.Field.CardsField.RegisterPopap.hidePopap()
  }

  clearPopapInputs() {
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => e.element.value = "");
  }

  checkInputs() {
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => e.element.value = "");
  }

}