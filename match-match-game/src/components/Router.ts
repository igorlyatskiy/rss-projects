import { CardsField } from './field/cards-field/cards-field';
export class Router {
  changeLocation(location: string, field: CardsField) {
    switch (location) {
      case "#/about":
        field.makeAboutPage();
        break;
      case "#/game":
        field.makeGamePage();

        break;
      case "#/settings":
        field.makeSettingsPage();
        break;
      case "#/score":
        field.makeBestScorePage();
        break;
      default:
        field.makeAboutPage();
        break;
    }
  }
}