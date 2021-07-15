import axios from "axios";
import React from "react";
import PlayerViewContainer from "../../../../Containers/PlayerViewContainer";
import { HistoryAction, PlayerData } from "../../../Constants";
import ReplayFieldContainer from "../Containers/ReplayFieldContainer";
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
  speed: number;
  changePlayers: (data: unknown) => void;
  slowFigureMove: (data: unknown) => void;
  cleanSlowFigureMove: () => void;
  startReplay: () => void;
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
    const { id, changePlayers } = this.props;
    const responce = await this.getHistoryData(id);
    if (responce.status === 200) {
      this.setState({
        data: responce.data,
      });
      changePlayers(responce.data.names);
      if (!this.timerFunctionExists) {
        this.initTimerFunction();
      }
    }
  };

  getHistoryData = (id: string) => {
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/history?id=${id}`;
    return axios.get(url);
  };

  initTimerFunction = () => {
    const { slowFigureMove, startReplay, speed } = this.props;
    const { data } = this.state;
    const { history } = data as HistoryData;
    // console.log(history);
    startReplay();
    history.forEach((action) => {
      this.timeoutsArray.push(
        window.setTimeout(() => {
          slowFigureMove(action.move);
        }, (action.time * 1000) / speed)
      );
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return data !== null ? (
      <section className='game-page'>
        <PlayerViewContainer propsColor='w' />
        <ReplayFieldContainer />
        <PlayerViewContainer propsColor='b' />
      </section>
    ) : (
      <div className='error'>error</div>
    );
  }
}
