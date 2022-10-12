import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LayersIcon from "@mui/icons-material/Layers";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function CustomBottomNavigation({
  handleOpenLayerDrawer,
  handleGeoLocation,
}) {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={handleGeoLocation}
      />
      <BottomNavigationAction
        icon={<LayersIcon />}
        onClick={handleOpenLayerDrawer}
      />
    </BottomNavigation>
  );
}
