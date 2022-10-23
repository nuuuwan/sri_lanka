import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import GIG2TableStyle from "../../nonview/base/GIG2TableStyle";
import StringX from "../../nonview/base/StringX";

export const STYLE_BULLET = {
  background: "gray",
  opacity: 0.8,
  p: 1,
  borderRadius: 10,
};

export const STYLE_LIST_ITEM = {
  m: 0,
  p: 0,
};

export default function RegionTableRowCellView({
  coloringMethod,
  valueKey,
  setColoringMethod,
  totalValue,
  value,
}) {
  const styleBulletCustom = {
    ...STYLE_BULLET,
    ...{ background: GIG2TableStyle.getValueKeyColor(valueKey) },
  };
  const onClick = function () {
    setColoringMethod(valueKey);
  };
  return (
    <ListItemButton
      onClick={onClick}
      selected={valueKey === coloringMethod}
      sx={STYLE_LIST_ITEM}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <Typography sx={styleBulletCustom}> </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption">
            {StringX.toTitleCase(valueKey)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">{StringX.formatInt(value)}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align="right">
            {StringX.formatPercent(value, totalValue)}
          </Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}
