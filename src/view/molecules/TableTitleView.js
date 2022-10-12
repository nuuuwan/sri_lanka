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

function getTableIcon(tableMetadata) {
  if (tableMetadata.spaceID === "regions_ec") {
    return HowToVoteIcon;
  }

  if (tableMetadata.attrID === "") {
    return LocalDrinkIcon;
  }

  switch (tableMetadata.attrID) {
    case "ethnicity_of_population":
      return TempleBuddhistIcon;
    case "religious_affiliation_of_population":
      return TempleBuddhistIcon;
    case "lighting_of_household":
      return LightbulbIcon;
    case "solid_waste_disposal_by_household":
      return DeleteIcon;
    case "source_of_drinking_water_of_household":
      return LocalDrinkIcon;
    case "toilet_facilities_of_household":
      return WcIcon;
    case "year_of_construction_of_housing_unit":
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
        <Typography variant="caption">{tableMetadata.time}</Typography>
        <Typography variant="h6">{tableMetadata.attr}</Typography>
        <Typography variant="caption">
          {"source: " + tableMetadata.dataSource}
        </Typography>
      </Box>
    </Stack>
  );
}
