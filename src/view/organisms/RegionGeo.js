import { Component } from "react";
import { GeoJSON } from "react-leaflet";

import Ents from "../../nonview/base/Ents.js";
import GeoData from "../../nonview/base/GeoData.js";

const DEFAULT_STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.4,
  weight: 2,
};

function dumbCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

export default class RegionGeo extends Component {
  constructor(props) {
    super(props);
    this.state = { geoData: undefined, ent: undefined };
  }

  async componentDidMount() {
    this.isComponentMounted = true;
    const { regionID } = this.props;
    const geoData = await GeoData.getGeoForRegion(regionID);
    const ent = await Ents.getEnt(regionID);

    if (this.isComponentMounted) {
      this.setState({ geoData, ent });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  render() {
    const { geoData } = this.state;

    if (!geoData) {
      return "...";
    }

    const { regionID, setSelectedRegion } = this.props;

    const geoJsonData = {
      type: "MultiPolygon",
      coordinates: geoData,
    };

    let style = dumbCopy(DEFAULT_STYLE_GEOJSON);
    if (this.props.color) {
      style.fillColor = this.props.color;
    }
    if (this.props.opacity) {
      style.fillOpacity = this.props.opacity;
    }

    function onClickRegionInner() {
      setSelectedRegion(regionID);
    }

    return (
      <GeoJSON
        className="geojson"
        key={`geojson-${regionID}`}
        data={geoJsonData}
        style={style}
        eventHandlers={{
          click: onClickRegionInner,
        }}
      />
    );
  }
}
