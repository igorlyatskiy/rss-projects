import React from "react";
import { Color } from "../../Constants";
import QueenSVG from "../svg/QueenSVG";

export default class Queen extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <QueenSVG color={color} />;
  }
}
