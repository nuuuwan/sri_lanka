import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LayersIcon from "@mui/icons-material/Layers";

export default function CustomBottomNavigation() {
  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<LayersIcon />} />
    </BottomNavigation>
  );
}
