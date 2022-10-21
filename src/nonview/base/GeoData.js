import Ents from "./Ents.js";
import WWW from "./WWW.js";

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/geo";

export default class GeoData {
  static async getGeoForRegion(regionID) {
    const regionType = Ents.getEntType(regionID);
    const url = URL_BASE + `/${regionType}/${regionID}.json`;
    return [await WWW.json(url)];
  }
}
