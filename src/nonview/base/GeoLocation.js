export default class GeoLocation {
  static async getLatLng() {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    if (!position) {
      return null;
    }
    const coords = position.coords;
    return [coords.latitude, coords.longitude];
  }
}
