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
      selectedLayerTableName: DEFAULT_SELECTED_LAYER_TABLE_NAME,
      selectedRegionID: "LK",
      colorMethod: "majority",
      selectedDrawerTabValue: "none",
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

  async componentDidMountUnSafe() {
    console.debug("🏃‍♀️ HomePage.componentDidMountUnSafe start.");
    const geoCenter = await GeoLocation.getLatLng();
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe geoCenter = ",
      geoCenter
    );
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;

    const { selectedLayerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe: Object.keys(allEntIndex) = ",
      Object.keys(allEntIndex)
    );
    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    console.debug(
      "🧮 HomePage.componentDidMountUnSafe: Object.keys(tableIndex).length = ",
      Object.keys(tableIndex).length
    );

    this.setState({ allEntIndex, tableIndex, center, geoCenter });
    console.debug("👍 HomePage.componentDidMountUnSafe end.");
  }

  async componentDidMount() {
    if (this.didMount) {
      return;
    }

    try {
      await this.componentDidMountUnSafe();
    } catch (errors) {
      this.componentDidMountErrors = errors;
    }
    this.didMount = true;
  }

  setCenterAndZoom(center, zoom) {
    this.setState({ center, zoom });
  }

  async setSelectedLayerTableName(selectedLayerTableName) {
    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    const colorMethod = "majority";
    this.setState({
      tableIndex,
      selectedLayerTableName,
      colorMethod,
    });
  }

  setSelectedRegion(selectedRegionID) {
    const selectedDrawerTabValue = "regions";
    this.setState({ selectedRegionID, selectedDrawerTabValue });
  }

  setColorMethod(colorMethod) {
    this.setState({ colorMethod });
  }

  handleOpenDrawer() {
    this.setState({ selectedDrawerTabValue: "layers" });
  }

  handleCloseDrawer() {
    this.setState({ selectedDrawerTabValue: "none" });
  }

  setSelectedDrawerTabValue(selectedDrawerTabValue) {
    this.setState({ selectedDrawerTabValue });
  }

  async handleGeoLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setState({ center, geoCenter, zoom: DEFAULT_ZOOM });
  }

  render() {
    console.debug("✅ HomePage.render start.");
    const {
      center,
      zoom,
      selectedLayerTableName,
      geoCenter,
      colorMethod,
      allEntIndex,
      tableIndex,
      selectedRegionID,
      selectedDrawerTabValue,
    } = this.state;

    const key = `geo-map-${zoom}-${geoCenter}`;
    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <LayerInfoPanel
            selectedLayerTableName={selectedLayerTableName}
            colorMethod={colorMethod}
          />
          <GeoMap
            key={key}
            center={center}
            zoom={zoom}
            allEntIndex={allEntIndex}
            tableIndex={tableIndex}
            selectedRegionID={selectedRegionID}
            selectedLayerTableName={selectedLayerTableName}
            colorMethod={colorMethod}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            setSelectedRegion={this.setSelectedRegion.bind(this)}
          />
          <CustomDrawer
            selectedRegionID={selectedRegionID}
            selectedLayerTableName={selectedLayerTableName}
            selectedColorMethod={colorMethod}
            setColorMethod={this.setColorMethod.bind(this)}
            selectedDrawerTabValue={selectedDrawerTabValue}
            setSelectedDrawerTabValue={this.setSelectedDrawerTabValue.bind(
              this
            )}
            handleCloseDrawer={this.handleCloseDrawer.bind(this)}
            setSelectedLayerTableName={this.setSelectedLayerTableName.bind(
              this
            )}
          />
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            handleOpenDrawer={this.handleOpenDrawer.bind(this)}
            handleGeoLocation={this.handleGeoLocation.bind(this)}
          />
        </Paper>
      </Box>
    );
  }
}
