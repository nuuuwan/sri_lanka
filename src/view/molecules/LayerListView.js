import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import GIG2 from "../../nonview/base/GIG2";

import LayerView from "../../view/molecules/LayerView";

const STYLE_BOX = {
  m: 1,
  p: 1,
  maxHeight: "60vh",
  overflow: "scroll",
};

export default function LayerListView({ layerTableName, setLayerTableName }) {
  const groupToTableNames = GIG2.getGroupToTableNames();

  return (
    <Box sx={STYLE_BOX}>
      {Object.entries(groupToTableNames).map(function ([
        groupName,
        tableNames,
      ]) {
        const key = `table-group-${groupName}`;
        return (
          <Box key={key}>
            <Typography variant="subtitle1">{groupName}</Typography>
            <List>
              {tableNames.map(function (tableName) {
                const key = "table-" + tableName;
                return (
                  <LayerView
                    key={key}
                    tableName={tableName}
                    layerTableName={layerTableName}
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
