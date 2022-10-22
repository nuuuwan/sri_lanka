import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TuneIcon from "@mui/icons-material/Tune";

export default function CustomBottomNavigation({
  onClickOpenLayerDrawer,
  onClickCenterOnCurrentLocation,
}) {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={onClickCenterOnCurrentLocation}
      />
      <BottomNavigationAction
        icon={<TuneIcon />}
        onClick={onClickOpenLayerDrawer}
      />
    </BottomNavigation>
  );
}
