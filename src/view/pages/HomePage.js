import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";

import Ents from "../../nonview/base/Ents";
import GIG2 from "../../nonview/base/GIG2";
import GeoLocation from "../../nonview/base/GeoLocation";
import EntsForMaps from "../../nonview/core/EntsForMaps";

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
} from "../../view/pages/STYLES_HOME_PAGE";

const DEFAULT_ZOOM = 14;
// const DEFAULT_CENTER = [7.8742, 80.6511]; // Dambulla
const DEFAULT_CENTER = [6.9157, 79.8636]; // Townhall Colombo

const DEFAULT_SELECTED_LAYER_TABLE_NAME = "population-ethnicity.regions.2012";
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
    const { center, zoom, selectedLayerTableName, geoCenter } = this.state;

    const key = `geo-map-${zoom}-${geoCenter}`;
    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_FLOATING_BOX}>
            <TableTitleView tableName={selectedLayerTableName} />
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
      </Box>
    );
  }
}
