import React from "react";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
  // useLocation,
} from "react-router-dom";
import "./Header.sass";
import logo from "../../img/logo.svg";

class Header extends React.PureComponent {
  render() {
    return (
      <Router>
        <header className='header'>
          <Link to='/'>
            <img src={logo} alt='Logo' className='header__logo' />
          </Link>
        </header>
      </Router>
    );
  }
}

export default Header;
