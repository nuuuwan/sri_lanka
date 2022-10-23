import ListItemButton from "@mui/material/ListItemButton";

import LayerTableTitleView from "../../view/molecules/LayerTableTitleView";

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
      <LayerTableTitleView tableName={tableName} />
    </ListItemButton>
  );
}
