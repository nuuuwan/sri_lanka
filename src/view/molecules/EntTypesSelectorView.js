import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import EntTypes from "../../nonview/base/EntTypes";
import EntsForMaps from "../../nonview/core/EntsForMaps";

const STYLE_BOX = {
  height: 100,
  width: 80,
  p: 0,
  m: 1,
};

export default function EntTypesSelectorView({
  layerTableName,
  regionEntType,
  setRegionEntType,
}) {
  const entTypes = EntsForMaps.getEntTypes(layerTableName);
  const nEntTypes = entTypes.length;
  const marks = entTypes.map(function (entType, iEntType) {
    return {
      value: iEntType,
      label: EntTypes.getEntTypeShortName(entType),
    };
  });

  const selectedValue = entTypes.reduce(function (
    selectedValue,
    entType,
    iEntType
  ) {
    if (entType === regionEntType) {
      return iEntType;
    }
    return selectedValue;
  },
  undefined);

  const onChangeCommitted = function (_, iEntType) {
    setRegionEntType(entTypes[iEntType]);
  };

  return (
    <Box sx={STYLE_BOX}>
      <Slider
        key={"slider-" + selectedValue}
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
          "& span": {
            fontSize: "75%",
          },
        }}
        orientation="vertical"
        defaultValue={selectedValue}
        marks={marks}
        max={nEntTypes - 1}
        min={0}
        onChangeCommitted={onChangeCommitted}
        step={1}
      />
    </Box>
  );
}
