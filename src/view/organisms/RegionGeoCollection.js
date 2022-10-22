import { Component } from "react";

import EntsForMaps from "../../nonview/core/EntsForMaps";

import RegionGeo from "../../view/organisms/RegionGeo";

export default class RegionGeoCollection extends Component {
  render() {
    const {
      center,
      zoom,
      allEntIndex,
      layerTable,
      layerTableName,
      setRegion,
      coloringMethod,
    } = this.props;

    if (!allEntIndex) {
      return null;
    }

    const displayRegionIDs = EntsForMaps.getDisplayRegionIDs(
      allEntIndex,
      center,
      zoom,
      layerTableName
    );

    const idToStyle = layerTable.getIDToStyle(coloringMethod);

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
