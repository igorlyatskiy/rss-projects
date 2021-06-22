import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";

export default class Main extends React.PureComponent {
  render() {
    return (
      <Router>
        <main className='main'>
          <Switch>
            <Route path='/'>{/* <RegisterPage /> */}</Route>
          </Switch>
        </main>
      </Router>
    );
  }
}
