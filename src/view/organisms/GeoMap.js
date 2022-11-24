import { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import AllRegionGeosGeo from "../../view/molecules/AllRegionGeosGeo";
import AllRegionGeosDorling from "../../view/molecules/AllRegionGeosDorling";

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
  renderInner() {
    const {
      allEntIndex,
      coloringMethod,
      regionEntType,
      displayRegionIDs,
      layerTable,
      layerTableName,
      setRegion,
      mapMode,
    } = this.props;
    switch (mapMode) {
      case "dorling":
        return (
          <AllRegionGeosDorling
            key={"all-region-geos-dorling-" + coloringMethod + layerTableName}
            allEntIndex={allEntIndex}
            regionEntType={regionEntType}
            coloringMethod={coloringMethod}
            displayRegionIDs={displayRegionIDs}
            layerTable={layerTable}
            layerTableName={layerTableName}
            setRegion={setRegion}
          />
        );
      default:
        return (
          <AllRegionGeosGeo
            key={"all-region-geos-geo-" + coloringMethod + layerTableName}
            allEntIndex={allEntIndex}
            regionEntType={regionEntType}
            coloringMethod={coloringMethod}
            displayRegionIDs={displayRegionIDs}
            layerTable={layerTable}
            layerTableName={layerTableName}
            setRegion={setRegion}
          />
        );
    }
  }
  render() {
    const { center, zoom, setCenterAndZoom} = this.props;
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <EventComponent setCenterAndZoom={setCenterAndZoom} />
        <TileLayer url={URL_FORMAT} />
        {this.renderInner()}
      </MapContainer>
    );
  }
}
