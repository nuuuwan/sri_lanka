import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TuneIcon from "@mui/icons-material/Tune";

export default function CustomBottomNavigation({
  handleOpenDrawer,
  handleGeoLocation,
}) {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={handleGeoLocation}
      />
      <BottomNavigationAction icon={<TuneIcon />} onClick={handleOpenDrawer} />
    </BottomNavigation>
  );
}
