import { Constants } from './constants';
import { CardsField } from './field/cards-field/cards-field';
export class Router {
  public Constants: Constants = new Constants();
  changeLocation(location: string, field: CardsField) {
    switch (location) {
      case this.Constants.pages.ABOUT_PAGE:
        field.makeAboutPage();
        break;
      case this.Constants.pages.GAME_PAGE:
        field.makeGamePage();

        break;
      case this.Constants.pages.SETTINGS_PAGE:
        field.makeSettingsPage();
        break;
      case this.Constants.pages.SCORE_PAGE:
        field.makeBestScorePage();
        break;
      default:
        field.makeAboutPage();
        break;
    }
  }
}