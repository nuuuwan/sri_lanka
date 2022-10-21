import { Component } from "react";
import EntsForMaps from "../../nonview/core/EntsForMaps";
import GIG2 from "../../nonview/base/GIG2";
import RegionGeo from "../../view/organisms/RegionGeo";

export default class RegionGeoCollection extends Component {
  render() {
    const {
      center,
      zoom,
      allEntIndex,
      selectedRegionID,
      tableIndex,
      selectedLayerTableName,
      setSelectedRegion,
      colorMethod,
    } = this.props;

    if (!allEntIndex) {
      return null;
    }

    const displayRegionIDs = EntsForMaps.getDisplayRegionIDs(
      allEntIndex,
      center,
      zoom,
      selectedLayerTableName
    );

    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${selectedLayerTableName}-${regionID}`;
      const tableRow = tableIndex[regionID];
      const { color, opacity } = GIG2.getTableRowColorAndOpacity(
        colorMethod,
        tableRow
      );
      return (
        <RegionGeo
          key={key}
          regionID={regionID}
          selectedRegionID={selectedRegionID}
          setSelectedRegion={setSelectedRegion}
          color={color}
          opacity={opacity}
        />
      );
    });
  }
}
