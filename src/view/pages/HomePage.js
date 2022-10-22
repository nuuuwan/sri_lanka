import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { DEFAULT_ZOOM, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation";
import LayerInfoPanel from "../../view/molecules/LayerInfoPanel";
import CustomDrawer from "../../view/organisms/CustomDrawer";
import GeoMap from "../organisms/GeoMap";
import HomePageState from "./HomePageState";
import { STYLE_BODY, STYLE_FOOTER } from "../../view/pages/STYLES_HOME_PAGE";

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
  onClickCloseDrawer() {
    this.setState({ drawerTabValue: "none" });
  }

  onClickOpenLayerDrawer() {
    this.setState({ drawerTabValue: "layers" });
  }

  render() {
    const {
      allEntIndex,
      center,
      coloringMethod,
      drawerTabValue,
      geoCenter,
      layerTableName,
      regionID,
      tableIndex,
      zoom,
    } = this.state;

    const key = `geo-map-${zoom}-${geoCenter}`;
    return (
      <Box>
        <Paper sx={STYLE_BODY}>
          <LayerInfoPanel layerTableName={layerTableName} />
          <GeoMap
            allEntIndex={allEntIndex}
            center={center}
            coloringMethod={coloringMethod}
            key={key}
            layerTableName={layerTableName}
            setCenterAndZoom={this.setCenterAndZoom.bind(this)}
            setRegion={this.setRegion.bind(this)}
            tableIndex={tableIndex}
            zoom={zoom}
          />
          <CustomDrawer
            coloringMethod={coloringMethod}
            drawerTabValue={drawerTabValue}
            layerTableName={layerTableName}
            onClickCloseDrawer={this.onClickCloseDrawer.bind(this)}
            regionID={regionID}
            setColoringMethod={this.setColoringMethod.bind(this)}
            setDrawerTabValue={this.setDrawerTabValue.bind(this)}
            setLayerTableName={this.setLayerTableName.bind(this)}
          />
        </Paper>
        <Paper sx={STYLE_FOOTER}>
          <CustomBottomNavigation
            onClickOpenLayerDrawer={this.onClickOpenLayerDrawer.bind(this)}
            onClickCenterOnCurrentLocation={this.onClickCenterOnCurrentLocation.bind(
              this
            )}
          />
        </Paper>
      </Box>
    );
  }
}
