import defaultPlayerImage from '../img/svg/defaultUserImage.svg';

export interface PlayerData {
  name: string,
  id: number,
  image: string,
}
export interface ReduxAction {
  type: string,
  payload: object | string | boolean
}

export interface Color {
  color: 'b' | 'w'
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

export interface FigureData extends Color {
  type: string,
}

export interface HistoryElement {
  color: string,
  from: string,
  to: string,
  flag: string,
  piece: string,
  san: string
}

export default class Constants {
  static FIGURES_NAMES = {
    BISHOP: 'b',
    KING: 'k',
    KNIGHT: 'n',
    PAWN: 'p',
    QUEEN: 'q',
    ROOK: 'r'
  }
  static FIGURES_COLORS_NAMES = {
    black: 'b',
    white: 'w'
  }
  static letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  static numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
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
  static startTimeValue = -1;
  static squareSize = 91;
  static rowNumbers = 8;
}
