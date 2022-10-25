import { ENT_TYPES } from "../../nonview/base/EntTypes";
import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";

const MAX_DISPLAY_REGIONS = 350;

export default class EntsForMaps {
  static getDistance([latCenter, lngCenter], { centroid }) {
    if (!centroid) {
      return 0;
    }
    const [lat, lng] = JSON.parse(centroid);
    const [dlat, dlng] = [lat - latCenter, lng - lngCenter];
    const r = window.screen.height / window.screen.width;
    return Math.max(Math.abs(dlat), Math.abs(dlng) * r);
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

  static isPostalVote(id) {
    return id.substring(0, 3) === "EC-" && id.substring(5, 6) === "P";
  }

  static getDisplayRegionIDs(allEntIndex, center, zoom, regionEntType) {
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
      .filter((id) => !EntsForMaps.isPostalVote(id));
    return displayRegionIDs;
  }
}
