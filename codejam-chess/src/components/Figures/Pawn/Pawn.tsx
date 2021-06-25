import React from "react";
import { Color } from "../../Constants";
import PawnSVG from "../svg/PawnSVG";

export default class Pawn extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <PawnSVG color={color} />;
  }
}
