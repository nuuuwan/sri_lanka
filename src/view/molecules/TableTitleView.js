import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import HouseIcon from "@mui/icons-material/House";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LayersIcon from "@mui/icons-material/Layers";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import WcIcon from "@mui/icons-material/Wc";

import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";

const STYLE_BODY1 = {
  fontSize: "50%",
};

function getTableIcon(tableMetadata) {
  if (tableMetadata.entity === "regions_ec") {
    return HowToVoteIcon;
  }

  if (tableMetadata.measurement === "") {
    return LocalDrinkIcon;
  }

  switch (tableMetadata.measurement) {
    case "population-ethnicity":
      return TempleBuddhistIcon;
    case "population-religion":
      return TempleBuddhistIcon;
    case "social-household-lighting":
      return LightbulbIcon;
    case "social-household-waste_disposal":
      return DeleteIcon;
    case "social-household-drinking_water":
      return LocalDrinkIcon;
    case "social-household-toilet_facilities":
      return WcIcon;
    case "social-household-year_of_construction":
      return HouseIcon;
    default:
      return LayersIcon;
  }
}

export default function TableTitleView({ tableName }) {
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
      </Box>
    </Stack>
  );
}
