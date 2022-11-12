import { DEFAULT_ZOOM_GEO, DEFAULT_CENTER } from "../../nonview/base/GeoData";
import GeoLocation from "../../nonview/base/GeoLocation";

const HomePageStateHandlers = {
  async onClickCenterOnCurrentLocation() {
    const geoCenter = await GeoLocation.getLatLng();
    const center = geoCenter ? geoCenter : DEFAULT_CENTER;
    this.setStateAndURLContext({ center, geoCenter, zoom: DEFAULT_ZOOM_GEO });
  },

  onClickShowRegionDetailsView() {
    this.setStateAndURLContext({ showRegionDetailsView: true });
  },
  onClickHideRegionDetailsView() {
    this.setStateAndURLContext({ showRegionDetailsView: false });
  },

  onClickShowAllRegionsDetailsView() {
    this.setStateAndURLContext({ showAllRegionsDetailsView: true });
  },
  onClickHideAllRegionsDetailsView() {
    this.setStateAndURLContext({ showAllRegionsDetailsView: false });
  },

  onClickShowLayerListView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: false,
      showLayerListView: true,
      showTimeSelectorView: false,
    });
  },
  onClickHideLayerListView() {
    this.setStateAndURLContext({ showLayerListView: false });
  },

  onClickShowEntTypesSelectorView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: true,
      showLayerListView: false,
      showTimeSelectorView: false,
    });
  },
  onClickHideEntTypesSelectorView() {
    this.setStateAndURLContext({ showEntTypesSelectorView: false });
  },

  onClickShowTimeSelectorView() {
    this.setStateAndURLContext({
      showEntTypesSelectorView: false,
      showLayerListView: false,
      showTimeSelectorView: true,
    });
  },
  onClickHideTimeSelectorView() {
    this.setStateAndURLContext({ showTimeSelectorView: false });
  },
};
export default HomePageStateHandlers;
