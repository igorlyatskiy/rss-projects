import defaultPlayerImage from '../img/svg/defaultUserImage.svg';

export interface PlayerData {
  name: string,
  id: number,
  image: string,
}
export interface ReduxAction {
  type: string,
  payload: object | string
}

export interface Color {
  color: 'black' | 'white'
}

export interface UserAction extends ReduxAction {
  payload: {
    name: string,
    id: number
  }
}

export interface PopapContainerProps {
  id: number;
  name: string;
  setNameFunc: (name: string, id: number) => {};
  status: boolean
  hidePopapFunc: () => void
}

export default class Constants {
  static activeChangeNamePopapClassname: string = 'main-page-popap-background_active';
  static mainPagePopapContainerClassName: string = 'main-page-popap-container';
  static reduxActions: string[] = [];
  static defaultPlayers: PlayerData[] = [
    {
      name: 'Player 1',
      id: 1,
      image: defaultPlayerImage,
    },
    {
      name: 'Player 2',
      id: 2,
      image: defaultPlayerImage
    }
  ];
}
