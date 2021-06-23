import React from "react";
import { connect } from "react-redux";
import MainPage from "../components/pages/Main/MainPage";

class MainContainer extends React.PureComponent {
  render() {
    return <MainPage />;
  }
}

const pushStateToProps = () => ({});
// TODO understand, what should they do
const dispatchToProps = () => ({});

export default connect(pushStateToProps, dispatchToProps)(MainContainer);
