import { Component } from "react";

import GIG2 from "../../nonview/base/GIG2";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import RegionGeo from "../../view/organisms/RegionGeo";

export default class RegionGeoCollection extends Component {
  render() {
    const {
      center,
      zoom,
      allEntIndex,
      tableIndex,
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

    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${layerTableName}-${regionID}`;
      const tableRow = tableIndex[regionID];
      const { color, opacity } = GIG2.getTableRowColorAndOpacity(
        coloringMethod,
        tableRow
      );
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
