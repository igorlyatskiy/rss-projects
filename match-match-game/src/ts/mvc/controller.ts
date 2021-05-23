import { Database } from '../../components/Database/Database';
import { Model } from './model';
import { Router } from '../../components/Router';
import { Validation } from '../../components/validation';
import { Constants } from '../../components/constants';
import { View } from './view';

export class Controller {
  public readonly View: View = new View(document.createElement('div'));

  public readonly Model: Model = new Model();

  public readonly Constants: Constants = new Constants();

  public readonly Validation: Validation = new Validation();

  public readonly Router: Router = new Router();

  public readonly registerFunction: () => void = () => this.showRegistrationPopap();

  public readonly headerButton: HTMLElement = this.View.Header.Wrapper.headerRightWrapper.headerButton.element;

  public readonly Database: Database = new Database();

  constructor() {
    const shadow = this.View.Field.shadowBox;
    const clearRegistrationButton = this.View.Field.CardsField.RegisterPopap.cancelButton.element;
    const { inputs } = this.View.Field.CardsField.RegisterPopap;

    this.headerButton.addEventListener('click', this.registerFunction);
    shadow.addEventListener('click', this.hideRegistrationPopap);
    clearRegistrationButton.addEventListener('click', () => this.clearPopapInputs());
    inputs.forEach((e) => e.element.addEventListener('input', () => this.checkInputs()));

    this.initRouter();
    this.clickHomeButton();
    this.registerUser();
    this.checkSettingsPage();

  }


  showRegistrationPopap = () => {
    this.View.Field.activateShadowBox();
    this.View.Field.CardsField.RegisterPopap.showPopap();
  };

  hideRegistrationPopap = () => {
    this.View.Field.deactivateShadowBox();
    this.View.Field.CardsField.RegisterPopap.hidePopap();
  };

  clearPopapInputs() {
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {
      e.element.value = '';
      e.element.classList.remove('input_active');
      this.View.Field.CardsField.RegisterPopap.lockButton();
    });
  }

  checkInputs() {
    this.View.Field.CardsField.RegisterPopap.unlockButton();
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {

      if (e.element.getAttribute('type') === 'text') {
        this.Validation.checkText(e.element);
      } else {
        this.Validation.checkEmail(e.element);
      }

      if (!e.element.classList.contains('input_active')) {
        this.View.Field.CardsField.RegisterPopap.lockButton();
      }
    });
  }

  initRouter() {
    window.location.hash = this.Constants.Pages.ABOUT_PAGE;
    window.addEventListener('hashchange', () => {

      const PLAYER_ROLE_NAME = 'player';
      const location = window.location.hash;


      this.View.Header.Wrapper.Nav.changeActiveElement(this.Constants.NavLinks.indexOf(location.substr(2, +location.length - 1)));

      if (location && location !== this.Constants.Pages.GAME_PAGE || location && location === this.Constants.Pages.GAME_PAGE && this.Model.role === PLAYER_ROLE_NAME) {
        this.Router.changeLocation(location, this.View.Field.CardsField);
      }
    });
    this.controlRouter();
  }

  controlRouter() {
    this.Constants.NavImages.forEach((e, index) => {
      this.View.Header.Wrapper.Nav.navElementsList[index].element.addEventListener('click', () => {
        window.location.hash = `/${this.Constants.NavLinks[index]}`;
      },
      );
    });
  }

  registerUser = () => {
    this.View.Field.CardsField.RegisterPopap.addUserButton.element.addEventListener('click', () => {
      window.location.hash = '/about';
      this.View.Field.deactivateShadowBox();
      this.View.Field.CardsField.RegisterPopap.hidePopap();
      this.headerButton.removeEventListener('click', this.registerFunction);
      this.View.Header.Wrapper.headerRightWrapper.showWaitingPlayer();
      this.Model.role = 'player';
      this.Model.setUserName(this.View.Field.CardsField.RegisterPopap.inputs[0].element.value);
      this.Model.setUserSurname(this.View.Field.CardsField.RegisterPopap.inputs[1].element.value);
      this.Model.setUserEmail(this.View.Field.CardsField.RegisterPopap.inputs[2].element.value);
      this.headerButton.addEventListener('click', this.startGame, { once: true });
    }, { once: true });
  };

  clickHomeButton() {
    this.View.Header.Wrapper.logo.addEventListener('click', () => {
      window.location.hash = `/${this.Constants.NavLinks[0]}`;
      this.View.Header.Wrapper.Nav.changeActiveElement(0);
    });
  }

  checkSettingsPage() {
    const inputs = this.View.Field.CardsField.settingsPage.Inputs;
    inputs.forEach((e) => {
      e.element.addEventListener('change', () => {
        this.Model.settings[inputs.indexOf(e)] = e.element.value;
      });
    });
  }

  addUser2DataBase() {
    this.Database.addUser();
  }

  pullUsersFromDataBase() {
    return this.Database.pullUsersList();
  }

  startGame = () => {
    this.View.Header.Wrapper.Nav.changeActiveElement(5);
    window.location.hash = '/game';
    this.View.Header.Wrapper.headerRightWrapper.showActivePlayer();
    this.View.Field.shadowBox.removeEventListener('click', this.hideRegistrationPopap);
    this.headerButton.addEventListener('click', () => this.stopGame(), { once: true });

  };

  initFinalButtonListener = () => {
    const finishGameButton = this.View.Field.CardsField.Game.popap.finalPopapButton.element;
    finishGameButton.addEventListener('click', () => this.stopGame(true));
  };

  stopGame = (result?: boolean) => {
    if (result) {
      this.Model.secondsFromGameStart = this.View.Field.CardsField.Timer.minutes * 60 + this.View.Field.CardsField.Timer.seconds;
      this.Model.countUserScore();
      this.addUser2DataBase();
    }
    this.View.Field.CardsField.Game.removeVictoryPopap();
    window.location.hash = (result) ? '/score' : '/about';

    this.View.Header.Wrapper.headerRightWrapper.showWaitingPlayer();
    this.headerButton.addEventListener('click', this.startGame, { once: true });
  };

}