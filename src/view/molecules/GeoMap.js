import { Component } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DEFAULT_ZOOM = 16;
const DEFAULT_CENTER = [6.917292580380246, 79.86478752005965]; // Townhall 

export default class GeoMap extends Component {
  render() {
    let { center, zoom } = this.props;
    if (!center) {
      center = DEFAULT_CENTER;
    }
    if (!zoom) {
      zoom = DEFAULT_ZOOM;
    }
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <ZoomControl zoom={zoom} position="bottomright" />
      </MapContainer>
    );
  }
}
