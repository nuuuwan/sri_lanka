import GeoMap from "./view/molecules/GeoMap";
import RegionGeo from "./view/molecules/RegionGeo";

export default function App() {
  return (
      <GeoMap>
        <RegionGeo regionID="LK-11" />
      </GeoMap>
  );
}
