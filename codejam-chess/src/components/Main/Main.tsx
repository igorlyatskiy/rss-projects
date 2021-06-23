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
import Game from "../pages/Game/Game";
import MainPageContainer from "../../Containers/MainPageContainer";

export default class Main extends React.PureComponent {
  render() {
    return (
      <main className='main'>
        <Switch>
          <Route exact path='/game'>
            <Game />
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
