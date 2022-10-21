import Ents from "./Ents.js";
import WWW from "./WWW.js";

export default class GeoData {
  static async getGeoForRegion(regionID) {
    const regionType = Ents.getEntType(regionID);
    const url = `/sri_lanka/data/geo/${regionType}/${regionID}.json`;
    return await WWW.json(url);
  }
}
