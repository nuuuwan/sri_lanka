import List from "@mui/material/List";

import GIG2 from "../../nonview/base/GIG2";

import LayerView from "../../view/molecules/LayerView";

export default function LayerListView({
  selectedLayerTableName,
  setSelectedLayerTableName,
}) {
  const tableNames = GIG2.getTableNames();

  return (
    <List>
      {tableNames.map(function (tableName) {
        const key = "table-" + tableName;
        return (
          <LayerView
            key={key}
            tableName={tableName}
            selectedLayerTableName={selectedLayerTableName}
            setSelectedLayerTableName={setSelectedLayerTableName}
          />
        );
      })}
    </List>
  );
}

// import  from "../../view/atoms/";
