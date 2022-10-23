import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CustomBottomNavigation({
  onClickCenterOnCurrentLocation,
}) {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={onClickCenterOnCurrentLocation}
      />
    </BottomNavigation>
  );
}
