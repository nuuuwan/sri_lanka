import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

export const STYLE_PAPER = {
  width: "fit-content",
  maxHeight: 600,
  background: "rgba(255,255,255,0.8)",
  margin: 1,
  padding: 0,
  borderRadius: 5,
};

export const STYLE_BOX_INNER = {
  padding: 1,
  margin: 1,
};

export default function ShowHide({
  show,
  ShowIcon,
  onShow,
  onHide,
  children,
  alignRight,
}) {
  const justifyContent = alignRight ? "flex-end" : "";
  return (
    <Grid container justifyContent={justifyContent}>
      <Paper sx={STYLE_PAPER}>
        {show ? (
          <Box sx={STYLE_BOX_INNER}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={onHide} size="small" align="right">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            {children}
          </Box>
        ) : (
          <IconButton onClick={onShow}>
            <ShowIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
}
