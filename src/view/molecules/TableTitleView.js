import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TableTitleView({ tableMetadata }) {
  return (
    <Box>
      <Typography variant="caption">{tableMetadata.time}</Typography>
      <Typography variant="subtitle1">{tableMetadata.attr}</Typography>
    </Box>
  );
}
