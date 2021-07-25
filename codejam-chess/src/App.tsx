import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.sass";
import Footer from "./components/Footer/Footer";
import MainComponentContainer from "./components/Main/MainComponentContainer";
import HeaderContainer from "./Containers/HeaderContainer";


export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className='App'>
          <HeaderContainer />
          <MainComponentContainer />
          <Footer />
        </div>
      </Router>
    );
  }
}
