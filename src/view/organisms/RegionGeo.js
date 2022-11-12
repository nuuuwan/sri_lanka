import { Component } from "react";

import RegionGeoDorling from "../../view/molecules/RegionGeoDorling";
import RegionGeoGeo from "../../view/organisms/RegionGeoGeo";

export default class RegionGeo extends Component {
  render() {
    const {
      allEntIndex,
      regionEntType,
      regionID,
      setRegion,
      color,
      opacity,
      mapMode,
    } = this.props;

    switch (mapMode) {
      case "dorling":
        const RADIUS_PER_PERSON_SQRT = 10;
        function getRadiusFromPopulation(population) {
          return Math.sqrt(population) * RADIUS_PER_PERSON_SQRT;
        }

        const ent = allEntIndex[regionEntType][regionID];
        const radius = getRadiusFromPopulation(ent.population);
        const centroid = JSON.parse(ent.centroid);

        return (
          <RegionGeoDorling
            regionEntType={regionEntType}
            regionID={regionID}
            setRegion={setRegion}
            color={color}
            opacity={opacity}
            radius={radius}
            centroid={centroid}
          />
        );
      default:
        return (
          <RegionGeoGeo
            regionEntType={regionEntType}
            regionID={regionID}
            setRegion={setRegion}
            color={color}
            opacity={opacity}
          />
        );
    }
  }
}
