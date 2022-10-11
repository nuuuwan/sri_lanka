import { ENT } from "../../nonview/base/Ents";

const MAX_DISPLAY_REGIONS = 60;
const K_MAX_DISTANCE = 2000;

export default class EntsForMaps {
  static getDistance([latCenter, lngCenter], { centroid }) {
    const [lat, lng] = JSON.parse(centroid);
    const [dlat, dlng] = [lat - latCenter, lng - lngCenter];
    const r = window.screen.height / window.screen.width;
    return Math.abs(dlat) * r + Math.abs(dlng);
  }

  static getDisplayRegionIDs(allEntIndex, center, zoom) {
    const maxDistance = K_MAX_DISTANCE / Math.pow(2, zoom);

    for (let entType of [ENT.GND, ENT.DSD, ENT.DISTRICT, ENT.PROVINCE]) {
      const entIndex = allEntIndex[entType];
      const displayEnts = Object.values(entIndex)
        .filter(function (ent) {
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
