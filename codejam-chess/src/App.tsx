import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.sass";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
