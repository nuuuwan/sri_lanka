import Box from "@mui/material/Box";

import RegionsTableView from "../../view/molecules/RegionsTableView";

const STYLE_BOX = {
  width: 200,
  height: 200,
  overflow: "scroll",
};

export default function RegionsDetailsView({
  layerTable,
  layerTableName,
  displayRegionIDs,
  setColoringMethod,
  coloringMethod,
  regionID,
}) {
  if (!layerTable) {
    return null;
  }
  const onClickMajority = function () {
    setColoringMethod("majority");
  };

  return (
    <Box sx={STYLE_BOX}>
      <RegionsTableView
        key={`regions-table-${layerTableName}`}
        coloringMethod={coloringMethod}
        onClickMajority={onClickMajority}
        regionID={regionID}
        layerTable={layerTable}
        layerTableName={layerTableName}
        displayRegionIDs={displayRegionIDs}
        setColoringMethod={setColoringMethod}
      />
    </Box>
  );
}
