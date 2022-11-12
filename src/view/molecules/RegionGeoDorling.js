import { Circle } from "react-leaflet";

const DEFAULT_STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.4,
  weight: 1.5,
};

function dumbCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

export default function RegionGeoDorling({
  allEntIndex,
  regionEntType,
  regionID,
  setRegion,
  color,
  opacity,
  centroid,
  radius,

}) {
  let style = dumbCopy(DEFAULT_STYLE_GEOJSON);
  style.fillColor = color ? color : style.fillColor;
  style.fillOpacity = opacity ? opacity : style.fillOpacity;

  function onClickRegionInner() {
    setRegion(regionID);
  }

  return (
    <Circle
      center={centroid}
      radius={radius}
      key={`geojson-${regionID}`}
      pathOptions={style}
      eventHandlers={{
        click: onClickRegionInner,
      }}
    />
  );
}
