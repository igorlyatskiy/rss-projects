import React from "react";
import { Color } from "../../Constants";
import RookSVG from "../svg/RookSVG";

export default class Rook extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <RookSVG color={color} />;
  }
}
