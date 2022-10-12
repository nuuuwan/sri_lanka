import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TableTitleView({ tableMetadata }) {
  return (
    <Box>
      <Typography variant="caption">{tableMetadata.time}</Typography>
      <Typography variant="h5">{tableMetadata.attr}</Typography>
      <Typography variant="caption">
        {"source: " + tableMetadata.dataSource}
      </Typography>
    </Box>
  );
}
