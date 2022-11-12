import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LayersIcon from "@mui/icons-material/Layers";

import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";
import MEASUREMENT_TO_ICON from "../../nonview/constants/MEASUREMENT_TO_ICON";

const STYLE_BODY1 = {
  fontSize: "50%",
};
const STYLE_BODY2 = {
  fontSize: "75%",
};

const DEFAULT_ICON = LayersIcon;

function getTableIcon(tableMetadata) {
  if (tableMetadata.entity === "regions-ec") {
    return HowToVoteIcon;
  }

  let Icon = MEASUREMENT_TO_ICON[tableMetadata.measurement];
  if (Icon) {
    return Icon;
  }
  return DEFAULT_ICON;
}

export default function MeasurementView({ tableNames }) {
  const tableName = tableNames[0];
  const tableMetadata = new GIG2TableMetadata(tableName);
  const nTables = tableNames.length;
  let Icon = getTableIcon(tableMetadata);
  return (
    <Stack direction="row" alignItems="center">
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <Box>
        <Typography variant="body1" sx={STYLE_BODY1}>
          {tableMetadata.measurement2ndLowest}
        </Typography>
        <Typography variant="body2" sx={STYLE_BODY2}>
          {tableMetadata.measurementLowest}
        </Typography>
        {nTables > 1 ? (
          <Typography variant="body1" sx={STYLE_BODY1}>
            {nTables + " tables"}
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}
