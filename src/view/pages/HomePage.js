import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LayersIcon from "@mui/icons-material/Layers";
import BarChartIcon from "@mui/icons-material/BarChart";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import LayerListView from "../../view/molecules/LayerListView";
import LayerTableTitleView from "../../view/molecules/LayerTableTitleView";
import ShowHide from "../../view/molecules/ShowHide";
import GeoMap from "../../view/organisms/GeoMap";
import RegionDetailsView from "../../view/organisms/RegionDetailsView";
import HomePageState from "../../view/pages/HomePageState";

import {
  STYLE_TITLE_BOX,
  STYLE_BODY,
  STYLE_FOOTER,
  STYLE_BODY_REGION_DETAILS,
  STYLE_BODY_LAYERS,
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
      geoCenter,
      layerTable,
      layerTableName,
      regionID,
      showLayerListView,
      showRegionDetailsView,
      zoom,
    } = this.state;

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_TITLE_BOX}>
            <LayerTableTitleView tableName={layerTableName} />
          </Box>
          <Paper sx={STYLE_BODY_REGION_DETAILS}>
            <ShowHide
              ShowIcon={BarChartIcon}
              show={showRegionDetailsView}
              onShow={this.onClickShowRegionDetailsView.bind(this)}
              onHide={this.onClickHideRegionDetailsView.bind(this)}
            >
              <RegionDetailsView
                key={`region-details-${regionID}-${layerTableName}`}
                regionID={regionID}
                layerTableName={layerTableName}
                setColoringMethod={this.setColoringMethod.bind(this)}
                coloringMethod={coloringMethod}
              />
            </ShowHide>
          </Paper>
          <Paper sx={STYLE_BODY_LAYERS}>
            <ShowHide
              ShowIcon={LayersIcon}
              show={showLayerListView}
              onShow={this.onClickShowLayerListView.bind(this)}
              onHide={this.onClickHideLayerListView.bind(this)}
            >
              <LayerListView
                layerTableName={layerTableName}
                setLayerTableName={this.setLayerTableName.bind(this)}
              />
            </ShowHide>
          </Paper>
          <GeoMap
            allEntIndex={allEntIndex}
            center={center}
            coloringMethod={coloringMethod}
            key={`geo-map-${zoom}-${geoCenter}`}
            layerTableName={layerTableName}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            setRegion={this.setRegion.bind(this)}
            layerTable={layerTable}
            zoom={zoom}
          />
        </Paper>
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
