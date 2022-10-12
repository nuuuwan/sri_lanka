import { Component } from "react";

import List from "@mui/material/List";

import GIG2 from "../../nonview/base/GIG2";

import LayerView from "../../view/molecules/LayerView";

export default class LayerDrawInner extends Component {
  render() {
    const { selectedLayerTableName, setSelectedLayerTableName } = this.props;
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
}
