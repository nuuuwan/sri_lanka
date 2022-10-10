import { Component } from "react";

import Box from "@mui/material/Box";

import Ents from "../../nonview/base/Ents";
import EntsForMaps from "../../nonview/core/EntsForMaps";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../molecules/GeoMap";
import RegionGeo from "../molecules/RegionGeo";

const STYLE_BODY = { position: "fixed", bottom: 0, top: 0, left: 0, right: 0 };
const STYLE_FOOTER = {
  position: "fixed",
  bottom: -50,
  height: 100,
  left: 0,
  right: 0,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { allEntIndex: undefined };
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
      <>
        <Box sx={STYLE_BODY}>
          <GeoMap renderChildren={this.renderGeoMapChildren.bind(this)} />
        </Box>
        <Box sx={STYLE_FOOTER}>
          <CustomBottomNavigation />
        </Box>
      </>
    );
  }
}
