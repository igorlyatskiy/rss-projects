require('dotenv').config()

export interface TimerInfo {
  roomId: number,
  timerInterval: NodeJS.Timeout
}

export interface PlayerData extends Color {
  name: string,
  id: number,
  image: string,
}
export interface Color {
  color: 'b' | 'w'
}

export const AI_NAME = 'ai';

export const fireBaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MID,
}