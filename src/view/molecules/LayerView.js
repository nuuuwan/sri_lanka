import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";

export default function LayerView({ layerData }) {
  const tokens = layerData.table_name.split(".");
  const sourceName = tokens[2].replaceAll("_", " ");
  const source2Name = tokens[1].replaceAll("_", " ");
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <LayersIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={sourceName} secondary={source2Name} />
    </ListItem>
  );
}
