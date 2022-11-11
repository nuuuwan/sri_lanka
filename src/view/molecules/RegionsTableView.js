import List from "@mui/material/List";

import RegionsTableRowView from "../../view/molecules/RegionsTableRowView";

export default function RegionsTableView({
  coloringMethod,
  onClickMajority,
  setColoringMethod,
  layerTable,
  layerTableName,
  displayRegionIDs,
  regionID,
  setRegion,
}) {
  if (!layerTable) {
    return null;
  }

  let displayRegionIDsSorted;
  let getRankPFromP;
  if (coloringMethod === "majority") {
    displayRegionIDsSorted = displayRegionIDs.sort();
  } else {
    const coloringKey = coloringMethod;
    getRankPFromP = layerTable.getGetRankPFromP(displayRegionIDs, coloringKey);
    displayRegionIDsSorted = displayRegionIDs.sort(function (idA, idB) {
      const tableRowA = layerTable.getRowByID(idA);
      const tableRowB = layerTable.getRowByID(idB);
      const pA = tableRowA ? tableRowA.getPValue(coloringKey) : 0;
      const pB = tableRowB ? tableRowB.getPValue(coloringKey) : 0;
      return pB - pA;
    });
  }

  return (
    <List>
      {displayRegionIDsSorted.map(function (regionIDInner) {
        return (
          <RegionsTableRowView
            key={`regions-table-row-${layerTableName}-${regionIDInner}`}
            coloringMethod={coloringMethod}
            setColoringMethod={setColoringMethod}
            layerTable={layerTable}
            regionID={regionID}
            regionIDInner={regionIDInner}
            getRankPFromP={getRankPFromP}
            setRegion={setRegion}
          />
        );
      })}
    </List>
  );
}
