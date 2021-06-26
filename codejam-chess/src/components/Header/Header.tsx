import React from "react";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import "./Header.sass";
import logo from "../../img/svg/logo.svg";

interface HeaderProps {
  time: number;
  isGameActive: boolean;
  breakGame: () => void;
}

class Header extends React.PureComponent<HeaderProps> {
  breakGameFunc = () => {
    const { breakGame } = this.props;
    breakGame();
  };

  admitLoss = () => {
    
  };

  render() {
    const { time, isGameActive, breakGame } = this.props;
    const minutes =
      Math.floor(time / 60) >= 10
        ? Math.floor(time / 60)
        : `0${Math.floor(time / 60)}`;
    const seconds = time % 60 >= 10 ? time % 60 : `0${time % 60}`;
    return (
      <header className='header'>
        <Link to='/' onClick={breakGame}>
          <img src={logo} alt='Logo' className='header__logo' />
        </Link>
        {isGameActive && (
          <div className='header__container'>
            <div className='header__round-time'>
              Round Time: <br />
              {minutes}:{seconds}
            </div>

            <button
              type='button'
              className='header__admit-loss'
              onClick={this.admitLoss}
            >
              ADMIT LOSS
            </button>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
