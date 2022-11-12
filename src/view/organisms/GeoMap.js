import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import AllRegionGeos from "../../view/organisms/AllRegionGeos";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

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
  render() {
    const {
      allEntIndex,
      center,
      coloringMethod,
      regionEntType,
      displayRegionIDs,
      layerTable,
      layerTableName,
      setRegion,
      zoom,
      mapMode,
    } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent
          setCenterAndZoom={this.props.setCenterAndZoom.bind(this)}
        />
        <TileLayer url={URL_FORMAT} />
        <AllRegionGeos
          allEntIndex={allEntIndex}
          regionEntType={regionEntType}
          coloringMethod={coloringMethod}
          displayRegionIDs={displayRegionIDs}
          layerTable={layerTable}
          layerTableName={layerTableName}
          setRegion={setRegion}
          mapMode={mapMode}
        />
      </MapContainer>
    );
  }
}
