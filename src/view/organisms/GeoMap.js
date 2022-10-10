import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DEFAULT_ZOOM = 7;
const DEFAULT_CENTER = [7.8742, 80.6511]; // Dambulla
// const DEFAULT_CENTER = [6.9157, 79.8636]; // Townhall Colombo

function EventComponent({ setCenterAndZoom }) {
  useMapEvents({
    moveend: (e) => {
      const centerRaw = e.target.getCenter();
      const center = [centerRaw.lat, centerRaw.lng];
      const zoom = e.target.getZoom();
      setCenterAndZoom(center, zoom);
    },
  });
  return null;
}

export default class GeoMap extends Component {
  constructor(props) {
    super(props);
    let { center, zoom } = this.props;
    if (!center) {
      center = DEFAULT_CENTER;
    }
    if (!zoom) {
      zoom = DEFAULT_ZOOM;
    }
    this.state = { center, zoom };
  }

  setCenterAndZoom(center, zoom) {
    this.setState({ center, zoom });
  }

  render() {
    const { center, zoom } = this.state;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent setCenterAndZoom={this.setCenterAndZoom.bind(this)} />
        <TileLayer url={URL_FORMAT} />
        {this.props.renderChildren(center, zoom)}
      </MapContainer>
    );
  }
}
