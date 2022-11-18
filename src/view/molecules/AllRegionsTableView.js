import List from "@mui/material/List";

import AllRegionsTableRowView from "../../view/molecules/AllRegionsTableRowView";

export default function AllRegionsTableView({
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

  const MAX_IDS_TO_DISPLAY = 11;
  const n = displayRegionIDsSorted.length;
  let displayRegionIDsSortedFiltered;
  if (n <= MAX_IDS_TO_DISPLAY) {
    displayRegionIDsSortedFiltered = displayRegionIDsSorted;
  } else {
    displayRegionIDsSortedFiltered = [];
    displayRegionIDsSortedFiltered.push(displayRegionIDsSorted[0]);
    for (let i = 0; i < MAX_IDS_TO_DISPLAY - 2; i++) {
      const j = parseInt(n * (i + 1) / (MAX_IDS_TO_DISPLAY - 1));
      displayRegionIDsSortedFiltered.push(displayRegionIDsSorted[j]);
    }
    displayRegionIDsSortedFiltered.push(displayRegionIDsSorted[n - 1]);
  }


  return (
    <List>
      {displayRegionIDsSortedFiltered.map(function (regionIDInner, i) {
        const pctl =100 - 100 * i / (MAX_IDS_TO_DISPLAY - 1);
        let note = '';
        if (pctl === 100) {
          note = 'highest';
        } else if (pctl === 0) {
          note = "lowest";
        } else if (pctl === 50) {
          note = "median";
        } else if (pctl === 90) {
          note = "90 pctl.";
        }else if (pctl === 10) {
          note = "10 pctl. ";
        }


        return (
          <AllRegionsTableRowView
            key={`regions-table-row-${layerTableName}-${regionIDInner}`}
            coloringMethod={coloringMethod}
            setColoringMethod={setColoringMethod}
            layerTable={layerTable}
            regionID={regionID}
            regionIDInner={regionIDInner}
            getRankPFromP={getRankPFromP}
            setRegion={setRegion}
            note={note}
          />
        );
      })}
    </List>
  );
}
