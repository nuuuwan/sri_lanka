import { Component } from "react";

import Ents from "../../nonview/base/Ents";
import GIG2, { DEFAULT_LAYER_TABLE_NAME } from "../../nonview/base/GIG2";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

export default class HomePageState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEntIndex: null,
      center: DEFAULT_CENTER,
      coloringMethod: "majority",
      drawerTabValue: "none",
      geoCenter: DEFAULT_CENTER,
      layerTableName: DEFAULT_LAYER_TABLE_NAME,
      regionID: "LK",
      tableIndex: null,
      zoom: DEFAULT_ZOOM,
    };
  }

  async loadState() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    const { layerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    const tableIndex = await GIG2.getTableIndex(layerTableName);
    this.setState({ allEntIndex, tableIndex, center, geoCenter });
  }

  setCenterAndZoom(center, zoom) {
    this.setState({ center, zoom });
  }

  setColoringMethod(coloringMethod) {
    this.setState({ coloringMethod });
  }

  setDrawerTabValue(drawerTabValue) {
    this.setState({ drawerTabValue });
  }

  async setLayerTableName(layerTableName) {
    const tableIndex = await GIG2.getTableIndex(layerTableName);
    const coloringMethod = "majority";
    this.setState({
      tableIndex,
      layerTableName,
      coloringMethod,
    });
  }

  setRegion(regionID) {
    const drawerTabValue = "regions";
    this.setState({ regionID, drawerTabValue });
  }
}
