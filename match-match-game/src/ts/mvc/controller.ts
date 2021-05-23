import { Card } from '../../components/game/card/card';
import { Database } from '../../components/Database/Database';
import { Model } from './model';
import { Validation } from '../../components/validation';
import { Constants } from '../../components/constants';
import { View } from './view';

export class Controller {
  public readonly View: View;

  public readonly Model: Model = new Model();

  public readonly Constants: Constants = new Constants();

  public readonly Validation: Validation = new Validation();

  public readonly registerFunction: () => void = () => this.showRegistrationPopap();

  public readonly headerButton: HTMLElement;

  public readonly Database: Database = new Database();

  constructor(rootElement: HTMLElement) {
    this.View = new View(rootElement);
    this.headerButton = this.View.Header.Wrapper.headerRightWrapper.headerButton.element;

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
    const avatar = this.View.Field.CardsField.RegisterPopap.UserImage;
    this.loadImage(avatar.input, avatar.img);
  };

  hideRegistrationPopap = () => {
    this.View.Field.deactivateShadowBox();
    this.View.Field.CardsField.RegisterPopap.hidePopap();
  };

  clearPopapInputs = () => {
    this.View.Field.CardsField.RegisterPopap.inputs.forEach((e) => {
      e.element.value = '';
      e.element.classList.remove('input_active');
      this.View.Field.CardsField.RegisterPopap.lockButton();
    });
  };

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
        this.changeLocation(location);
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
      this.View.Header.Wrapper.headerRightWrapper.showWaitingPlayer(this.Model.user.avatar);
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
    this.Database.addUser(this.Model.user);
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
    this.View.Header.Wrapper.Nav.element.addEventListener('click', () => this.stopGame(false, false), { once: true });
  };

  initFinalButtonListener = () => {
    const finishGameButton = this.View.Field.CardsField.Game.popap.finalPopapButton.element;
    finishGameButton.addEventListener('click', () => this.stopGame(true));
  };

  stopGame = (result?: boolean, defaultUrl?: boolean) => {
    if (result) {
      this.Model.secondsFromGameStart = this.View.Field.CardsField.Timer.minutes * 60 + this.View.Field.CardsField.Timer.seconds;
      this.Model.countUserScore();
      this.addUser2DataBase();
    }
    this.removeVictoryPopap();
    if (defaultUrl === undefined || defaultUrl === true) {
      window.location.hash = (result) ? '/score' : '/about';
    }

    this.View.Header.Wrapper.headerRightWrapper.showWaitingPlayer(this.Model.user.avatar);
    this.headerButton.addEventListener('click', this.startGame, { once: true });
  };

  changeLocation = (location: string) => {
    const cardsType = (this.Model.settings[0] !== this.Constants.settingsDefault[0]) ? this.Model.settings[0] : this.Constants.SettingsOptions[0][0];
    const settingsCardsNumber = +this.Model.settings[1].split('x')[0];

    switch (location) {

      case this.Constants.Pages.ABOUT_PAGE:
        this.View.Field.CardsField.makeAboutPage();
        break;

      case this.Constants.Pages.GAME_PAGE:
        this.View.Field.CardsField.makeGamePage(cardsType, settingsCardsNumber);
        this.initGameField();
        this.startViewAllCards();
        break;

      case this.Constants.Pages.SETTINGS_PAGE:
        this.View.Field.CardsField.makeSettingsPage();
        break;

      case this.Constants.Pages.SCORE_PAGE:
        this.View.Field.CardsField.makeBestScorePage();
        this.getUsers();
        break;

      default:
        this.View.Field.CardsField.makeAboutPage();
        break;
    }
  };

  initGameField = () => {
    this.Model.activeCards = [];
    this.Model.guessedCards = [];
    this.Model.comparissonNumber = 0;
    this.Model.wrongComparissonNumber = 0;

    const { Game } = this.View.Field.CardsField;
    Game.pictures.forEach((e, index) => {
      Game.cards.push(new Card(e));
      Game.element.append(Game.cards[index].element);
      Game.cards[index].element.addEventListener('click', () => this.flipCard(Game.cards[index]));
      Game.cards[index].element.classList.remove(...this.Constants.picturesClasses);
      Game.cards[index].element.classList.add(this.Constants.getPicturesClasses(Game.unicCardsNumber));
    });
  };

  flipCard = (CardClass: Card) => {
    CardClass.card.classList.toggle(this.Constants.FLIPPED_CLASS);
    CardClass.freezeCard();
    const activeCardsNumber = this.Model.activeCards.length;
    if (activeCardsNumber === 0) {
      this.Model.activeCards.push(CardClass.url);
    } else {
      this.compareCards(this.Model.activeCards[0], CardClass.url);
    }
    this.checkGameStatus();
  };

  compareCards = (firstElement: string, secondElement: string) => {
    this.View.Field.CardsField.Game.freezePictures();
    if (firstElement === secondElement) {
      this.Model.guessedCards.push(secondElement);
      this.View.Field.CardsField.Game.removeGuessedCards(secondElement);
    } else {
      this.View.Field.CardsField.Game.highlightWrongCards();
      this.Model.wrongComparissonNumber += 1;
    }
    this.Model.activeCards = [];
    this.Model.comparissonNumber += 1;
  };

  checkGameStatus = () => {
    if (this.checkVictory()) {
      setTimeout(() => this.showVictoryPopap(), this.Constants.cardRotationTime + this.Constants.cardWaitingTime);
    }
  };

  checkVictory = () => {
    return this.View.Field.CardsField.Game.cards.length / 2 === this.Model.guessedCards.length;
  };


  showVictoryPopap() {
    const { Game } = this.View.Field.CardsField;
    Game.element.append(Game.popap.element);
    this.View.Field.activateShadowBox();
    Game.popap.p.textContent = this.Constants.getFinalPopapText(this.View.Field.CardsField.Timer.getTime());
    this.View.Field.CardsField.Timer.stopTimer();
    this.initFinalButtonListener();
  }

  removeVictoryPopap = () => {
    const { Game } = this.View.Field.CardsField;
    Game.popap.element.classList.add(this.Constants.HIDDEN_FINAL_POPAP_CLASS);
    this.View.Field.deactivateShadowBox();
  };


  getUsers = () => {
    this.pullUsersFromDataBase().then((res) => this.View.Field.CardsField.Score.drawBestScorePage(res));
  };

  loadImage = (input: HTMLInputElement, image: HTMLImageElement) => {
    input.addEventListener('change', () => {
      const img = image;
      const fileInput = input;
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        img.src = String(reader.result);
      };
      reader.readAsDataURL(file);
      fileInput.value = null; // обнуляет значение input, чтобы можно было загрузить картинку дважды подряд
      this.addImage2Model(img);
    });
  };

  addImage2Model = (image: HTMLImageElement) => {
    const img = image;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.addEventListener('load', () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      const dataURL = canvas.toDataURL();
      this.Model.user.avatar = dataURL;
    });
  };

  startViewAllCards = () => {
    this.View.Field.CardsField.Game.cards.forEach((e) => {
      e.flipToFront();
      e.freezeCard();
    });
    const timeout = window.setTimeout(() => this.View.Field.CardsField.Game.cards.forEach((e) => {
      e.flipToBack();
      e.unfreezeCard(e.element);
    }), this.Constants.TIME_BEFORE_GAME_STARTS);
    this.removeStartTimeout(timeout);
  };

  removeStartTimeout = (timeout: number) => {
    window.addEventListener('hashchange', () => window.clearTimeout(timeout), { once: true });
  };

}