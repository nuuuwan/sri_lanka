import { Component } from "react";

import RegionGeoDorling from "../../view/molecules/RegionGeoDorling";
import RegionGeoGeo from "../../view/organisms/RegionGeoGeo";

export default class RegionGeo extends Component {
  render() {
    const {
      allEntIndex,
      regionEntType,
      regionID,
      setRegion,
      color,
      opacity,
      mapMode,
    } = this.props;

    switch (mapMode) {
      case "dorling":
        return (
          <RegionGeoDorling
            allEntIndex={allEntIndex}
            regionEntType={regionEntType}
            regionID={regionID}
            setRegion={setRegion}
            color={color}
            opacity={opacity}
          />
        );
      default:
        return (
          <RegionGeoGeo
            allEntIndex={allEntIndex}
            regionEntType={regionEntType}
            regionID={regionID}
            setRegion={setRegion}
            color={color}
            opacity={opacity}
          />
        );
    }
  }
}
