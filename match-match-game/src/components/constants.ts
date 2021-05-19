interface pages {
  ABOUT_PAGE: string;
  SCORE_PAGE: string;
  SETTINGS_PAGE: string;
  GAME_PAGE: string;
}

export class Constants {
  public readonly infoCardsNumber: number;
  public readonly infoCardsImages: string[];
  public readonly infoCardsText: string[];
  public readonly infoCardsHeight: string[] = ["230px", "132px", "240px"];
  public readonly popapTitles: string[];
  public readonly registerInfo: string[];
  public readonly forbiddenSymbols: string[];
  public readonly NavImages: string[] = ["./img/aboutGame.svg", "./img/bestScore.svg", "./img/gameSettings.svg"];
  public readonly NavText: string[] = ["About Game", "Best Score", "Game Settings"];
  public readonly NavClass: string[] = ["aboutGame", "bestScore", "gameSettings"];
  public readonly NavLinks: string[] = ["about", "score", "settings"];
  public readonly SettingsTitle: string[] = ["Game cards", "Difficulty"];
  public readonly SettingsContent: string[] = ["select game cards type", "select game type"];
  public readonly SettingsOptions: string[][] = [["Animals", "Cars"], ["4x4", "6x6"]];
  public readonly settingsDefault: string[] = ["select game cards type"];
  public readonly picturesClasses: string[] = ["card-container_big", "card-container_small",];
  public readonly cardWaitingTime: number = 3000;
  public readonly cardRotationTime: number = 300;
  public readonly finalPopapText: string = "Congratulations! You successfully found all matches on 1.21 minutes.";
  public readonly pages: pages = {
    ABOUT_PAGE: "#/about",
    SCORE_PAGE: "#/score",
    SETTINGS_PAGE: "#/settings",
    GAME_PAGE: "#/game",
  }

  public readonly pictures: string[] = [
    "../../img/beetle.png",
    "../../img/buffalo.png",
    "../../img/bullfinch.png",
    "../../img/butterfly.png",
    "../../img/cat.png",
    "../../img/deer.png",
    "../../img/cow.png",
    "../../img/crab.png",
    "../../img/frog.png",
    "../../img/pig.png",
    "../../img/turtle.png",
    "../../img/lion.png",
    "../../img/owl.png",
    "../../img/parrot.png",
    "../../img/rhino.png",
    "../../img/snake.png",
    "../../img/spider.png",
    "../../img/squid.png",

  ]

  constructor() {
    this.infoCardsNumber = 3;
    this.infoCardsImages = ["./img/first.png", "./img/second.png", "./img/third.png"];
    this.infoCardsText = ["Register new player in game", "Configure your game settings", "Start you new game! Remember card positions and match it before times up."];
    this.popapTitles = ["First Name", "Last Name", "E-mail"];
    this.registerInfo = ["text", "text", "email"];
    this.forbiddenSymbols = "(~ ! @ # $ % * () _ — + = | : ; ' ` < > , . ? / ^)".split(" ");
    this.forbiddenSymbols.push(`"`);
  }

  getPicturesClasses(number: number) {
    switch ((number)) {
      case 4:
        return this.picturesClasses[0]
        break;
      case 6:
        return this.picturesClasses[1]
        break;
      default:
        return this.picturesClasses[0]
        break;
    }
  }

  getFinalPopapText(text: string) {
    return `Congratulations! You successfully found all matches on ${text} minutes.`
  }
}