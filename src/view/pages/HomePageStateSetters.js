import GIG2 from "../../nonview/base/GIG2";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import HomePageStateBase from "../../view/pages/HomePageStateBase";

export default class HomePageStateSetters extends HomePageStateBase {
  setCenterAndZoom(center, zoom) {
    const { allEntIndex, regionEntType } = this.state;
    const displayRegionIDs = allEntIndex
      ? EntsForMaps.getDisplayRegionIDs(
          allEntIndex,
          center,
          zoom,
          regionEntType
        )
      : null;
    this.setStateAndURLContext({ center, zoom, displayRegionIDs });
  }

  setColoringMethod(coloringMethod) {
    this.setStateAndURLContext({ coloringMethod });
  }

  async setLayerTableName(layerTableName) {
    this.setStateAndURLContext({
      layerTableName,
      layerTable: await GIG2.getTable(layerTableName),
    });
  }

  setRegion(regionID) {
    this.setStateAndURLContext({ regionID, showRegionDetailsView: true });
  }

  setRegionEntType(regionEntType) {
    const { allEntIndex, center, zoom } = this.state;
    const displayRegionIDs = allEntIndex
      ? EntsForMaps.getDisplayRegionIDs(
          allEntIndex,
          center,
          zoom,
          regionEntType
        )
      : null;
    this.setStateAndURLContext({ regionEntType, displayRegionIDs });
  }

  setMapMode(mapMode) {
    this.setStateAndURLContext({ mapMode });
  }
}
