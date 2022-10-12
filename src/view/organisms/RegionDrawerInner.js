import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import GIG2 from "../../nonview/base/GIG2";
import StringX from "../../nonview/base/StringX";

import EntView from "../../view/atoms/EntView";

const STYLE_BOX = {
  m: 1,
  p: 1,
};

export default class RegionDrawerInner extends Component {
  constructor(props) {
    super(props);
    this.state = { tableRow: undefined };
  }

  async componentDidMount() {
    const { selectedLayerTableName, selectedRegionID } = this.props;
    if (!selectedLayerTableName || !selectedRegionID) {
      return;
    }

    const tableIndex = await GIG2.getTableIndex(selectedLayerTableName);
    const tableRow = tableIndex[selectedRegionID];
    this.setState({ tableRow });
  }

  renderTableRow() {
    const { tableRow } = this.state;
    if (!tableRow) {
      return <CircularProgress />;
    }

    const valueKeys = GIG2.filterValueCellKeys(tableRow);
    const sortedKeysAndValues = valueKeys
      .map((k) => [k, tableRow[k]])
      .sort(function (a, b) {
        return b[1] - a[1];
      });
    const MAX_NON_OTHER = 4;
    const otherValue = sortedKeysAndValues
      .slice(MAX_NON_OTHER)
      .reduce(function (otherValue, [k, v]) {
        return otherValue + v;
      }, 0);
    const totalValue = sortedKeysAndValues.reduce(function (
      totalValue,
      [k, v]
    ) {
      return totalValue + v;
    },
    0);
    const displayKeysAndValues = [].concat(
      sortedKeysAndValues.slice(0, MAX_NON_OTHER),
      [["Others", otherValue]]
    );
    return (
      <List>
        {displayKeysAndValues.map(function ([k, v]) {
          const key = `list-item-${k}`;
          return (
            <ListItem key={key}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography>{StringX.toTitleCase(k)}</Typography>
                </Grid>
                <Grid item xs={3} align="right">
                  <Typography>{StringX.formatInt(v)}</Typography>
                </Grid>
                <Grid item xs={2} align="right">
                  <Typography>
                    {StringX.formatPercent(v, totalValue)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    );
  }

  render() {
    return (
      <Box sx={STYLE_BOX}>
        <EntView entID={this.props.selectedRegionID} />
        {this.renderTableRow()}
      </Box>
    );
  }
}
