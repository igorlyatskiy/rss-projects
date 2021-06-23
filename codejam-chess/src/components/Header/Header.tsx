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

class Header extends React.PureComponent {
  render() {
    return (
      <header className='header'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='header__logo' />
        </Link>
      </header>
    );
  }
}

export default Header;
