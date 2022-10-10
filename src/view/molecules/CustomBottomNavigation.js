import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LayersIcon from "@mui/icons-material/Layers";

export default function CustomBottomNavigation({ handleClickOpenLayer }) {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<LayersIcon />}
        onClick={handleClickOpenLayer}
      />
    </BottomNavigation>
  );
}
