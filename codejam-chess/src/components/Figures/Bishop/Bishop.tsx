import React from "react";
import { Color } from "../../Constants";
import BishopSVG from "../svg/BishopSVG";

// !слон

export default class Bishop extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <BishopSVG color={color} />;
  }
}
