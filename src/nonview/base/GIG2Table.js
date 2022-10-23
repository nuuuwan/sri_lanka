import GIG2TableRow from "./GIG2TableRow";
import GIG2TableStyle, {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
} from "./GIG2TableStyle";
const ID_FIELD_KEY = "entity_id";

export default class GIG2Table {
  constructor(dList) {
    this.tableIndex = dList.reduce(function (tableIndex, d) {
      tableIndex[d[ID_FIELD_KEY]] = new GIG2TableRow(d);
      return tableIndex;
    }, {});
  }

  get ids() {
    return Object.keys(this.tableIndex);
  }

  get baseIDs() {
    return this.ids.filter((id) => id.length === 5);
  }

  getRowByID(id) {
    return this.tableIndex[id];
  }

  getMinMaxPValue(valueKey) {
    return Object.values(this.tableIndex).reduce(
      function ([minPValue, maxPValue], tableRow) {
        const sumValue = tableRow.sumValue;
        const value = tableRow.getValue(valueKey);
        const pValue = value / sumValue;
        return [Math.min(minPValue, pValue), Math.max(maxPValue, pValue)];
      },
      [1.0, 0.0]
    );
  }

  getPToRankP(valueKey) {
    const pList = this.baseIDs.map(
      function (id) {
        return this.getRowByID(id).getPValue(valueKey);
      }.bind(this)
    );
    const n = pList.length;
    return pList.sort().reduce(function (pToRankP, p, iP) {
      pToRankP[p] = iP / n;
      return pToRankP;
    }, {});
  }

  getIDToStyle(displayRegionIDs, coloringMethod) {
    if (coloringMethod === "majority") {
      return this.getIDToStyleMajority(displayRegionIDs);
    }
    return this.getIDToStyleForKey(displayRegionIDs, coloringMethod);
  }

  getIDToStyleMajority(displayRegionIDs) {
    return displayRegionIDs.reduce(
      function (idToStyle, id) {
        const tableRow = this.getRowByID(id);
        let color = DEFAULT_COLOR,
          opacity = DEFAULT_OPACITY;

        /* eslint-disable no-unused-vars */
        const [maxValueKey, maxValue] = tableRow.getMaxValueKeyAndValue();
        color = GIG2TableStyle.getValueKeyColor(maxValueKey);
        const maxPValue = tableRow.getPValue(maxValueKey);
        opacity = GIG2TableStyle.getOpacityFromP(maxPValue);

        idToStyle[id] = {
          color,
          opacity,
        };
        return idToStyle;
      }.bind(this),
      {}
    );
  }

  getIDToStyleForKey(displayRegionIDs, coloringKey) {
    const pToRankP = this.getPToRankP(coloringKey);
    function getRankP(p) {
      for (let [p1, rankP1] of Object.entries(pToRankP)) {
        if (p < p1) {
          return rankP1;
        }
      }
      return 1;
    }

    return displayRegionIDs.reduce(
      function (idToStyle, id) {
        const tableRow = this.getRowByID(id);
        let color = DEFAULT_COLOR,
          opacity = DEFAULT_OPACITY;

        color = GIG2TableStyle.getValueKeyColor(coloringKey);
        const p = tableRow.getPValue(coloringKey);
        const rankP = getRankP(p);
        opacity = GIG2TableStyle.getOpacityFromP(rankP);
        idToStyle[id] = {
          color,
          opacity,
        };
        return idToStyle;
      }.bind(this),
      {}
    );
  }
}
