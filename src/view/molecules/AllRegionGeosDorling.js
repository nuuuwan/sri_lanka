import RegionGeoDorling from "../../view/molecules/RegionGeoDorling";

const RADIUS_PER_PERSON_SQRT = 10;
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

  const idToStyle = layerTable.getIDToStyle(displayRegionIDs, coloringMethod);

  const positionInfoList = displayRegionIDs.map(function (regionID) {
    const ent = allEntIndex[regionEntType][regionID];
    const radius = getRadiusFromPopulation(ent.population);
    const centroid = JSON.parse(ent.centroid);

    return {
      regionID,
      centroid,
      radius,
    };
  });

  return positionInfoList.map(function (positionInfo) {
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
