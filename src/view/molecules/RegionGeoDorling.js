import { Circle } from "react-leaflet";

const RADIUS_PER_PERSON_SQRT = 10;

const DEFAULT_STYLE_GEOJSON = {
  color: "white",
  fillColor: "red",
  fillOpacity: 0.4,
  weight: 1.5,
};

function dumbCopy(x) {
  return JSON.parse(JSON.stringify(x));
}

function getRadiusFromPopulation(population) {
  return Math.sqrt(population) * RADIUS_PER_PERSON_SQRT;
}

export default function RegionGeoDorling({
  allEntIndex,
  regionEntType,
  regionID,
  setRegion,
  color,
  opacity,
}) {
  const ent = allEntIndex[regionEntType][regionID];
  const radius = getRadiusFromPopulation(ent.population);
  const centroid = JSON.parse(ent.centroid);

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
