import React from "react";
import "./Main.sass";
import { Switch, Route } from "react-router-dom";
import MainPageContainer from "../../Containers/MainPageContainer";
import GamePage from "../pages/Game/GamePage";
import SettingsContainer from "../../Containers/SettingsContainer";
import OnlinePageContainer from "../../Containers/OnlinePageContainer";
import ReplaysContainer from "../../Containers/ReplaysContainer";
import ReplayPlayerContainer from "../pages/Replays/Containers/ReplayPlayerContainer";
import NotFoundPage from "../Helpers/NotFound";

interface MainProps {
  isUserLogined: boolean;
}

export default class Main extends React.PureComponent<MainProps> {
  render() {
    return (
      <main className='main'>
        <Switch>
          <Route exact path='/'>
            <MainPageContainer />
          </Route>
          <Route exact path='/game'>
            <GamePage />
          </Route>
          <Route exact path='/settings'>
            <SettingsContainer />
          </Route>
          <Route exact path='/online'>
            <OnlinePageContainer />
          </Route>
          <Route path='/replay' component={ReplayPlayerContainer} />
          <Route exact path='/replays'>
            <ReplaysContainer />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    );
  }
}
