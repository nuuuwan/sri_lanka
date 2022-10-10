import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const DEFAULT_ZOOM = 8;
const DEFAULT_CENTER = [6.917292580380246, 79.86478752005965]; // Townhall

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
