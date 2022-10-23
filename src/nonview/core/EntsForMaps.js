import { ENT_TYPES } from "../../nonview/base/EntTypes";
import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";

const MAX_DISPLAY_REGIONS = 256;

export default class EntsForMaps {
  static getDistance([latCenter, lngCenter], { centroid }) {
    if (!centroid) {
      return 0;
    }
    const [lat, lng] = JSON.parse(centroid);
    const [dlat, dlng] = [lat - latCenter, lng - lngCenter];
    const r = window.screen.height / window.screen.width;
    return Math.abs(dlat) * r + Math.abs(dlng);
  }

  static getEntTypes(layerTableName) {
    const tableMetadata = new GIG2TableMetadata(layerTableName);
    const regionFormat = tableMetadata.entity;

    if (regionFormat === "regions") {
      return [
        ENT_TYPES.GND,
        ENT_TYPES.DSD,
        ENT_TYPES.DISTRICT,
        ENT_TYPES.PROVINCE,
      ];
    }

    if (regionFormat === "regions-ec") {
      return [ENT_TYPES.PD, ENT_TYPES.ED, ENT_TYPES.PROVINCE];
    }

    return [ENT_TYPES.PROVINCE];
  }

  static getDisplayRegionIDs(
    allEntIndex,
    center,
    zoom,
    layerTableName,
    regionEntType
  ) {
    const entIndex = allEntIndex[regionEntType];
    const displayEnts = Object.values(entIndex).sort(function (entA, entB) {
      return (
        EntsForMaps.getDistance(center, entA) -
        EntsForMaps.getDistance(center, entB)
      );
    });

    const displayRegionIDs = displayEnts
      .slice(0, MAX_DISPLAY_REGIONS)
      .map((ent) => ent.id)
      .filter((id) => id.substring(6) !== "P");
    return displayRegionIDs;
  }

  static getDisplayRegionIDsHACK(allEntIndex, center, zoom, layerTableName) {
    return ["LK-11"];
  }
}
