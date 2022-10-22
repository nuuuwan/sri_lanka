import Box from "@mui/material/Box";
import TableTitleView from "../../view/molecules/TableTitleView";

export const STYLE_FLOATING_BOX = {
  position: "fixed",
  top: "1%",
  left: "1%",
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 3,
};

export default function LayerInfoPanel({ selectedLayerTableName }) {
  return (
    <Box sx={STYLE_FLOATING_BOX}>
      <TableTitleView tableName={selectedLayerTableName} />
    </Box>
  );
}
