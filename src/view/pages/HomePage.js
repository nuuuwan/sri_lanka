import { Component } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Ents from "../../nonview/base/Ents";
import GIG2, {
  DEFAULT_SELECTED_LAYER_TABLE_NAME,
} from "../../nonview/base/GIG2";
import GeoLocation from "../../nonview/base/GeoLocation";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import CustomDrawer from "../../view/organisms/CustomDrawer";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";

import GeoMap from "../organisms/GeoMap";
import LayerInfoPanel from "../../view/molecules/LayerInfoPanel";
import { STYLE_BODY, STYLE_FOOTER } from "../../view/pages/STYLES_HOME_PAGE";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layerTableName: DEFAULT_SELECTED_LAYER_TABLE_NAME,
      regionID: "LK",
      coloringMethod: "majority",
      drawerTabValue: "none",
      allEntIndex: null,
      tableIndex: null,
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER,
      geoCenter: DEFAULT_CENTER,
    };
    this.didMount = false;
    this.componentDidMountErrors = null;
    console.debug("👍 HomePage.constructor end.");
  }

  async componentDidMount() {
    if (this.didMount) {
      return;
    }

    console.debug("🏃‍♀️ HomePage.componentDidMountUnSafe start.");
    const geoCenter = await GeoLocation.getLatLng();
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe geoCenter = ",
      geoCenter
    );
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;

    const { layerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe: Object.keys(allEntIndex) = ",
      Object.keys(allEntIndex)
    );
    const tableIndex = await GIG2.getTableIndex(layerTableName);
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe: Object.keys(tableIndex).length = ",
      Object.keys(tableIndex).length
    );

    this.setState({ allEntIndex, tableIndex, center, geoCenter });
    this.didMount = true;
    console.debug("👍 HomePage.componentDidMountUnSafe end.");
  }

  setCenterAndZoom(center, zoom) {
    this.setState({ center, zoom });
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

  setColoringMethod(coloringMethod) {
    this.setState({ coloringMethod });
  }

  onClickOpenLayerDrawer() {
    this.setState({ drawerTabValue: "layers" });
  }

  onClickCloseDrawer() {
    this.setState({ drawerTabValue: "none" });
  }

  setDrawerTabValue(drawerTabValue) {
    this.setState({ drawerTabValue });
  }

  async onClickCenterOnCurrentLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setState({ center, geoCenter, zoom: DEFAULT_ZOOM });
  }

  render() {
    console.debug("✅ HomePage.render start.");
    const {
      center,
      zoom,
      layerTableName,
      geoCenter,
      coloringMethod,
      allEntIndex,
      tableIndex,
      regionID,
      drawerTabValue,
    } = this.state;

    const key = `geo-map-${zoom}-${geoCenter}`;
    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <LayerInfoPanel layerTableName={layerTableName} />
          <GeoMap
            key={key}
            center={center}
            zoom={zoom}
            allEntIndex={allEntIndex}
            tableIndex={tableIndex}
            layerTableName={layerTableName}
            coloringMethod={coloringMethod}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            setRegion={this.setRegion.bind(this)}
          />
          <CustomDrawer
            regionID={regionID}
            layerTableName={layerTableName}
            coloringMethod={coloringMethod}
            setColoringMethod={this.setColoringMethod.bind(this)}
            drawerTabValue={drawerTabValue}
            setDrawerTabValue={this.setDrawerTabValue.bind(this)}
            onClickCloseDrawer={this.onClickCloseDrawer.bind(this)}
            setLayerTableName={this.setLayerTableName.bind(this)}
          />
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            onClickOpenLayerDrawer={this.onClickOpenLayerDrawer.bind(this)}
            onClickCenterOnCurrentLocation={this.onClickCenterOnCurrentLocation.bind(this)}
          />
        </Paper>
      </Box>
    );
  }
}
