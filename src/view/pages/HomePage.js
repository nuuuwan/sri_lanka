import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TableRowsIcon from "@mui/icons-material/TableRows";

import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import LayerListView from "../../view/molecules/LayerListView";
import LayerTableTitleView from "../../view/molecules/LayerTableTitleView";
import ShowHide from "../../view/molecules/ShowHide";
import RegionDetailsView from "../../view/molecules/RegionDetailsView";
import GeoMap from "../../view/organisms/GeoMap";
import HomePageState from "../../view/pages/HomePageState";
import EntTypesSelectorView from "../../view/molecules/EntTypesSelectorView";
import TimeSelectorView from "../../view/molecules/TimeSelectorView";
import AllRegionsDetailsView from "../../view/molecules/AllRegionsDetailsView";

import {
  STYLE_BODY,
  STYLE_BODY_TOP_RIGHT_PANEL,
  STYLE_BODY_BOTTOM_RIGHT_PANEL,
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
      showAllRegionsDetailsView,
      showEntTypesSelectorView,
      showLayerListView,
      showRegionDetailsView,
      showTimeSelectorView,
      zoom,
    } = this.state;

    const currentTableMetadata = new GIG2TableMetadata(layerTableName);
    const times = currentTableMetadata.getTimes();
    const noOptionsForTimeSelectorView = times.length <= 1;

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_BODY_TOP_RIGHT_PANEL}>
            <ShowHide
              show={showLayerListView}
              onShow={this.onClickShowLayerListView.bind(this)}
              onHide={this.onClickHideLayerListView.bind(this)}
              hideContent={<LayerTableTitleView tableName={layerTableName} />}
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
            >
              <EntTypesSelectorView
                layerTableName={layerTableName}
                regionEntType={regionEntType}
                setRegionEntType={this.setRegionEntType.bind(this)}
              />
            </ShowHide>

            {noOptionsForTimeSelectorView ? null : (
              <ShowHide
                ShowIcon={AccessTimeIcon}
                show={showTimeSelectorView}
                onShow={this.onClickShowTimeSelectorView.bind(this)}
                onHide={this.onClickHideTimeSelectorView.bind(this)}
              >
                <TimeSelectorView
                  layerTableName={layerTableName}
                  setLayerTableName={this.setLayerTableName.bind(this)}
                  times={times}
                  currentTableMetadata={currentTableMetadata}
                />
              </ShowHide>
            )}
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

        <Box sx={STYLE_BODY_BOTTOM_RIGHT_PANEL}>
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
            show={showAllRegionsDetailsView}
            onShow={this.onClickShowAllRegionsDetailsView.bind(this)}
            onHide={this.onClickHideAllRegionsDetailsView.bind(this)}
          >
            <AllRegionsDetailsView
              key={`region-details-${regionID}-${layerTableName}`}
              regionID={regionID}
              displayRegionIDs={displayRegionIDs}
              layerTableName={layerTableName}
              layerTable={layerTable}
              setColoringMethod={this.setColoringMethod.bind(this)}
              coloringMethod={coloringMethod}
              setRegion={this.setRegion.bind(this)}
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
