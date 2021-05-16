import { Router } from './../../components/Router';
import { Validation } from './../../components/validation';
import { Constants } from './../../components/constants';
import { Model } from './../../Model/Model';
import { View } from './view';

export class Controller {
  public readonly View: View = new View(document.body);
  public readonly Model: Model = new Model();
  public readonly Constants: Constants = new Constants();
  public readonly Validation: Validation = new Validation();
  public readonly Router: Router = new Router();

  constructor() {
    const registerButton = this.View.Header.Wrapper.headerRightWrapper.registerButton.element;
    const shadow = this.View.Field.shadowBox;
    const clearRegistrationButton = this.View.Field.CardsField.RegisterPopap.cancelButton.element;
    const inputs = this.View.Field.CardsField.RegisterPopap.inputs;

    registerButton.addEventListener("click", () => this.showRegistrationPopap());
    shadow.addEventListener("click", () => this.hideRegistrationPopap());
    clearRegistrationButton.addEventListener("click", () => this.clearPopapInputs());
    inputs.forEach((e) => e.element.addEventListener("input", () => this.checkInputs()));
    this.initRouter();
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
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {
      e.element.value = "";
      e.element.classList.remove("input_active");
      this.View.Field.CardsField.RegisterPopap.lockButton();
    });
  }
  checkInputs() {
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {
      (e.element.getAttribute("type") === "text") ? this.Validation.checkText(e.element) : this.Validation.checkEmail(e.element);
      (!e.element.classList.contains("input_active")) ? this.View.Field.CardsField.RegisterPopap.lockButton() : this.View.Field.CardsField.RegisterPopap.unlockButton();
    });
  }
  initRouter() {
    window.location.hash = "#/about";
    window.addEventListener("hashchange", () => {
      const location = window.location.hash;
      (location) ? this.Router.changeLocation(location, this.View.Field.CardsField) : 0;
    });
    this.controlRouter();
  }

  controlRouter() {
    this.Constants.NavImages.forEach((e, index) => {
      this.View.Header.Wrapper.Nav.navElementsList[index].element.addEventListener("click", () => {
        this.View.Header.Wrapper.Nav.navElementsList.forEach((el) => el.element.classList.remove("nav__element_active"));
        this.View.Header.Wrapper.Nav.navElementsList[index].element.classList.add("nav__element_active");
        window.location.hash = `/${this.Constants.NavLinks[index]}`
      }
      );
    });
  }

}