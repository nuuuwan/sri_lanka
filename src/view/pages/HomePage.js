import { Component } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Ents from "../../nonview/base/Ents";
import GIG2, {
  DEFAULT_SELECTED_LAYER_TABLE_NAME,
} from "../../nonview/base/GIG2";
import GeoLocation from "../../nonview/base/GeoLocation";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import CustomDrawer from "../../view/organisms/CustomDrawer";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../organisms/GeoMap";
import HeaderPanel from "../../view/molecules/HeaderPanel";
import {
  STYLE_BODY,
  STYLE_FOOTER,
  STYLE_FLOATING_LOG_BOX,
} from "../../view/pages/STYLES_HOME_PAGE";

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

  async componentDidMount() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;

    const { selectedLayerTableName } = this.state;
    const allEntIndex = await Ents.getAllEntIndex();
    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    this.setState({ allEntIndex, tableIndex, center, geoCenter });
  }

  render() {
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
    const logText = JSON.stringify(
      {
        center,
        zoom,
        selectedLayerTableName,
        colorMethod,
        allEntIndexLength: allEntIndex ? Object.keys(allEntIndex).length : 0,
        entTypes: Ents.getEntTypes(),
      },
      null,
      2
    );

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <HeaderPanel
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
        <Box sx={STYLE_FLOATING_LOG_BOX}>
          <Typography
            variant="caption"
            sx={{ fontFamily: STYLE_FLOATING_LOG_BOX.fontFamily }}
          >
            {logText}
          </Typography>
        </Box>
      </Box>
    );
  }
}
