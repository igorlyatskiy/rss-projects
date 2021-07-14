import React from "react";
import { connect } from "react-redux";
import ReplaysPage from "../components/pages/Replays/Replays";

interface ReplaysContainerProps {}

class ReplaysContainer extends React.PureComponent<ReplaysContainerProps> {
  render() {
    return <ReplaysPage />;
  }
}

const pushStateToProps = () => ({
  // const { mainPageReducer } = state;
  // return {};
});

const mapDispatchToProps = {};

export default connect(pushStateToProps, mapDispatchToProps)(ReplaysContainer);
