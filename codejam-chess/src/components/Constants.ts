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

export default class Constants {
  static fireBaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MID,
  }
  static NOT_AI_PLAYER_ID = 1;
  static PVP_OFFLINE_NAME = 'pvp-offline'
  static PVP_ONLINE_NAME = 'pvp-offline'
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
