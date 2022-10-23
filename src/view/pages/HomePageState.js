import { Component } from "react";

import Ents from "../../nonview/base/Ents";
import GIG2, { DEFAULT_LAYER_TABLE_NAME } from "../../nonview/base/GIG2";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

const DEFAULT_REGION_ID = "LK-1";
const DEFAULT_COLORING_METHOD = "majority";

export default class HomePageState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEntIndex: null,
      center: DEFAULT_CENTER,
      coloringMethod: "majority",
      geoCenter: DEFAULT_CENTER,
      layerTable: null,
      layerTableName: DEFAULT_LAYER_TABLE_NAME,
      regionID: DEFAULT_REGION_ID,
      showLayerListView: false,
      showRegionDetailsView: false,
      zoom: DEFAULT_ZOOM,
    };
  }

  async loadState() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    const { layerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    const layerTable = await GIG2.getTable(layerTableName);
    this.setState({ allEntIndex, layerTable, center, geoCenter });
  }

  setCenterAndZoom(center, zoom) {
    this.setState({ center, zoom });
  }

  setColoringMethod(coloringMethod) {
    this.setState({ coloringMethod });
  }

  async setLayerTableName(layerTableName) {
    this.setState({
      layerTableName,
      layerTable: await GIG2.getTable(layerTableName),
      coloringMethod: DEFAULT_COLORING_METHOD,
    });
  }

  setRegion(regionID) {
    this.setState({ regionID, showRegionDetailsView: true });
  }
}
