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
      center,
      zoom,
      allEntIndex,
      selectedRegionID,
      tableIndex,
      selectedLayerTableName,
      setSelectedRegion,
      colorMethod,
    } = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent
          setCenterAndZoom={this.props.setCenterAndZoom.bind(this)}
        />
        <TileLayer url={URL_FORMAT} />
        <RegionGeoCollection
          center={center}
          zoom={zoom}
          allEntIndex={allEntIndex}
          tableIndex={tableIndex}
          selectedRegionID={selectedRegionID}
          selectedLayerTableName={selectedLayerTableName}
          colorMethod={colorMethod}
          setSelectedRegion={setSelectedRegion}
        />
      </MapContainer>
    );
  }
}
