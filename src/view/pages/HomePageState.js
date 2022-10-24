import { Component } from "react";

import { ENT_TYPES } from "../../nonview/base/EntTypes";
import Ents from "../../nonview/base/Ents";
import GIG2, { DEFAULT_LAYER_TABLE_NAME } from "../../nonview/base/GIG2";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";
import URLContext from "../../nonview/base/URLContext";

const DEFAULT_REGION_ID = "LK-1";
const DEFAULT_COLORING_METHOD = "majority";
const DEFAULT_REGION_ENT_TYPE = ENT_TYPES.PROVINCE;

export default class HomePageState extends Component {
  setStateAndURLContext(state) {
    this.setState(
      state,
      function () {
        const {
          center,
          coloringMethod,
          layerTableName,
          regionEntType,
          regionID,
          showEntTypesSelectorView,
          showLayerListView,
          showRegionDetailsView,
          showTimeSelectorView,
          zoom,
        } = this.state;
        const context = {
          center,
          coloringMethod,
          layerTableName,
          regionEntType,
          regionID,
          showEntTypesSelectorView,
          showLayerListView,
          showRegionDetailsView,
          showTimeSelectorView,
          zoom,
        };
        console.debug(context);
        URLContext.setContext(context);
      }.bind(this)
    );
  }

  getDefaultInitState() {
    return {
      allEntIndex: null,
      center: DEFAULT_CENTER,
      coloringMethod: DEFAULT_COLORING_METHOD,
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

  constructor(props) {
    super(props);
    const context = URLContext.getContext();
    let initState = this.getDefaultInitState();

    if (context.center) {
      initState.center = context.center;
    }
    if (context.coloringMethod) {
      initState.coloringMethod = context.coloringMethod;
    }
    if (context.layerTableName) {
      initState.layerTableName = context.layerTableName;
    }
    if (context.regionEntType) {
      initState.regionEntType = context.regionEntType;
    }
    if (context.regionID) {
      initState.regionID = context.regionID;
    }
    if (context.zoom) {
      initState.zoom = context.zoom;
    }

    initState.showEntTypesSelectorView = context.showEntTypesSelectorView;
    initState.showLayerListView = context.showLayerListView;
    initState.showRegionDetailsView = context.showRegionDetailsView;
    initState.showTimeSelectorView = context.showTimeSelectorView;

    this.state = initState;
  }

  async loadState() {
    const center = DEFAULT_CENTER;
    const geoCenter = DEFAULT_CENTER;
    const { layerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    const layerTable = await GIG2.getTable(layerTableName);
    this.setStateAndURLContext({ allEntIndex, layerTable, center, geoCenter });
  }

  setCenterAndZoom(center, zoom) {
    this.setStateAndURLContext({ center, zoom });
  }

  setColoringMethod(coloringMethod) {
    this.setStateAndURLContext({ coloringMethod });
  }

  async setLayerTableName(layerTableName) {
    this.setStateAndURLContext({
      layerTableName,
      layerTable: await GIG2.getTable(layerTableName),
    });
  }

  setRegion(regionID) {
    this.setStateAndURLContext({ regionID, showRegionDetailsView: true });
  }

  setRegionEntType(regionEntType) {
    this.setStateAndURLContext({ regionEntType });
  }

  async onClickCenterOnCurrentLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setStateAndURLContext({ center, geoCenter });
  }

  onClickShowRegionDetailsView() {
    this.setStateAndURLContext({ showRegionDetailsView: true });
  }
  onClickHideRegionDetailsView() {
    this.setStateAndURLContext({ showRegionDetailsView: false });
  }

  onClickShowLayerListView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: false,
      showLayerListView: true,
      showTimeSelectorView: false,
    });
  }
  onClickHideLayerListView() {
    this.setStateAndURLContext({ showLayerListView: false });
  }

  onClickShowEntTypesSelectorView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: true,
      showLayerListView: false,
      showTimeSelectorView: false,
    });
  }
  onClickHideEntTypesSelectorView() {
    this.setStateAndURLContext({ showEntTypesSelectorView: false });
  }

  onClickShowTimeSelectorView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: false,
      showLayerListView: false,
      showTimeSelectorView: true,
    });
  }
  onClickHideTimeSelectorView() {
    this.setStateAndURLContext({ showTimeSelectorView: false });
  }
}
