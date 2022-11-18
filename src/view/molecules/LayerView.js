import ListItemButton from "@mui/material/ListItemButton";

import MeasurementView from "../../view/molecules/MeasurementView";

export default function LayerView({
  tableNames,
  layerTableName,
  setLayerTableName,
}) {
  function onClick() {
    setLayerTableName(tableNames[tableNames.length - 1]);
  }

  return (
    <ListItemButton onClick={onClick}>
      <MeasurementView tableNames={tableNames} />
    </ListItemButton>
  );
}
