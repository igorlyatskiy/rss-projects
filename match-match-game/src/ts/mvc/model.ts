import Constants from '../../components/constants';

interface User {
  name: string,
  surname: string,
  email: string,
  score: number,
  avatar: string
}
class Model {

  public Constants: Constants = new Constants();

  public role: string = 'guest';

  public settings: string[] = ['Animals', '4x4'];

  public activeCards: string[] = [];

  public guessedCards: string[];

  public user: User = {
    name: '',
    surname: '',
    email: '',
    score: 0,
    avatar: this.Constants.DEFAULT_USER_LINK,
  };

  public comparissonNumber: number = 0;

  public wrongComparissonNumber: number = 0;

  public secondsFromGameStart: number;


  setUserName = (name: string) => {
    this.user.name = name;
  };

  setUserSurname = (surname: string) => {
    this.user.surname = surname;
  };

  setUserEmail = (email: string) => {
    this.user.email = email;
  };

  countUserScore = () => {
    const firstPoints = (this.comparissonNumber - this.wrongComparissonNumber) * 100 - this.secondsFromGameStart * 10;
    this.user.score = (firstPoints > 0) ? firstPoints : 0;
  };
}

export { Model as default };