import { ENT } from "../../nonview/base/Ents";

const MAX_DISPLAY_REGIONS = 32;
const K_MAX_DISTANCE = 1500;

export default class EntsForMaps {
  static getDistance([latCenter, lngCenter], { centroid }) {
    const [lat, lng] = JSON.parse(centroid);
    const [dlat, dlng] = [lat - latCenter, lng - lngCenter];
    const r = window.screen.height / window.screen.width;
    return Math.abs(dlat) * r + Math.abs(dlng);
  }

  static getEntTypes(selectedLayerTableName) {
    const tokens = selectedLayerTableName.split(".");
    const regionFormat = tokens[0];
    if (regionFormat === "regions") {
      return [ENT.GND, ENT.DSD, ENT.DISTRICT, ENT.PROVINCE];
    }

    if (regionFormat === "regions_ec") {
      return [ENT.PD, ENT.ED, ENT.PROVINCE];
    }

    return [ENT.PROVINCE];
  }

  static getDisplayRegionIDs(
    allEntIndex,
    center,
    zoom,
    selectedLayerTableName
  ) {
    const maxDistance = K_MAX_DISTANCE / Math.pow(2, zoom);
    const entTypes = EntsForMaps.getEntTypes(selectedLayerTableName);

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
}
