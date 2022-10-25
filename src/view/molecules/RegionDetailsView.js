import Box from "@mui/material/Box";

import EntView from "../../view/atoms/EntView";
import RegionTableRowView from "../../view/molecules/RegionTableRowView";

const STYLE_BOX = {
  marginLeft: 1,
  marginRight: 1,
  marginBottom: 1,
  width: 200,
  height: 200,
  overflow: "scroll",
};

export default function RegionDetailsView({
  layerTable,
  layerTableName,
  regionID,
  setColoringMethod,
  coloringMethod,
}) {
  if (!layerTable) {
    return null;
  }
  const tableRow = layerTable.getRowByID(regionID);

  const onClickMajority = function () {
    setColoringMethod("majority");
  };

  return (
    <Box sx={STYLE_BOX}>
      <EntView entID={regionID} top key={`ent-top-${regionID}`} />
      <RegionTableRowView
        key={`region-table-row-${regionID}-${layerTableName}`}
        coloringMethod={coloringMethod}
        tableRow={tableRow}
        onClickMajority={onClickMajority}
        regionID={regionID}
        setColoringMethod={setColoringMethod}
      />
      <EntView entID={regionID} bottom key={`ent-bottom-${regionID}`} />
    </Box>
  );
}
