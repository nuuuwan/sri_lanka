import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";

import RegionsTableView from "../../view/molecules/RegionsTableView";

const STYLE_BOX = {
  width: 200,
  maxHeight: 300,
  overflow: "scroll",
};

export default function RegionsDetailsView({
  layerTable,
  layerTableName,
  displayRegionIDs,
  setColoringMethod,
  coloringMethod,
  regionID,
  setRegion,
}) {
  if (!layerTable) {
    return null;
  }
  const onClickMajority = function () {
    setColoringMethod("majority");
  };

  let title;
  if (coloringMethod === "majority") {
    title = "Color by Most Common";
  } else {
    title = StringX.toTitleCase(coloringMethod);
  }

  return (
    <Box sx={STYLE_BOX}>
      <Typography variante="body1">{title}</Typography>
      <RegionsTableView
        key={`regions-table-${layerTableName}`}
        coloringMethod={coloringMethod}
        onClickMajority={onClickMajority}
        regionID={regionID}
        layerTable={layerTable}
        layerTableName={layerTableName}
        displayRegionIDs={displayRegionIDs}
        setColoringMethod={setColoringMethod}
        setRegion={setRegion}
      />
    </Box>
  );
}
