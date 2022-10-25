import Box from "@mui/material/Box";

const STYLE_BOX = {
  marginLeft: 1,
  marginRight: 1,
  marginBottom: 1,
};


export default function RegionsDetailsView({
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

    </Box>
  );
}
