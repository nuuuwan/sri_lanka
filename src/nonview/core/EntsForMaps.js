import { ENT_TYPES } from "../../nonview/base/EntTypes";
import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";

const MAX_DISPLAY_REGIONS = 200;
const K_MAX_DISTANCE = 2000;

export default class EntsForMaps {
  static getDistance([latCenter, lngCenter], { centroid }) {
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

  static getDisplayRegionIDs(allEntIndex, center, zoom, layerTableName) {
    const maxDistance = K_MAX_DISTANCE / Math.pow(2, zoom);
    const entTypes = EntsForMaps.getEntTypes(layerTableName);

    for (let entType of entTypes) {
      const entIndex = allEntIndex[entType];
      const displayEnts = Object.values(entIndex)
        .filter(function (ent) {
          if (ent.centroid === "") {
            return false;
          }
          const distance = EntsForMaps.getDistance(center, ent);
          return distance < maxDistance;
        })
        .sort(function (entA, entB) {
          return (
            EntsForMaps.getDistance(center, entA) -
            EntsForMaps.getDistance(center, entB)
          );
        });

      const nDisplayEnts = displayEnts.length;

      if (nDisplayEnts < MAX_DISPLAY_REGIONS) {
        const displayRegionIDs = displayEnts
          .slice(0, MAX_DISPLAY_REGIONS)
          .map((ent) => ent.id);
        return displayRegionIDs;
      }
    }
    return [];
  }

  static getDisplayRegionIDsHACK(allEntIndex, center, zoom, layerTableName) {
    return ["LK-11"];
  }
}
