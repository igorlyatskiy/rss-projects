import axios from "axios";
import React from "react";
import Constants, { HistoryAction, PlayerData } from "../../../Constants";
import ReplayFieldContainer from "../Containers/ReplayFieldContainer";
import ReplayPlayerViewContainer from "../Containers/ReplayPlayerViewContainer";
import "./ReplayPlayer.sass";

interface ReplayPlayerState {
  data: HistoryData | null;
}

interface HistoryData {
  history: HistoryAction[];
  winner: number;
  names: PlayerData[];
}

interface ReplayPlayerProps {
  id: string;
  gamePage: string;
  speed: number;
  changePlayers: (data: unknown) => void;
  slowFigureMove: (data: unknown) => void;
  cleanSlowFigureMove: () => void;
  startReplay: () => void;
  increaseTime: () => void;
  changeReplayWinner: (id: number) => void;
  setWinner: (id: number) => void;
  winnerId: number;
}

export default class ReplayPlayer extends React.PureComponent<ReplayPlayerProps, ReplayPlayerState> {
  public timerFunctionExists = false;
  public activeMovementTime = -1;
  public timeoutsArray: number[] = [];
  constructor(props: ReplayPlayerProps) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount = async () => {
    const { id, changePlayers, changeReplayWinner, gamePage } = this.props;
    if (gamePage === Constants.APP_PAGES.REPLAY) {
      const responce = await this.getHistoryData(id);
      if (responce.status === 200) {
        this.setState({
          data: responce.data,
        });
        changePlayers(responce.data.names);
        if (!this.timerFunctionExists) {
          this.initTimerFunction();
        }
        changeReplayWinner(responce.data.winner);
      }
    }
  };

  getHistoryData = (id: string) => {
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/history?id=${id}`;
    return axios.get(url);
  };

  initTimerFunction = () => {
    const { startReplay } = this.props;
    const { data } = this.state;
    const { history } = data as HistoryData;
    startReplay();
    this.initInterval();
    this.makeRecursiveFigureMovement(history, 0);
  };

  initInterval = () => {
    const { increaseTime, speed, gamePage, winnerId } = this.props;
    if (gamePage === Constants.APP_PAGES.REPLAY && winnerId !== 1 && winnerId !== 2) {
      setTimeout(() => {
        increaseTime();
        this.initInterval();
      }, 1000 / speed);
    }
  };

  makeRecursiveFigureMovement = (history: HistoryAction[], number: number) => {
    const { gamePage, setWinner } = this.props;
    const { data } = this.state;
    const winner = data?.winner;
    if (history[number] !== undefined && gamePage === Constants.APP_PAGES.REPLAY) {
      const { slowFigureMove, speed } = this.props;
      const timeOut = number === 0 ? history[0].time : history[number].time - history[number - 1].time;
      this.timeoutsArray.push(
        window.setTimeout(() => {
          slowFigureMove(history[number].move);
          this.makeRecursiveFigureMovement(history, number + 1);
          if (number === history.length - 1) {
            setWinner(winner as number);
          }
        }, (timeOut * 1000) / speed)
      );
    }
  };

  render() {
    const { data } = this.state;
    return data !== null ? (
      <section className='game-page'>
        <ReplayPlayerViewContainer propsColor='w' />
        <ReplayFieldContainer />
        <ReplayPlayerViewContainer propsColor='b' />
      </section>
    ) : (
      <div className='error'>error</div>
    );
  }
}
