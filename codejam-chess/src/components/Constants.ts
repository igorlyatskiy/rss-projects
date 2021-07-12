import defaultPlayerImage from '../img/svg/defaultUserImage.svg';

export interface PlayerData extends Color {
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

export interface HistoryAction {
  move: HistoryMove,
  time: number
}

interface HistoryMove {
  from: string,
  to: string
}

export interface PopapContainerProps {
  id: number;
  name: string;
  inputContext: string;
  setNameFunc: (name: string, id: number) => {};
  status: boolean
  isBtnBlocked: boolean
  hidePopapFunc: () => void
  changePopapInputValueFunc: (value: string) => void
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

export interface GameRoom {
  id: string,
  players: PlayerData[],
  isGameActive: boolean,
  name: string,
  game: StoreGame
}

interface StoreGame {
  isGameProcessActive: boolean,
  gameType: string
}

export default class Constants {
  static NOT_AI_PLAYER_ID = 1;
  static PVP_OFFLINE_NAME = 'pvp-offline'
  static PVP_ONLINE_NAME = 'pvp-online'
  static AI_NAME = 'ai'
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
      color: 'w'
    },
    {
      name: 'Player 2',
      id: 2,
      image: defaultPlayerImage,
      color: 'b'
    }
  ];
  static startTimeValue = -1;
  static squareSize = 91;
  static rowNumbers = 8;
  static BOARD_ROTATION_TIME = 1200
}
