import { Constants } from './constants';
import { CardsField } from './field/cards-field/cards-field';

export class Router {
  public Constants: Constants = new Constants();

  changeLocation(location: string, field: CardsField) {
    switch (location) {
      case this.Constants.Pages.ABOUT_PAGE:
        field.makeAboutPage();
        break;
      case this.Constants.Pages.GAME_PAGE:
        field.makeGamePage();

        break;
      case this.Constants.Pages.SETTINGS_PAGE:
        field.makeSettingsPage();
        break;
      case this.Constants.Pages.SCORE_PAGE:
        field.makeBestScorePage();
        break;
      default:
        field.makeAboutPage();
        break;
    }
  }
}