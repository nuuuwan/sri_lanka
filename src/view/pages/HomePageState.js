import { Component } from "react";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import GIG2, { DEFAULT_LAYER_TABLE_NAME } from "../../nonview/base/GIG2";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

const DEFAULT_REGION_ID = "LK-1";
const DEFAULT_COLORING_METHOD = "majority";
const DEFAULT_REGION_ENT_TYPE = ENT_TYPES.PROVINCE;
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
      regionEntType: DEFAULT_REGION_ENT_TYPE,
      regionID: DEFAULT_REGION_ID,
      showEntTypesSelectorView: false,
      showLayerListView: false,
      showRegionDetailsView: false,
      showTimeSelectorView: false,
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

  setRegionEntType(regionEntType) {
    this.setState({ regionEntType });
  }

  async onClickCenterOnCurrentLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setState({ center, geoCenter, zoom: DEFAULT_ZOOM });
  }

  onClickShowRegionDetailsView() {
    this.setState({ showRegionDetailsView: true });
  }
  onClickHideRegionDetailsView() {
    this.setState({ showRegionDetailsView: false });
  }

  onClickShowLayerListView() {
    this.setState({ showLayerListView: true });
  }
  onClickHideLayerListView() {
    this.setState({ showLayerListView: false });
  }

  onClickShowEntTypesSelectorView() {
    this.setState({ showEntTypesSelectorView: true });
  }
  onClickHideEntTypesSelectorView() {
    this.setState({ showEntTypesSelectorView: false });
  }

  onClickShowTimeSelectorView() {
    this.setState({ showTimeSelectorView: true });
  }
  onClickHideTimeSelectorView() {
    this.setState({ showTimeSelectorView: false });
  }
}
