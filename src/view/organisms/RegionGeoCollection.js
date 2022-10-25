import { Component } from "react";

import RegionGeo from "../../view/organisms/RegionGeo";

export default class RegionGeoCollection extends Component {
  render() {
    const {
      allEntIndex,
      coloringMethod,
      displayRegionIDs,
      layerTable,
      layerTableName,
      setRegion,
    } = this.props;

    if (!allEntIndex) {
      return null;
    }

    const idToStyle = layerTable.getIDToStyle(displayRegionIDs, coloringMethod);

    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${layerTableName}-${regionID}`;
      const { color, opacity } = idToStyle[regionID];
      return (
        <RegionGeo
          key={key}
          regionID={regionID}
          setRegion={setRegion}
          color={color}
          opacity={opacity}
        />
      );
    });
  }
}
