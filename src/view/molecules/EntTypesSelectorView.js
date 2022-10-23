import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import EntTypes from "../../nonview/base/EntTypes";
import EntsForMaps from "../../nonview/core/EntsForMaps";

const STYLE_BOX = {
  height: 100,
  width: 100,
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

  const onChange = function (_, iEntType) {
    setRegionEntType(entTypes[iEntType]);
  };

  return (
    <Box sx={STYLE_BOX}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
          "& span": {
            fontSize: "50%",
          },
        }}
        orientation="vertical"
        value={selectedValue}
        marks={marks}
        max={nEntTypes - 1}
        min={0}
        onChange={onChange}
        step={1}
      />
    </Box>
  );
}
