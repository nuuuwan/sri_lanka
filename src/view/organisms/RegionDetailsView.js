import { Component } from "react";

import Box from "@mui/material/Box";

import GIG2 from "../../nonview/base/GIG2";

import EntView from "../../view/atoms/EntView";
import RegionTableRowView from "../../view/molecules/RegionTableRowView";

const STYLE_BOX = {
  m: 1,
  p: 1,
};

export default class RegionDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = { tableRow: undefined };
  }

  async componentDidMount() {
    const { layerTableName, regionID } = this.props;
    if (!layerTableName || !regionID) {
      return;
    }

    const layerTable = await GIG2.getTable(layerTableName);
    const tableRow = layerTable.getRowByID(regionID);
    this.setState({ tableRow });
  }

  renderRegionTable() {
    const { tableRow } = this.state;
    const { setColoringMethod, coloringMethod } = this.props;
    const onClickMajority = function () {
      setColoringMethod("majority");
    };

    return (
      <RegionTableRowView
        coloringMethod={coloringMethod}
        tableRow={tableRow}
        onClickMajority={onClickMajority}
        setColoringMethod={setColoringMethod}
      />
    );
  }

  render() {
    const { regionID } = this.props;
    if (!regionID) {
      return null;
    }
    return (
      <Box sx={STYLE_BOX}>
        <EntView entID={regionID} top />
        {this.renderRegionTable()}
        <EntView entID={regionID} bottom />
      </Box>
    );
  }
}
