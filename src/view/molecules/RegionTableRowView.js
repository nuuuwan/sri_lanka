import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";

import RegionTableRowCellView from "../../view/molecules/RegionTableRowCellView";
import RegionTableRowCustomCellView from "../../view/molecules/RegionTableRowCustomCellView";

export default function RegionTableRowView({
  coloringMethod,
  onClickMajority,
  setColoringMethod,
  regionID,
  tableRow,
}) {
  if (!tableRow) {
    return <CircularProgress />;
  }

  const sortedKeysAndValues = Object.entries(tableRow.d).sort(function (a, b) {
    return b[1] - a[1];
  });
  const MAX_NON_OTHER = 4;
  const otherValue = sortedKeysAndValues
    .slice(MAX_NON_OTHER)
    .reduce(function (otherValue, [k, v]) {
      return otherValue + v;
    }, 0);
  const totalValue = sortedKeysAndValues.reduce(function (totalValue, [k, v]) {
    return totalValue + v;
  }, 0);
  const displayKeysAndValues = [].concat(
    sortedKeysAndValues.slice(0, MAX_NON_OTHER),
    [["Others", otherValue]]
  );

  return (
    <List>
      {displayKeysAndValues.map(function ([valueKey, value]) {
        return (
          <RegionTableRowCellView
            coloringMethod={coloringMethod}
            key={`region-table-row-cell-${regionID}-${valueKey}`}
            setColoringMethod={setColoringMethod}
            totalValue={totalValue}
            value={value}
            valueKey={valueKey}
          />
        );
      })}
      <RegionTableRowCustomCellView
        onClickMajority={onClickMajority}
        isSelected={"majority" === coloringMethod}
        label="Color by Most Common"
      />
    </List>
  );
}
