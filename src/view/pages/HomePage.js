import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LayersIcon from "@mui/icons-material/Layers";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TableRowsIcon from "@mui/icons-material/TableRows";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import LayerListView from "../../view/molecules/LayerListView";
import LayerTableTitleView from "../../view/molecules/LayerTableTitleView";
import ShowHide from "../../view/molecules/ShowHide";
import RegionDetailsView from "../../view/molecules/RegionDetailsView";
import GeoMap from "../../view/organisms/GeoMap";
import HomePageState from "../../view/pages/HomePageState";
import EntTypesSelectorView from "../../view/molecules/EntTypesSelectorView";
import TimeSelectorView from "../../view/molecules/TimeSelectorView";
import AllDetailsView from "../../view/organisms/AllDetailsView";

import {
  STYLE_BODY,
  STYLE_TITLE_BOX,
  STYLE_BODY_TOP_RIGHT_PANEL,
  STYLE_BODY_BOTTOM_LEFT_PANEL,
  STYLE_FOOTER,
} from "../../view/pages/STYLES_HOME_PAGE";

export default class HomePage extends HomePageState {
  constructor(props) {
    super(props);
    this.didMount = false;
  }

  async componentDidMount() {
    if (this.didMount) {
      return;
    }

    this.loadState();
    this.didMount = true;
  }

  render() {
    const {
      allEntIndex,
      center,
      coloringMethod,
      displayRegionIDs,
      geoCenter,
      layerTable,
      layerTableName,
      regionEntType,
      regionID,
      showAllDetailsView,
      showEntTypesSelectorView,
      showLayerListView,
      showRegionDetailsView,
      showTimeSelectorView,
      zoom,
    } = this.state;

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_BODY_TOP_RIGHT_PANEL}>
            <Grid container justifyContent="flex-end">
              <Paper sx={STYLE_TITLE_BOX}>
                <LayerTableTitleView tableName={layerTableName} />
              </Paper>
            </Grid>

            <ShowHide
              ShowIcon={LayersIcon}
              show={showLayerListView}
              onShow={this.onClickShowLayerListView.bind(this)}
              onHide={this.onClickHideLayerListView.bind(this)}
              alignRight
            >
              <LayerListView
                layerTableName={layerTableName}
                setLayerTableName={this.setLayerTableName.bind(this)}
              />
            </ShowHide>

            <ShowHide
              ShowIcon={MapIcon}
              show={showEntTypesSelectorView}
              onShow={this.onClickShowEntTypesSelectorView.bind(this)}
              onHide={this.onClickHideEntTypesSelectorView.bind(this)}
              alignRight
            >
              <EntTypesSelectorView
                layerTableName={layerTableName}
                regionEntType={regionEntType}
                setRegionEntType={this.setRegionEntType.bind(this)}
              />
            </ShowHide>

            <ShowHide
              ShowIcon={AccessTimeIcon}
              show={showTimeSelectorView}
              onShow={this.onClickShowTimeSelectorView.bind(this)}
              onHide={this.onClickHideTimeSelectorView.bind(this)}
              alignRight
            >
              <TimeSelectorView
                layerTableName={layerTableName}
                setLayerTableName={this.setLayerTableName.bind(this)}
              />
            </ShowHide>
          </Box>

          <GeoMap
            allEntIndex={allEntIndex}
            center={center}
            coloringMethod={coloringMethod}
            displayRegionIDs={displayRegionIDs}
            key={`geo-map-${zoom}-${geoCenter}`}
            layerTable={layerTable}
            layerTableName={layerTableName}
            regionEntType={regionEntType}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            setRegion={this.setRegion.bind(this)}
            zoom={zoom}
          />
        </Paper>

        <Box sx={STYLE_BODY_BOTTOM_LEFT_PANEL}>
          <ShowHide
            ShowIcon={BarChartIcon}
            show={showRegionDetailsView}
            onShow={this.onClickShowRegionDetailsView.bind(this)}
            onHide={this.onClickHideRegionDetailsView.bind(this)}
          >
            <RegionDetailsView
              key={`region-details-${regionID}-${layerTableName}`}
              regionID={regionID}
              layerTable={layerTable}
              layerTableName={layerTableName}
              setColoringMethod={this.setColoringMethod.bind(this)}
              coloringMethod={coloringMethod}
            />
          </ShowHide>
          <ShowHide
            ShowIcon={TableRowsIcon}
            show={showAllDetailsView}
            onShow={this.onClickShowAllDetailsView.bind(this)}
            onHide={this.onClickHideAllDetailsView.bind(this)}
          >
            <AllDetailsView
              key={`region-details-${regionID}-${layerTableName}`}
              regionID={regionID}
              layerTableName={layerTableName}
              setColoringMethod={this.setColoringMethod.bind(this)}
              coloringMethod={coloringMethod}
            />
          </ShowHide>
        </Box>

        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            onClickCenterOnCurrentLocation={this.onClickCenterOnCurrentLocation.bind(
              this
            )}
          />
        </Paper>
      </Box>
    );
  }
}
