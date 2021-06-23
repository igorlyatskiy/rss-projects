import React from "react";
import "./Nav.sass";

export default class Nav extends React.PureComponent {
  render() {
    return (
      <nav className='main-page__nav'>
        <div className='main-page__nav__element main-page__online main-page__nav__element_active'>
          Online
        </div>
        <div className='main-page__nav__element main-page__start'>Start</div>
        <div className='main-page__nav__element main-page__replays'>
          View replays
        </div>
      </nav>
    );
  }
}
