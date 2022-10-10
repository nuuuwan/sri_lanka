import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";

import Ents from "../../nonview/base/Ents";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../molecules/GeoMap";
import RegionGeo from "../molecules/RegionGeo";

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

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLayerDrawerOpen: false, allEntIndex: undefined };
  }

  handleCloseLayerDrawer() {
    this.setState({ isLayerDrawerOpen: false });
  }

  handleOpenLayerDrawer() {
    this.setState({ isLayerDrawerOpen: true });
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

    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${regionID}`;
      return <RegionGeo key={key} regionID={regionID} />;
    });
  }

  render() {
    return (
      <Box sx={STYLE_BOX}>
        <Paper sx={STYLE_BODY}>
          <GeoMap renderChildren={this.renderGeoMapChildren.bind(this)} />
          <Drawer
            anchor={"right"}
            open={this.state.isLayerDrawerOpen}
            onClose={this.handleCloseLayerDrawer.bind(this)}
          />
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            handleClickOpenLayer={this.handleOpenLayerDrawer.bind(this)}
          />
        </Paper>
      </Box>
    );
  }
}
