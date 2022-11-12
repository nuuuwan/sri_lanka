import RegionGeoGeo from "../../view/organisms/RegionGeoGeo";

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

  return displayRegionIDs.map(function (regionID) {
    const key = `region-geo-${layerTableName}-${regionID}`;
    const { color, opacity } = idToStyle[regionID];
    return (
      <RegionGeoGeo
        key={key}
        allEntIndex={allEntIndex}
        regionEntType={regionEntType}
        regionID={regionID}
        setRegion={setRegion}
        color={color}
        opacity={opacity}
      />
    );
  });
}
