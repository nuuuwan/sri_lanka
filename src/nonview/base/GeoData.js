import Ents, { REGION_TYPES } from "./Ents.js";
import WWW from "./WWW.js";

export const DEFAULT_ZOOM = 8;
export const DEFAULT_LATLNG = [7.836173, 80.403442];

export function getDefaultLatLngZoomStr() {
  return getLatLngZoomStr(DEFAULT_LATLNG, DEFAULT_ZOOM);
}

export function getLatLngZoomStr([lat, lng], zoom) {
  return `${lat}N,${lng}E,${zoom}z`;
}

export function parseLatLngZoomStr(locationStr) {
  const [latStr, lngStr, zoomStr] = locationStr.split(",");
  const lat = parseFloat(latStr.replace("N", ""));
  const lng = parseFloat(lngStr.replace("E", ""));
  const zoom = parseInt(zoomStr.replace("z", ""));
  return { lat, lng, zoom };
}

export function getBrowserLatLng(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      callback([position.coords.latitude, position.coords.longitude]);
    });
  } else {
    callback(DEFAULT_LATLNG);
  }
}

function isPointInPolygon(point, polygon) {
  const [y, x] = point;
  let nIntersects = 0;
  for (let i in polygon) {
    const j = (i - 1 + polygon.length) % polygon.length;

    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    // eslint-disable-next-line no-mixed-operators
    const a = yi > y !== yj > y;
    // eslint-disable-next-line no-mixed-operators
    const b = x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    const intersect = a && b;
    if (intersect) {
      nIntersects += 1;
    }
  }
  return nIntersects % 2 === 1;
}

function isPointInMultiMultiPolygon(point, multiMultiPolygon) {
  for (let i in multiMultiPolygon) {
    const multiPolygon = multiMultiPolygon[i];
    for (let j in multiPolygon) {
      const polygon = multiPolygon[j];
      if (isPointInPolygon(point, polygon)) {
        return true;
      }
    }
  }
  return false;
}

export default class GeoData {
  static async getGeoForRegion(regionID) {
    const regionType = Ents.getEntType(regionID);
    const url = `/sri_lanka/data/geo/${regionType}/${regionID}.json`;
    return await WWW.json(url);
  }

  static async getRegionTree() {
    const url = `/sri_lanka/data/geo/region_tree.json`;
    return await WWW.json(url);
  }

  static async isPointInRegion(point, regionID) {
    const multiPolygon = await GeoData.getGeoForRegion(regionID);
    return isPointInMultiMultiPolygon(point, multiPolygon);
  }

  static async getRegionsForPoint(point) {
    let regionTree = await GeoData.getRegionTree();

    let regionMap = {};

    for (let iRegionType in REGION_TYPES) {
      const regionType = REGION_TYPES[iRegionType];
      const regionIDs = Object.keys(regionTree);
      let isFoundRegion = false;
      for (let iRegion in regionIDs) {
        const regionID = regionIDs[iRegion];
        const _isPointInRegion = await GeoData.isPointInRegion(point, regionID);
        if (_isPointInRegion) {
          regionMap[regionType] = regionID;
          regionTree = regionTree[regionID];
          isFoundRegion = true;
        }
      }
      if (!isFoundRegion) {
        break;
      }
    }
    return regionMap;
  }
}

export function roundLatLng(latLng) {
  const Q = 1000_000;
  return latLng.map((x) => Math.round(parseFloat(x) * Q) / Q);
}
