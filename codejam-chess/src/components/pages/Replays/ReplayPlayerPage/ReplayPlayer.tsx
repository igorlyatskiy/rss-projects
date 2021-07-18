import axios from "axios";
import React from "react";
import NewChess from "../../../../chess.js/chess";
import Constants, { HeadStart, HistoryAction, PlayerData } from "../../../Constants";
import ReplayFieldContainer from "../Containers/ReplayFieldContainer";
import ReplayPlayerViewContainer from "../Containers/ReplayPlayerViewContainer";
import "./ReplayPlayer.sass";

interface ReplayPlayerState {
  data: HistoryData | null;
  timerSpeed: number;
  interval: any;
}

interface HistoryData {
  history: HistoryAction[];
  winner: number;
  names: PlayerData[];
  headstart: HeadStart[];
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
  chess: NewChess;
}

export default class ReplayPlayer extends React.PureComponent<ReplayPlayerProps, ReplayPlayerState> {
  public activeMovementTime = -1;
  public timeoutsArray: number[] = [];
  public lastMoveTime = -1;
  constructor(props: ReplayPlayerProps) {
    super(props);
    this.state = { data: null, timerSpeed: 1, interval: 0 };
  }
  componentDidMount = async () => {
    const { id, changePlayers, changeReplayWinner, gamePage, startReplay } = this.props;
    if (gamePage === Constants.APP_PAGES.REPLAY) {
      const responce = await this.getHistoryData(id);
      if (responce.status === 200) {
        this.setState({
          data: responce.data,
        });
        changePlayers(responce.data.names);
        this.removeHeadstart();
        startReplay();
        this.initTimerFunction();
        changeReplayWinner(responce.data.winner);
      }
    }
  };

  removeHeadstart = () => {
    const { data } = this.state;
    const { chess } = this.props;
    chess.reset();
    data?.headstart.forEach((e) => {
      chess.chess.remove(e.square);
    });
  };

  componentWillUnmount = () => {
    const { interval } = this.state;
    clearInterval(interval);
  };

  getHistoryData = (id: string) => {
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/history?id=${id}`;
    return axios.get(url);
  };

  initTimerFunction = () => {
    const { data } = this.state;
    const { history } = data as HistoryData;
    this.initInterval();
    this.makeRecursiveFigureMovement(history, 0);
  };

  initInterval = () => {
    const { increaseTime } = this.props;
    const { data, interval } = this.state;
    const { history } = data as HistoryData;
    const { timerSpeed } = this.state;
    if (interval) {
      clearInterval(interval);
    }
    const templ = setInterval(() => {
      const { time, speed } = this.props;
      if (speed !== timerSpeed) {
        clearInterval(interval);
        this.setState({ timerSpeed: speed });
        this.initInterval();
      }
      if (time <= history[history.length - 1].time) {
        increaseTime();
      }
    }, 1000 / timerSpeed);
    this.setState({ interval: templ });
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

  // checkTimeout = () => {
  //   const { gamePage, speed } = this.props;
  //   const { timerSpeed, interval } = this.state;
  //   const { data } = this.state;
  //   console.log("timeout");
  //   if (gamePage !== Constants.APP_PAGES.REPLAY) {
  //     clearInterval(interval);
  //   }
  //   if (speed !== timerSpeed && gamePage === Constants.APP_PAGES.REPLAY) {
  //     clearInterval(interval);
  //     this.setState({ timerSpeed: speed });
  //     if (data !== null) {
  //       this.initInterval();
  //     }
  //   }
  //   console.log(speed, timerSpeed);
  // };

  render() {
    const { data } = this.state;
    // this.checkTimeout();
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
