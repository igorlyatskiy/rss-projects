import { Model } from './model';
import { Router } from './../../components/Router';
import { Validation } from './../../components/validation';
import { Constants } from './../../components/constants';
import { View } from './view';

export class Controller {
  public readonly View: View = new View(document.body);
  public readonly Model: Model = new Model();
  public readonly Constants: Constants = new Constants();
  public readonly Validation: Validation = new Validation();
  public readonly Router: Router = new Router();
  public readonly registerFunction: () => void = () => this.showRegistrationPopap()
  public readonly headerButton: HTMLElement = this.View.Header.Wrapper.headerRightWrapper.headerButton.element;

  constructor() {
    const shadow = this.View.Field.shadowBox;
    const clearRegistrationButton = this.View.Field.CardsField.RegisterPopap.cancelButton.element;
    const inputs = this.View.Field.CardsField.RegisterPopap.inputs;

    this.headerButton.addEventListener("click", this.registerFunction);
    shadow.addEventListener("click", () => this.hideRegistrationPopap());
    clearRegistrationButton.addEventListener("click", () => this.clearPopapInputs());
    inputs.forEach((e) => e.element.addEventListener("input", () => this.checkInputs()));

    this.initRouter();
    this.clickHomeButton();
    this.registerUser()
    this.checkSettingsPage()
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
    this.View.Field.CardsField.RegisterPopap.unlockButton()
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {
      (e.element.getAttribute("type") === "text") ? this.Validation.checkText(e.element) : this.Validation.checkEmail(e.element);
      (!e.element.classList.contains("input_active")) ? this.View.Field.CardsField.RegisterPopap.lockButton() : 0;
    });
  }

  initRouter() {
    window.location.hash = "#/about";
    window.addEventListener("hashchange", () => {
      const location = window.location.hash;
      console.log(location);
      (location && location !== "#/game" || location && location === "#/game" && this.Model.role === "player") ? this.Router.changeLocation(location, this.View.Field.CardsField) : 0;
    });
    this.controlRouter();
  }
  controlRouter() {
    this.Constants.NavImages.forEach((e, index) => {
      this.View.Header.Wrapper.Nav.navElementsList[index].element.addEventListener("click", () => {
        this.View.Header.Wrapper.Nav.changeActiveElement(index);
        window.location.hash = `/${this.Constants.NavLinks[index]}`
      }
      );
    });
  }

  registerUser = () => {
    this.View.Field.CardsField.RegisterPopap.addUserButton.element.addEventListener("click", () => {
      window.location.hash = `/about`;
      this.View.Field.deactivateShadowBox();
      this.View.Field.CardsField.RegisterPopap.hidePopap()
      this.headerButton.removeEventListener("click", this.registerFunction);
      this.View.Header.Wrapper.headerRightWrapper.showPlayer()
      this.Model.role = "player";
      // this.addUser2DataBase();
      this.headerButton.addEventListener("click", this.startGame, { once: true });
    }, { once: true });
  }

  clickHomeButton() {
    this.View.Header.Wrapper.logo.addEventListener("click", () => {
      window.location.hash = `/${this.Constants.NavLinks[0]}`;
      this.View.Header.Wrapper.Nav.changeActiveElement(0);
    });
  }

  checkSettingsPage() {
    const inputs = this.View.Field.CardsField.settingsPage.Inputs
    inputs.forEach((e, index) => {
      e.element.addEventListener("change", () => {
        this.Model.settings[inputs.indexOf(e)] = e.element.value;
        console.log(this.Model);
      });
    })
  }

  addUser2DataBase() {

  }

  startGame() {
    window.location.hash = `/game`;
  }

}