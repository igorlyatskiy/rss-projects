import React from "react";
import "./Nav.sass";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";

interface NavProps {
  startGame: () => void;
  increaseTime: () => void;
  isGameActive: boolean;
  setTimerFunc: (number: number) => void;
}

export default class Nav extends React.PureComponent<NavProps> {
  startGameFunc = () => {
    const { startGame, setTimerFunc, increaseTime } = this.props;
    startGame();
    const interval = window.setInterval(() => {
      increaseTime();
    }, 1000);
    setTimerFunc(interval);
  };

  render() {
    return (
      <nav className='main-page__nav'>
        <Link to='/online'>
          <div className='main-page__nav__element main-page__online main-page__nav__element_active'>
            Online
          </div>
        </Link>
        <Link to='/game' onClick={this.startGameFunc}>
          <div className='main-page__nav__element main-page__start'>Start</div>
        </Link>
        <Link to='/replays'>
          <div className='main-page__nav__element main-page__replays'>
            View replays
          </div>
        </Link>
      </nav>
    );
  }
}
