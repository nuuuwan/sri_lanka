import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import StringX from "../../nonview/base/StringX";
import Typography from "@mui/material/Typography";
import Ents from "../../nonview/base/Ents";
import GIG2, {
  DEFAULT_SELECTED_LAYER_TABLE_NAME,
} from "../../nonview/base/GIG2";
import GeoLocation from "../../nonview/base/GeoLocation";
import EntsForMaps from "../../nonview/core/EntsForMaps";
import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import LayerListView from "../../view/molecules/LayerListView";
import TableTitleView from "../../view/molecules/TableTitleView";
import GeoMap from "../organisms/GeoMap";
import RegionDrawerInner from "../../view/organisms/RegionDrawerInner";
import RegionGeo from "../organisms/RegionGeo";

import {
  STYLE_BODY,
  STYLE_FOOTER,
  STYLE_DRAWER_INNER,
  STYLE_FLOATING_BOX,
  STYLE_DRAWER,
  STYLE_FLOATING_LOG_BOX,
} from "../../view/pages/STYLES_HOME_PAGE";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLayerTableName: DEFAULT_SELECTED_LAYER_TABLE_NAME,
      selectedRegionID: null,
      colorMethod: "majority",
      showLayerDrawer: false,
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
    this.setState({
      tableIndex,
      selectedLayerTableName,
      showLayerDrawer: false,
    });
  }

  unsetSelectedLayerTableName() {
    this.setState({ selectedLayerTableName: null });
  }

  setSelectedRegion(selectedRegionID) {
    this.setState({ selectedRegionID });
  }

  unsetSelectedRegion() {
    this.setState({ selectedRegionID: null });
  }

  setColorMethod(colorMethod) {
    this.setState({ colorMethod });
  }

  handleOpenLayerDrawer() {
    this.setState({ showLayerDrawer: true });
  }

  handleCloseLayerDrawer() {
    this.setState({ showLayerDrawer: false });
  }

  handleCloseDrawer() {
    this.handleCloseLayerDrawer();
    this.unsetSelectedRegion();
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

  renderGeoMapChildren(center, zoom) {
    const {
      allEntIndex,
      selectedRegionID,
      tableIndex,
      selectedLayerTableName,
      colorMethod,
    } = this.state;
    if (!allEntIndex || !tableIndex) {
      return null;
    }

    const displayRegionIDs = EntsForMaps.getDisplayRegionIDs(
      allEntIndex,
      center,
      zoom,
      selectedLayerTableName
    );

    return displayRegionIDs.map(
      function (regionID) {
        const key = `region-geo-${selectedLayerTableName}-${regionID}`;
        const tableRow = tableIndex[regionID];
        const { color, opacity } = GIG2.getTableRowColorAndOpacity(
          colorMethod,
          tableRow
        );
        return (
          <RegionGeo
            key={key}
            regionID={regionID}
            selectedRegionID={selectedRegionID}
            setSelectedRegion={this.setSelectedRegion.bind(this)}
            color={color}
            opacity={opacity}
          />
        );
      }.bind(this)
    );
  }

  renderDrawerInner() {
    const { selectedRegionID, selectedLayerTableName, colorMethod } =
      this.state;
    if (this.state.selectedRegionID !== null) {
      return (
        <RegionDrawerInner
          selectedRegionID={selectedRegionID}
          selectedLayerTableName={selectedLayerTableName}
          setColorMethod={this.setColorMethod.bind(this)}
          selectedColorMethod={colorMethod}
        />
      );
    }

    if (this.state.showLayerDrawer) {
      return (
        <LayerListView
          selectedLayerTableName={selectedLayerTableName}
          setSelectedLayerTableName={this.setSelectedLayerTableName.bind(this)}
        />
      );
    }

    return null;
  }

  render() {
    let drawerInner = this.renderDrawerInner();
    const {
      center,
      zoom,
      selectedLayerTableName,
      geoCenter,
      colorMethod,
      allEntIndex,
    } = this.state;

    const key = `geo-map-${zoom}-${geoCenter}`;
    const logText = JSON.stringify(
      {
        center,
        zoom,
        selectedLayerTableName,
        colorMethod,
        allEntIndexLength: allEntIndex ? Object.keys(allEntIndex).length : 0,
      },
      null,
      2
    );

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_FLOATING_BOX}>
            <TableTitleView tableName={selectedLayerTableName} />
            <Typography variant="caption">
              {StringX.toTitleCase(colorMethod)}
            </Typography>
          </Box>
          <GeoMap
            key={key}
            center={center}
            zoom={zoom}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            renderChildren={this.renderGeoMapChildren.bind(this)}
          />
          <Drawer
            anchor={"right"}
            open={drawerInner !== null}
            onClose={this.handleCloseDrawer.bind(this)}
            sx={STYLE_DRAWER}
          >
            <Box sx={STYLE_DRAWER_INNER}>{drawerInner}</Box>
          </Drawer>
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            handleOpenLayerDrawer={this.handleOpenLayerDrawer.bind(this)}
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
