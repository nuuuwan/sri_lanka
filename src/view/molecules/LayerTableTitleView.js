import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LayersIcon from "@mui/icons-material/Layers";

import EntTypes from "../../nonview/base/EntTypes";
import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";
import MEASUREMENT_TO_ICON from "../../nonview/constants/MEASUREMENT_TO_ICON";

const STYLE_BODY1 = {
  fontSize: "50%",
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

export default function LayerTableTitleView({
  tableName,
  regionEntType,
  coloringMethod,
}) {
  const tableMetadata = new GIG2TableMetadata(tableName);

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
          {tableMetadata.time + " · " + tableMetadata.measurement2ndLowest}
        </Typography>
        <Typography variant="caption">
          {tableMetadata.measurementLowest}
        </Typography>
        {regionEntType ? (
          <>
            <Typography variant="body1" sx={STYLE_BODY1}>
              {"By " + EntTypes.getEntTypeLongName(regionEntType)}
            </Typography>
            <Typography variant="body1" sx={STYLE_BODY1}>
              <span>{"Colored by "}</span>
              <span>{coloringMethod}</span>
            </Typography>
          </>
        ) : null}
      </Box>
    </Stack>
  );
}
