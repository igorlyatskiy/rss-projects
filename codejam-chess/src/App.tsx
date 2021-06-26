import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import "./App.sass";
import Footer from "./components/Footer/Footer";
import MainComponentContainer from "./components/Main/MainComponentContainer";
import HeaderContainer from "./Containers/HeaderContainer";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <HeaderContainer />
          <MainComponentContainer />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
