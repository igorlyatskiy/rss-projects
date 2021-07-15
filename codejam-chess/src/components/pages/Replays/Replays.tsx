import React from "react";
import axios, { AxiosResponse } from "axios";
import Constants, { HistoryAction, PlayerData } from "../../Constants";
import "./Replays.sass";
import ReplayCard from "./ReplayCard/ReplayCard";

interface ReplaysPageProps {
  changeActivePage: (page: string) => void;
  page: string;
  slowFigureMove: (data: unknown) => void;
}

interface ReplaysPageState {
  data: ReplayCardData[] | null;
}

interface ReplayCardData {
  history: HistoryAction[];
  winner: number;
  names: PlayerData[];
  id: string;
}

export default class ReplaysPage extends React.PureComponent<ReplaysPageProps, ReplaysPageState> {
  public request: Promise<void> | null = null;
  constructor(props: ReplaysPageProps) {
    super(props);
    this.state = {
      data: null,
    };
  }

  getHistory = () => {
    const url = `${process.env.REACT_APP_FULL_SERVER_URL}/history`;
    return axios.get(url);
  };

  getAllReplaysData = () => {
    this.request = this.getHistory()
      .then((responce: AxiosResponse) => {
        this.request = null;
        this.setState({ data: Object.values(responce.data) });
      })
      .catch((e) => {
        console.log(e);
        alert("Somebody has broken the database! 😠\nGo to the main page and start any offline game!");
      });
  };

  componentDidMount = () => {
    const { changeActivePage } = this.props;
    this.getAllReplaysData();
    changeActivePage(Constants.APP_PAGES.ALL_REPLAYS);
  };
  render() {
    const { data } = this.state;
    const { changeActivePage } = this.props;
    console.log(data);
    return (
      <section className='replays'>
        {data?.map((e) => (
          <ReplayCard
            history={e.history}
            winnerId={e.winner}
            players={e.names}
            id={e.id}
            changeActivePage={changeActivePage}
          />
        ))}
      </section>
    );
  }
}
