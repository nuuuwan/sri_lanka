import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

import Ents from "../../nonview/base/Ents";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../organisms/GeoMap";
import LayerDrawerInner from "../../view/organisms/LayerDrawerInner";
import RegionDrawerInner from "../../view/organisms/RegionDrawerInner";
import RegionGeo from "../organisms/RegionGeo";

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
  maxWidth: "80%",
};

const DEFAULT_SELECTED_LAYER_TABLE_NAME =
  "regions.2012_census.ethnicity_of_population";
const DEFAULT_SELECTED_REGION_ID = "LK-11";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLayerTableName: DEFAULT_SELECTED_LAYER_TABLE_NAME,
      selectedRegionID: DEFAULT_SELECTED_REGION_ID,
      showLayerDrawer: false,
      allEntIndex: null,
    };
  }

  setSelectedLayerTableName(selectedLayerTableName) {
    this.setState({ selectedLayerTableName });
  }

  unsetSelectedLayerTableName() {
    this.setState({ selectedRegionID: null });
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
    const allEntIndex = await Ents.getAllEntIndex();
    this.setState({ allEntIndex });
  }

  renderGeoMapChildren(center, zoom) {
    const { allEntIndex } = this.state;
    if (!allEntIndex) {
      return null;
    }

    const displayRegionIDs = EntsForMaps.getDisplayRegionIDs(
      allEntIndex,
      center,
      zoom
    );

    return displayRegionIDs.map(
      function (regionID) {
        const key = `region-geo-${regionID}`;
        return (
          <RegionGeo
            key={key}
            regionID={regionID}
            setSelectedRegion={this.setSelectedRegion.bind(this)}
          />
        );
      }.bind(this)
    );
  }

  renderDrawerInner() {
    const { selectedRegionID, selectedLayerTableName } = this.state;
    if (this.state.selectedRegionID !== null) {
      return <RegionDrawerInner selectedRegionID={selectedRegionID} />;
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
    return (
      <Box sx={STYLE_BOX}>
        <Paper sx={STYLE_BODY}>
          <GeoMap renderChildren={this.renderGeoMapChildren.bind(this)} />
          <Drawer
            anchor={"right"}
            open={drawerInner !== null}
            onClose={this.handleCloseDrawer.bind(this)}
          >
            <Box sx={STYLE_DRAWER_INNER}>
              <Box>
                <IconButton onClick={this.handleCloseDrawer.bind(this)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>{drawerInner}</Box>
            </Box>
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
