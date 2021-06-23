import defaultPlayerImage from '../img/svg/defaultUserImage.svg';

export interface PlayerType {
  name: string,
  number: number,
  image: string,
}
export interface ReduxAction {
  type: string,
  payload: object | string
}

export interface UserAction extends ReduxAction {
  payload: {
    name: string,
    id: number
  }
}

export default class Constants {
  static reduxActions: string[] = [];
  static defaultPlayers: PlayerType[] = [
    {
      name: 'Player 1',
      number: 1,
      image: defaultPlayerImage,
    },
    {
      name: 'Player 2',
      number: 2,
      image: defaultPlayerImage
    }
  ];

}
