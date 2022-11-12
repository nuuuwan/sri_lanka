import { Component } from "react";
import { GeoJSON, Circle } from "react-leaflet";

import BBox from "../../nonview/base/BBox";
import GeoData from "../../nonview/base/GeoData.js";
import LngLat from "../../nonview/base/LngLat";

const RADIUS_PER_PERSON_SQRT = 10;

const DEFAULT_STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.4,
  weight: 1.5,
};

function dumbCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

function getRadiusFromPopulation(population) {
  return Math.sqrt(population) * RADIUS_PER_PERSON_SQRT;
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
    if (this.isComponentMounted) {
      this.setState({ geoData });
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  renderGeo() {
    const { geoData } = this.state;

    if (!geoData) {
      return "...";
    }

    const { regionID, setRegion } = this.props;

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
      setRegion(regionID);
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

  renderDorling() {
    const { geoData } = this.state;

    if (!geoData) {
      return "...";
    }
    const lngLatList = LngLat.fromPolygonListList(geoData);
    const centroid = BBox.getCentroid(lngLatList);

    const { allEntIndex, regionEntType, regionID, setRegion } = this.props;
    const ent = allEntIndex[regionEntType][regionID];
    const radius = getRadiusFromPopulation(ent.population);

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
      setRegion(regionID);
    }

    return (
      <Circle
        center={centroid}
        radius={radius}
        key={`geojson-${regionID}`}
        data={geoJsonData}
        pathOptions={style}
        eventHandlers={{
          click: onClickRegionInner,
        }}
      />
    );
  }

  render() {
    const { mapMode } = this.props;
    switch (mapMode) {
      case "dorling":
        return this.renderDorling();
      default:
        return this.renderGeo();
    }
  }
}
