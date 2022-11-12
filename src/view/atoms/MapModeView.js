import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PentagonIcon from "@mui/icons-material/Pentagon";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";

import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)({
  width: "fit-content",
  maxHeight: 600,
  background: "rgba(255,255,255,0.8)",
  margin: 1,
  padding: 0,
  borderRadius: "100%",
});

const MAP_MODE_METADATA = {
  geo: {
    Icon: PentagonIcon,
  },
  dorling: {
    Icon: ScatterPlotIcon,
  },
};

export default function MapModeView({ mapMode, setMapMode }) {
  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end">
      {Object.entries(MAP_MODE_METADATA).map(function ([
        mapModeInner,
        { Icon },
      ]) {
        const disabled = mapModeInner === mapMode;
        const onClick = function () {
          setMapMode(mapModeInner);
        };
        return (
          <StyledIconButton
            key={"icon-button-" + mapModeInner}
            disabled={disabled}
            onClick={onClick}
          >
            <Icon />
          </StyledIconButton>
        );
      })}
    </Stack>
  );
}
