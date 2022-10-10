import { Component } from "react";

import Box from "@mui/material/Box";

import GIG2 from "../../nonview/base/GIG2";

import EntView from "../../view/atoms/EntView";

export default class RegionDrawerInner extends Component {
  constructor(props) {
    super(props);
    this.state = { table: undefined };
  }

  async componentDidMount() {
    const { selectedLayerTableName, selectedRegionID } = this.props;
    if (!selectedLayerTableName || !selectedRegionID) {
      return;
    }

    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    const table = tableIndex[selectedRegionID];
    this.setState({ table });
  }

  render() {
    const { table } = this.state;
    if (!table) {
      return "Loading...";
    }

    return (
      <Box>
        <EntView entID={this.props.selectedRegionID} />
        {JSON.stringify(table)}
      </Box>
    );
  }
}
