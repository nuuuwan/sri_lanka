import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const STYLE_BOX = {
  width: 320,
  maxWidth: "80%",
};
export default function LayerDrawerInner({ handleCloseLayerDrawer }) {
  return (
    <Box sx={STYLE_BOX}>
      <IconButton onClick={handleCloseLayerDrawer}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
