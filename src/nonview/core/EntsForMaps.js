import { ENT } from "../../nonview/base/Ents";

const N_DISPLAY_REGIONS = 20;
export default class EntsForMaps {
  static getEntTypeForZoom(zoom) {
    if (zoom <= 8) {
      return ENT.PROVINCE;
    }
    if (zoom <= 10) {
      return ENT.DISTRICT;
    }
    if (zoom <= 15) {
      return ENT.DSD;
    }
    return ENT.GND;
  }

  static getDistance([latCenter, lngCenter], { centroid }) {
    const [lat, lng] = JSON.parse(centroid);
    const [dlat, dlng] = [lat - latCenter, lng - lngCenter];
    const d = Math.sqrt(dlat * dlat + dlng * dlng);
    return d;
  }

  static getDisplayRegionIDs(allEntIndex, center, zoom) {
    const entType = this.getEntTypeForZoom(zoom);
    const entIndex = allEntIndex[entType];
    const sortedEnts = Object.values(entIndex).sort(function (entA, entB) {
      return (
        EntsForMaps.getDistance(center, entA) -
        EntsForMaps.getDistance(center, entB)
      );
    });

    const displayRegionIDs = sortedEnts
      .slice(0, N_DISPLAY_REGIONS)
      .map((ent) => ent.id);
    return displayRegionIDs;
  }
}
