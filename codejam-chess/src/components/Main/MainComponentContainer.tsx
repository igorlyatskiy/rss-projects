import React from "react";
import { connect } from "react-redux";
import Main from "./Main";

export interface MainComponentContainerProps {
  isUserLogined: boolean;
}

class MainComponentContainer extends React.PureComponent<MainComponentContainerProps> {
  render() {
    const { isUserLogined } = this.props;
    return <Main isUserLogined={isUserLogined} />;
  }
}

const pushStateToProps = (state: any) => ({
  isUserLogined: state.mainPageReducer.isUserLogined,
});

const mapDispatchToProps = {};

export default connect(
  pushStateToProps,
  mapDispatchToProps
)(MainComponentContainer);
