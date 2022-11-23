import Dorling, { PositionInfo } from "../../nonview/base/Dorling";

import RegionGeoDorling from "../../view/molecules/RegionGeoDorling";

const RADIUS_PER_PERSON_SQRT = 20;
function getRadiusFromPopulation(population) {
  return Math.sqrt(population) * RADIUS_PER_PERSON_SQRT;
}

export default function AllRegionGeos({
  allEntIndex,
  coloringMethod,
  regionEntType,
  displayRegionIDs,
  layerTable,
  layerTableName,
  setRegion,
}) {
  if (!allEntIndex) {
    return null;
  }
  console.debug("⌛", "AllRegionGeos.render", layerTableName);
  const idToStyle = layerTable.getIDToStyle(displayRegionIDs, coloringMethod);
  const idToPopulation = layerTable.getIDToPopulation(
    displayRegionIDs,
    coloringMethod
  );

  const positionInfoList = displayRegionIDs
    .map(function (regionID) {
      const ent = allEntIndex[regionEntType][regionID];
      const radius = getRadiusFromPopulation(idToPopulation[regionID]);
      const centroid = JSON.parse(ent.centroid);

      return new PositionInfo(regionID, centroid, radius);
    })
    .sort((a, b) => a.regionID.localeCompare(b.regionID));
  const repositionedPolitionInfoList = Dorling.reposition(positionInfoList);

  return repositionedPolitionInfoList.map(function (positionInfo) {
    const { regionID, centroid, radius } = positionInfo;
    const key = `region-geo-${layerTableName}-${regionID}`;
    const { color, opacity } = idToStyle[regionID];

    return (
      <RegionGeoDorling
        key={key}
        regionEntType={regionEntType}
        regionID={regionID}
        setRegion={setRegion}
        color={color}
        opacity={opacity}
        centroid={centroid}
        radius={radius}
      />
    );
  });
}
