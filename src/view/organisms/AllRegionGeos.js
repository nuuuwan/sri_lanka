import { Component } from "react";

import RegionGeo from "../../view/organisms/RegionGeo";

export default class AllRegionGeos extends Component {
  render() {
    const {
      allEntIndex,
      coloringMethod,
      regionEntType,
      displayRegionIDs,
      layerTable,
      layerTableName,
      setRegion,
      mapMode,
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
          allEntIndex={allEntIndex}
          regionEntType={regionEntType}
          regionID={regionID}
          setRegion={setRegion}
          color={color}
          opacity={opacity}
          mapMode={mapMode}
        />
      );
    });
  }
}
