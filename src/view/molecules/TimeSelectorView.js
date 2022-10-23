import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import GIG2TableMetadata from "../../nonview/base/GIG2TableMetadata";
import GIG2_TABLE_NAMES from "../../nonview/constants/GIG2_TABLE_NAMES.js";

const STYLE_BOX = {
  height: 100,
  width: 80,
  p: 0,
  m: 1,
};

function getTimes(currentTableMetadata) {
  return GIG2_TABLE_NAMES.map((tableName) => new GIG2TableMetadata(tableName))
    .filter(function (tableMetadata) {
      return (
        tableMetadata.measurement === currentTableMetadata.measurement &&
        tableMetadata.entity === currentTableMetadata.entity
      );
    })
    .map((tableMetadata) => tableMetadata.time);
}

export default function TimeSelectorView({
  layerTableName,
  setLayerTableName,
}) {
  const currentTableMetadata = new GIG2TableMetadata(layerTableName);
  const times = getTimes(currentTableMetadata);
  const nTimes = times.length;
  const currentTime = currentTableMetadata.time;
  const iCurrentTime = times.reduce(function (iCurrentTime, time, iTime) {
    if (time === currentTime) {
      return iTime;
    }
    return iCurrentTime;
  }, undefined);

  const marks = times.map(function (time, iTime) {
    return {
      value: iTime,
      label: time,
    };
  });

  const onChange = function (_, iTime) {
    const newTableMetadata = GIG2TableMetadata.fromMET(
      currentTableMetadata.measurement,
      currentTableMetadata.entity,
      times[iTime]
    );
    setLayerTableName(newTableMetadata.tableName);
  };

  return (
    <Box sx={STYLE_BOX}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
          "& span": {
            fontSize: "75%",
          },
        }}
        orientation="vertical"
        value={iCurrentTime}
        marks={marks}
        max={nTimes - 1}
        min={0}
        onChange={onChange}
        step={1}
      />
    </Box>
  );
}
