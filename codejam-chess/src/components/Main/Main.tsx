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

export default class Main extends React.PureComponent {
  render() {
    return (
      <main className='main'>
        <Switch>
          <Route exact path='/game'>
            <GamePage />
          </Route>
          <Route exact path='/'>
            <MainPageContainer />
          </Route>
          <Route path='*'>
            <div className='routing-error'>Something has gone wrong...</div>
          </Route>
        </Switch>
      </main>
    );
  }
}
