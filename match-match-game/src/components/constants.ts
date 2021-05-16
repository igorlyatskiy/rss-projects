export class Constants {
  public readonly cardTimeout: number;
  public readonly infoCardsNumber: number;
  public readonly infoCardsImages: string[];
  public readonly infoCardsText: string[];
  public readonly popapTitles: string[];
  constructor() {
    this.cardTimeout = 200;
    this.infoCardsNumber = 3;
    this.infoCardsImages = ["./img/first.png", "./img/second.png", "./img/third.png"];
    this.infoCardsText = ["Register new player in game", "Configure your game settings", "Start you new game! Remember card positions and match it before times up."];
    this.popapTitles = ["First Name", "Last Name", "E-mail"];
  }
}