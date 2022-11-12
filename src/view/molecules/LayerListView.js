import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import GIG2 from "../../nonview/base/GIG2";

import LayerView from "../../view/molecules/LayerView";

const STYLE_BOX = {
  width: 200,
  maxHeight: 300,
  overflow: "scroll",
};

export default function LayerListView({ layerTableName, setLayerTableName }) {
  const groupToMeasurementToTableNames =
    GIG2.getGroupToMeasurementToTableNames();

  return (
    <Box sx={STYLE_BOX}>
      {Object.entries(groupToMeasurementToTableNames).map(function ([
        groupName,
        measurementToTableNames,
      ]) {
        const key = `table-group-${groupName}`;
        return (
          <Box key={key}>
            <Typography variant="subtitle1">{groupName}</Typography>
            <List>
              {Object.entries(measurementToTableNames).map(function ([
                measurement,
                tableNames,
              ]) {
                const key = "table-" + measurement;
                return (
                  <LayerView
                    key={key}
                    tableNames={tableNames}
                    setLayerTableName={setLayerTableName}
                  />
                );
              })}
            </List>
          </Box>
        );
      })}
    </Box>
  );
}

// import  from "../../view/atoms/";
