interface user {
  name: string,
  surname: string,
  email: string,
  score: number,
  avatar: string
}

export class Model {
  public players: string[] = [];
  public role: string = "guest";
  public settings: string[] = ["Animals", "4x4"];
  public activeCards: string[] = [];
  public guessedCards: string[];
  public user: user = {
    name: "",
    surname: "",
    email: "",
    score: 0,
    avatar: ""
  };
  public comparissonNumber: number = 0;
  public wrongComparissonNumber: number = 0;
  public secondsFromGameStart: number;


  setUserName = (name: string) => {
    this.user.name = name;
  }

  setUserSurname = (surname: string) => {
    this.user.surname = surname;
  }

  setUserEmail = (email: string) => {
    this.user.email = email;
  }

  countUserScore = () => {
    const firstPoints = (this.comparissonNumber - this.wrongComparissonNumber) * 100 - this.secondsFromGameStart * 10;
    this.user.score = (firstPoints > 0) ? firstPoints : 0;
  }
}