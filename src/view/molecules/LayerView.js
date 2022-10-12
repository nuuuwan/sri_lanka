import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteIcon from "@mui/icons-material/Delete";
import HouseIcon from "@mui/icons-material/House";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LayersIcon from "@mui/icons-material/Layers";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import WcIcon from "@mui/icons-material/Wc";

import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";

import TableTitleView from "../../view/molecules/TableTitleView";

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

export default function LayerView({
  tableName,
  selectedLayerTableName,
  setSelectedLayerTableName,
}) {
  const tableMetadata = new GIG2TableMetadata(tableName);

  const selected = selectedLayerTableName === tableName;

  function onClick() {
    setSelectedLayerTableName(tableName);
  }

  let Icon = getTableIcon(tableMetadata);

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          <Icon />
        </Avatar>
      </ListItemAvatar>
      <TableTitleView tableMetadata={tableMetadata} />
    </ListItemButton>
  );
}
