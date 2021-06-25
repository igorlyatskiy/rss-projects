import React from "react";
import { Color } from "../../Constants";
import KnightSVG from "../svg/KnightSVG";

export default class Knight extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <KnightSVG color={color} />;
  }
}
