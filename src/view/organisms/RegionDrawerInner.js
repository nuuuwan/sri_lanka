import { Component } from "react";
import EntView from "../../view/atoms/EntView";

export default class RegionDrawerInner extends Component {
  render() {
    return <EntView entID={this.props.selectedRegionID} />;
  }
}
