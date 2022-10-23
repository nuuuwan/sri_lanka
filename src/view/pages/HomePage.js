import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

import LayerListView from "../../view/molecules/LayerListView";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import GeoMap from "../organisms/GeoMap";
import RegionDetailsView from "../../view/organisms/RegionDetailsView";
import HomePageState from "./HomePageState";
import TableTitleView from "../../view/molecules/TableTitleView";
import ShowHide from "../../view/organisms/ShowHide";

import {
  STYLE_FLOATING_BOX,
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

  async onClickCenterOnCurrentLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setState({ center, geoCenter, zoom: DEFAULT_ZOOM });
  }

  render() {
    const {
      allEntIndex,
      center,
      coloringMethod,
      geoCenter,
      layerTableName,
      regionID,
      layerTable,
      zoom,
    } = this.state;

    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <Box sx={STYLE_FLOATING_BOX}>
            <TableTitleView tableName={layerTableName} />
          </Box>
          <Paper sx={STYLE_BODY_REGION_DETAILS}>
            <ShowHide title="Region Details">
              <RegionDetailsView
                key={`region-details-${regionID}`}
                regionID={regionID}
                layerTableName={layerTableName}
                setColoringMethod={this.setColoringMethod.bind(this)}
                coloringMethod={coloringMethod}
              />
            </ShowHide>
          </Paper>
          <Paper sx={STYLE_BODY_LAYERS}>
            <LayerListView
              key={`layer-details-${layerTableName}`}
              layerTableName={layerTableName}
              setLayerTableName={this.setLayerTableName.bind(this)}
            />
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
