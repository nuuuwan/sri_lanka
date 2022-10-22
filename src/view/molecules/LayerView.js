import ListItemButton from "@mui/material/ListItemButton";

import TableTitleView from "../../view/molecules/TableTitleView";

export default function LayerView({
  tableName,
  layerTableName,
  setLayerTableName,
}) {
  const selected = layerTableName === tableName;
  function onClick() {
    setLayerTableName(tableName);
  }

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <TableTitleView tableName={tableName} />
    </ListItemButton>
  );
}
