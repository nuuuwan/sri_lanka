import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function CustomBottomNavigation({
  onClickCenterOnCurrentLocation,
}) {
  const onClickRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };

  const onClickBack = function () {
    console.debug("TODO");
  };

  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<ArrowBackIosIcon />}
        onClick={onClickBack}
      />
      <BottomNavigationAction icon={<RefreshIcon />} onClick={onClickRefresh} />
      <BottomNavigationAction
        icon={<LocationOnIcon />}
        onClick={onClickCenterOnCurrentLocation}
      />
    </BottomNavigation>
  );
}
