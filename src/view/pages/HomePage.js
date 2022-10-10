import { Component } from "react";
import GeoMap from "../molecules/GeoMap";
import RegionGeo from "../molecules/RegionGeo";
import Ents, { ENT } from "../../nonview/base/Ents";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { displayRegionIDs: [] };
  }

  async componentDidMount() {
    const entIndex = await Ents.getEntIndexByType(ENT.DSD);
    const filteredEnts = Object.values(entIndex).filter(function (ent) {
      const [lat, lng] = JSON.parse(ent.centroid);
      return 6.8 < lat && lat < 7.0 && 79.8 < lng && lng < 80.0;
    });
    const displayRegionIDs = filteredEnts.map((ent) => ent.id);
    console.debug("displayRegionIDs.length", displayRegionIDs.length);
    this.setState({ displayRegionIDs });
  }

  renderInner() {
    const { displayRegionIDs } = this.state;
    return displayRegionIDs.map(function (regionID) {
      const key = `region-geo-${regionID}`;
      return <RegionGeo key={key} regionID={regionID} />;
    });
  }

  render() {
    return <GeoMap>{this.renderInner()}</GeoMap>;
  }
}
