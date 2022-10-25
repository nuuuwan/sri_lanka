import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import StringX from "../../nonview/base/StringX";
import EntView from "../../view/atoms/EntView";
import GIG2TableStyle, {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
} from "../../nonview/base/GIG2TableStyle";

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
  setColoringMethod,
  layerTable,
  regionID,
  regionIDInner,
  getRankPFromP,
}) {
  const tableRow = layerTable.getRowByID(regionIDInner);
  let label = "",
    label2 = "";
  let color = DEFAULT_COLOR,
    opacity = DEFAULT_OPACITY;

  if (coloringMethod === "majority") {
    const [maxValueKey, maxValue] = tableRow.getMaxValueKeyAndValue();
    label = StringX.toTitleCase(maxValueKey)
    label2 = StringX.formatPercent(maxValue, tableRow.total);

    color = GIG2TableStyle.getValueKeyColor(maxValueKey);
    const maxPValue = tableRow.getPValue(maxValueKey);
    const q = Math.max(0, (maxPValue - 0.5) * 2);
    opacity = GIG2TableStyle.getOpacityFromP(q);
  } else {
    const coloringKey = coloringMethod;
    const p = tableRow.getPValue(coloringKey);
    const rankP = getRankPFromP(p);
    color = GIG2TableStyle.getColorFromP(rankP);
    label = StringX.formatPercent(p, 1);
  }

  const styleBulletCustom = {
    ...STYLE_BULLET,
    ...{ background: color, opacity },
  };

  return (
    <ListItemButton sx={STYLE_LIST_ITEM} selected={regionID === regionIDInner}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <Typography sx={styleBulletCustom}> </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            <EntView entID={regionIDInner} minimal />
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption" sx={{ fontSize: "67%" }}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="caption">{label2}</Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}
