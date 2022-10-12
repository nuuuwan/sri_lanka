import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Ents from "../../nonview/base/Ents";
import GIG2 from "../../nonview/base/GIG2";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../organisms/GeoMap";
import LayerDrawerInner from "../../view/organisms/LayerDrawerInner";
import RegionDrawerInner from "../../view/organisms/RegionDrawerInner";
import RegionGeo from "../organisms/RegionGeo";

const DEFAULT_ZOOM = 7;
const DEFAULT_CENTER = [7.8742, 80.6511]; // Dambulla
// const DEFAULT_CENTER = [6.9157, 79.8636]; // Townhall Colombo

const FOOTER_HEIGHT = 60;
const STYLE_BOX = {};
const STYLE_BODY = {
  position: "fixed",
  bottom: FOOTER_HEIGHT,
  top: 0,
  left: 0,
  right: 0,
};
const STYLE_FOOTER = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: FOOTER_HEIGHT,
};

const STYLE_DRAWER_INNER = {
  width: 320,
};

const STYLE_FLOATING_BOX = {
  position: "fixed",
  top: "1%",
  left: "1%",
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 10,
};

const DEFAULT_SELECTED_LAYER_TABLE_NAME =
  "regions_ec.2019_election_presidential.result";
const DEFAULT_SELECTED_REGION_ID = null;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLayerTableName: DEFAULT_SELECTED_LAYER_TABLE_NAME,
      selectedRegionID: DEFAULT_SELECTED_REGION_ID,
      showLayerDrawer: false,
      allEntIndex: null,
      tableIndex: null,
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER,
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

  async componentDidMount() {
    const { selectedLayerTableName } = this.state;

    const allEntIndex = await Ents.getAllEntIndex();
    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    this.setState({ allEntIndex, tableIndex });
  }

  renderGeoMapChildren(center, zoom) {
    const {
      allEntIndex,
      selectedRegionID,
      tableIndex,
      selectedLayerTableName,
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
        const { color, opacity } = GIG2.getTableRowColorAndOpacity(tableRow);
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
    const { selectedRegionID, selectedLayerTableName } = this.state;
    if (this.state.selectedRegionID !== null) {
      return (
        <RegionDrawerInner
          selectedRegionID={selectedRegionID}
          selectedLayerTableName={selectedLayerTableName}
        />
      );
    }

    if (this.state.showLayerDrawer) {
      return (
        <LayerDrawerInner
          selectedLayerTableName={selectedLayerTableName}
          setSelectedLayerTableName={this.setSelectedLayerTableName.bind(this)}
        />
      );
    }

    return null;
  }

  render() {
    let drawerInner = this.renderDrawerInner();
    const { center, zoom, selectedLayerTableName } = this.state;
    return (
      <Box sx={STYLE_BOX}>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_FLOATING_BOX}>
            <Typography variant="subtitle1">
              {selectedLayerTableName}
            </Typography>
          </Box>
          <GeoMap
            center={center}
            zoom={zoom}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            renderChildren={this.renderGeoMapChildren.bind(this)}
          />
          <Drawer
            anchor={"right"}
            open={drawerInner !== null}
            onClose={this.handleCloseDrawer.bind(this)}
          >
            <Box sx={STYLE_DRAWER_INNER}>{drawerInner}</Box>
          </Drawer>
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            handleOpenLayerDrawer={this.handleOpenLayerDrawer.bind(this)}
          />
        </Paper>
      </Box>
    );
  }
}
