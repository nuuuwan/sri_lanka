import { Component } from "react";

import Ents from "../../nonview/base/Ents";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import GeoMap from "../molecules/GeoMap";
import RegionGeo from "../molecules/RegionGeo";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { allEntIndex: undefined };
  }

  async componentDidMount() {
    const allEntIndex = await Ents.getAllEntIndex();
    this.setState({ allEntIndex });
  }

  renderGeoMapChildren(center, zoom) {
    const { allEntIndex } = this.state;
    if (!allEntIndex) {
      return null;
    }

    const displayRegionIDs = EntsForMaps.getDisplayRegionIDs(
      allEntIndex,
      center,
      zoom
    );

    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${regionID}`;
      return <RegionGeo key={key} regionID={regionID} />;
    });
  }

  render() {
    return <GeoMap renderChildren={this.renderGeoMapChildren.bind(this)} />;
  }
}
