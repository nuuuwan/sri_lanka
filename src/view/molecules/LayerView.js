import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import LayersIcon from "@mui/icons-material/Layers";
import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";
import TableTitleView from "../../view/molecules/TableTitleView";

export default function LayerView({
  tableName,
  selectedLayerTableName,
  setSelectedLayerTableName,
}) {
  const tableMetadata = new GIG2TableMetadata(tableName);
  console.debug(tableMetadata.data);

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
      <TableTitleView tableMetadata={tableMetadata} />
    </ListItemButton>
  );
}
