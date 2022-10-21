import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import GIG2 from "../../nonview/base/GIG2";
import StringX from "../../nonview/base/StringX";

import EntView from "../../view/atoms/EntView";
import TableTitleView from "../../view/molecules/TableTitleView";

const STYLE_BOX = {
  m: 1,
  p: 1,
};

const STYLE_PAPER = {
  m: 0.5,
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
    const { setColorMethod, selectedColorMethod } = this.props;

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

    const onChangeRadioGroup = function (e) {
      setColorMethod(e.target.value);
    };

    return (
      <List>
        <RadioGroup value={selectedColorMethod} onChange={onChangeRadioGroup}>
          {displayKeysAndValues.map(function ([k, v]) {
            const key = `list-item-${k}`;
            const styleBullet = {
              background: GIG2.getValueKeyColor(k),
              opacity: 0.8,
              p: 1,
              borderRadius: 10,
            };
            return (
              <ListItem key={key}>
                <Radio value={k} />
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={1}>
                    <Typography sx={styleBullet}> </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{StringX.toTitleCase(k)}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="right">
                      {StringX.formatInt(v)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="right">
                      {StringX.formatPercent(v, totalValue)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
          <ListItem>
            <Radio value="majority" label="Most Common" />
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={5}>
                <Typography>{"Most Common"}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        </RadioGroup>
      </List>
    );
  }

  render() {
    const { selectedLayerTableName } = this.props;

    return (
      <Box sx={STYLE_BOX}>
        <EntView entID={this.props.selectedRegionID} />
        <Paper sx={STYLE_PAPER}>
          <TableTitleView tableName={selectedLayerTableName} />
          {this.renderTableRow()}
        </Paper>
      </Box>
    );
  }
}
