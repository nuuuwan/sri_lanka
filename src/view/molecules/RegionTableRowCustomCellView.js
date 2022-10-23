import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import { STYLE_BULLET } from "../../view/molecules/RegionTableRowCellView";

export default function RegionTableRowCustomCellView({
  onClickMajority,
  isSelected,
  label,
}) {
  return (
    <ListItemButton onClick={onClickMajority} selected={isSelected}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <Typography sx={STYLE_BULLET}> </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="caption">{label}</Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}
