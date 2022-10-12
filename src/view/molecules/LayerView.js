import ListItemButton from "@mui/material/ListItemButton";

import TableTitleView from "../../view/molecules/TableTitleView";

export default function LayerView({
  tableName,
  selectedLayerTableName,
  setSelectedLayerTableName,
}) {
  const selected = selectedLayerTableName === tableName;
  function onClick() {
    setSelectedLayerTableName(tableName);
  }

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <TableTitleView tableName={tableName} />
    </ListItemButton>
  );
}
