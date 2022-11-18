import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";

export const STYLE_PAPER = {
  width: "fit-content",
  height: "fit-content",
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

const STYLE_HIDE_CONTENT = {
  margin: 1,
  padding: 0,
  borderRadius: 5,
};

export default function ShowHide({
  show,
  ShowIcon,
  onShow,
  onHide,
  children,
  alignLeft,
  hideContent,
}) {
  const justifyContent = alignLeft ? "" : "flex-end";
  return (
    <Grid container justifyContent={justifyContent}>
      <Paper sx={STYLE_PAPER}>
        {show ? (
          <Box sx={STYLE_BOX_INNER}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={onHide} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            {children}
          </Box>
        ) : hideContent ? (
          <Box sx={STYLE_HIDE_CONTENT} onClick={onShow}>
            {hideContent}
          </Box>
        ) : (
          <IconButton onClick={onShow} size="small">
            <ShowIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
}
