interface Pages {
  ABOUT_PAGE: string;
  SCORE_PAGE: string;
  SETTINGS_PAGE: string;
  GAME_PAGE: string;
}

export interface UserType {
  name: string,
  surname: string,
  email: string,
  score: number,
  avatar: string
}

export class Constants {
  public readonly TIME_BEFORE_GAME_STARTS = 30000;

  public readonly DEFAULT_CARDS_NUMBER: number = 4;

  public readonly FLIPPED_CLASS: string = 'card_flipped';

  public readonly GUESSED_CLASS: string = 'card-container_guessed';

  public readonly WRONG_CLASS: string = 'card_wrong';

  public readonly BLOCKED_CLASS: string = 'card-container_blocked';

  public readonly HIDDEN_FINAL_POPAP_CLASS: string = 'popap_hidden';

  public readonly topPlayersNumber: number = 10;

  public readonly infoCardsNumber: number;

  public readonly infoCardsImages: string[];

  public readonly infoCardsText: string[];

  public readonly infoCardsHeight: string[] = ['230px', '132px', '240px'];

  public readonly popapTitles: string[];

  public readonly registerInfo: string[];

  public readonly forbiddenSymbols: string[];

  public readonly NavImages: string[] = ['./img/aboutGame.svg', './img/bestScore.svg', './img/gameSettings.svg'];

  public readonly NavText: string[] = ['About Game', 'Best Score', 'Game Settings'];

  public readonly NavClass: string[] = ['aboutGame', 'bestScore', 'gameSettings'];

  public readonly NavLinks: string[] = ['about', 'score', 'settings'];

  public readonly SettingsTitle: string[] = ['Game cards', 'Difficulty'];

  public readonly SettingsContent: string[] = ['select game cards type', 'select game type'];

  public readonly SettingsOptions: string[][] = [['Animals', 'Transport'], ['4x4', '6x6']];

  public readonly settingsDefault: string[] = ['select game cards type'];

  public readonly picturesClasses: string[] = ['card-container_big', 'card-container_small'];

  public readonly cardWaitingTime: number = 3000;

  public readonly cardRotationTime: number = 300;

  public readonly finalPopapText: string = 'Congratulations! You successfully found all matches on 1.21 minutes.';

  public readonly Pages: Pages = {
    ABOUT_PAGE: '#/about',
    SCORE_PAGE: '#/score',
    SETTINGS_PAGE: '#/settings',
    GAME_PAGE: '#/game',
  };

  public readonly animalPictures: string[] = [
    '../../img/beetle.png',
    '../../img/buffalo.png',
    '../../img/bullfinch.png',
    '../../img/butterfly.png',
    '../../img/cat.png',
    '../../img/deer.png',
    '../../img/cow.png',
    '../../img/crab.png',
    '../../img/frog.png',
    '../../img/pig.png',
    '../../img/turtle.png',
    '../../img/lion.png',
    '../../img/owl.png',
    '../../img/parrot.png',
    '../../img/rhino.png',
    '../../img/snake.png',
    '../../img/spider.png',
    '../../img/squid.png',
  ];

  public readonly TransportPictures: string[] = [
    '../../img/bike.png',
    '../../img/trailer.png',
    '../../img/porsche.png',
    '../../img/scooter.png',
    '../../img/skateboard.png',
    '../../img/mustang.png',
    '../../img/volkswagen.png',
    '../../img/truck.png',
    '../../img/airplane.png',
    '../../img/tanker-truck.png',
    '../../img/helicopter.png',
    '../../img/ship.png',
    '../../img/zeppelin.png',
    '../../img/dragster.png',
    '../../img/jet-ski.png',
    '../../img/crane.png',
    '../../img/hot-air-balloon.png',
    '../../img/yacht.png',
  ];

  constructor() {
    this.infoCardsNumber = 3;
    this.infoCardsImages = ['./img/first.png', './img/second.png', './img/third.png'];
    this.infoCardsText = ['Register new player in game', 'Configure your game settings', 'Start you new game! Remember card positions and match it before times up.'];
    this.popapTitles = ['First Name', 'Last Name', 'E-mail'];
    this.registerInfo = ['text', 'text', 'email'];
    this.forbiddenSymbols = "( ~ ! @ # $ % * () _ — + = | : ; ' ` < > , . ? / ^ )".split(' ');
    this.forbiddenSymbols.push('"');
  }

  getPicturesClasses(number: number) {
    switch ((number)) {
      case 4:
        return this.picturesClasses[0];
        break;
      case 6:
        return this.picturesClasses[1];
        break;
      default:
        return this.picturesClasses[0];
        break;
    }
  }

  getFinalPopapText = (text: string) => {
    return `Congratulations! You successfully found all matches on ${text} minutes.`;
  };

  getAnimalPictures = (type: string) => {
    switch (type) {
      case 'Animals':
        return this.animalPictures;
        break;

      case 'Transport':
        return this.TransportPictures;
        break;

      default:
        return this.animalPictures;
        break;
    }
  };
}