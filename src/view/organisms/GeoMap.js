import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import RegionGeoCollection from "../../view/organisms/RegionGeoCollection";

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
      displayRegionIDs,
      layerTable,
      layerTableName,
      setRegion,
      zoom,
    } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent
          setCenterAndZoom={this.props.setCenterAndZoom.bind(this)}
        />
        <TileLayer url={URL_FORMAT} />
        <RegionGeoCollection
          allEntIndex={allEntIndex}
          coloringMethod={coloringMethod}
          displayRegionIDs={displayRegionIDs}
          layerTable={layerTable}
          layerTableName={layerTableName}
          setRegion={setRegion}
        />
      </MapContainer>
    );
  }
}
