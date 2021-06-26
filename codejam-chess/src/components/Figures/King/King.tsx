import React from "react";
import { Color } from "../../Constants";
import KingSVG from "../svg/KingSVG";

export default class King extends React.PureComponent<Color> {
  render() {
    const { color } = this.props;
    return <KingSVG  color={color} />;
  }
}
