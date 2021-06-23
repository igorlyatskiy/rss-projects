import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import MainPage from "../pages/Main/MainPage";

export default class Main extends React.PureComponent {
  render() {
    return (
      <Router>
        <main className='main'>
          <Switch>
            <Route path='/'>
              <MainPage />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
}
