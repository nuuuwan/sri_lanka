import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ShowHide({ show, ShowIcon, onShow, onHide, children }) {
  return (
    <Box>
      {show ? (
        <>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onHide} size="small" align="right">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          {children}
        </>
      ) : (
        <IconButton onClick={onShow}>
          <ShowIcon />
        </IconButton>
      )}
    </Box>
  );
}
