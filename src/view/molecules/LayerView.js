import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import LayersIcon from "@mui/icons-material/Layers";

export default function LayerView({
  layerData,
  selectedLayerTableName,
  setSelectedLayerTableName,
}) {
  const tableName = layerData.table_name;
  const tokens = tableName.split(".");
  const sourceName = tokens[2].replaceAll("_", " ");
  const source2Name = tokens[1].replaceAll("_", " ");

  const selected = selectedLayerTableName === tableName;

  function onClick() {
    setSelectedLayerTableName(tableName);
  }

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          <LayersIcon />
        </Avatar>
      </ListItemAvatar>
      <Box>
        <Typography variant="caption">{source2Name}</Typography>
        <Typography variant="subtitle1">{sourceName}</Typography>
      </Box>
    </ListItemButton>
  );
}
