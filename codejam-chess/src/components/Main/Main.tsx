import React from "react";
import "./Main.sass";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import MainPageContainer from "../../Containers/MainPageContainer";
import GamePage from "../pages/Game/GamePage";
import SettingsContainer from "../../Containers/SettingsContainer";
import OnlinePageContainer from "../../Containers/OnlinePageContainer";
import ReplaysContainer from "../../Containers/ReplaysContainer";
import ReplayPlayerContainer from "../pages/Replays/Containers/ReplayPlayerContainer";

interface MainProps {
  isUserLogined: boolean;
}

export default class Main extends React.PureComponent<MainProps> {
  render() {
    // const { isUserLogined } = this.props;
    return (
      <main className='main'>
        <Switch>
          <Route exact path='/'>
            <MainPageContainer />
          </Route>
          {/* {!isUserLogined && <Redirect to='/' />} */}
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
            <div className='routing-error'>Something has gone wrong...</div>
          </Route>
        </Switch>
      </main>
    );
  }
}
