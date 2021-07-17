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
  time: number;
}

export default class ReplayPlayer extends React.PureComponent<ReplayPlayerProps, ReplayPlayerState> {
  public timerFunctionExists = false;
  public activeMovementTime = -1;
  public timeoutsArray: number[] = [];
  public lastMoveTime = -1;
  constructor(props: ReplayPlayerProps) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount = async () => {
    console.log("mount");
    const { id, changePlayers, changeReplayWinner, gamePage } = this.props;
    if (gamePage === Constants.APP_PAGES.REPLAY) {
      const responce = await this.getHistoryData(id);
      if (responce.status === 200) {
        this.setState({
          data: responce.data,
        });
        console.log(responce.data);
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
    console.log(history.map((e) => e.move));
    startReplay();
    this.initInterval();
    this.makeRecursiveFigureMovement(history, 0);
  };

  initInterval = () => {
    const { increaseTime, speed, gamePage, time } = this.props;
    const { data } = this.state;
    const { history } = data as HistoryData;
    let timeout;
    if (time <= history[history.length - 1].time && gamePage === Constants.APP_PAGES.REPLAY) {
      timeout = setTimeout(() => {
        increaseTime();
        this.initInterval();
      }, 1000 / speed);
    } else {
      clearTimeout(timeout);
    }
  };

  makeRecursiveFigureMovement = (history: HistoryAction[], moveNumber: number) => {
    let newMoveNumber = moveNumber;
    const { gamePage, time, speed } = this.props;
    const BASE_TIMEOUT_TIME = 100;
    const { setWinner } = this.props;
    const { data } = this.state;
    const winner = data?.winner;
    let isFigureMoved = false;
    if (moveNumber < history.length && gamePage === Constants.APP_PAGES.REPLAY) {
      const { slowFigureMove } = this.props;
      if (history[moveNumber].time <= time) {
        const { move } = history[moveNumber];
        slowFigureMove(move);
        newMoveNumber += 1;
        isFigureMoved = true;
      }
      if (time === +history[history.length - 1].time) {
        setWinner(winner as number);
      }
      if (isFigureMoved) {
        window.setTimeout(() => {
          this.timeoutsArray.push(
            window.setTimeout(() => {
              this.makeRecursiveFigureMovement(history, newMoveNumber);
            }, BASE_TIMEOUT_TIME)
          );
        }, Constants.FIGURE_MOVEMENT_TIME / speed);
      } else {
        this.timeoutsArray.push(
          window.setTimeout(() => {
            this.makeRecursiveFigureMovement(history, newMoveNumber);
          }, BASE_TIMEOUT_TIME)
        );
      }
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
