import MathX from "../../nonview/base/MathX";
import EntTypes, { ENT_TYPES } from "../../nonview/base/EntTypes";
import GIG2TableRow from "../../nonview/base/GIG2TableRow";
import GIG2TableStyle, {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
} from "../../nonview/base/GIG2TableStyle";
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

  getGetRankPFromP(valueKey) {
    const sortedPAndTotalList = this.ids
      .filter((id) => EntTypes.getEntType(id) === ENT_TYPES.PROVINCE)
      .map(
        function (id) {
          const tableRow = this.getRowByID(id);
          const pValue = tableRow.getPValue(valueKey);
          const totalValue = 1;
          return { pValue, totalValue };
        }.bind(this)
      )
      .sort(function (a, b) {
        return a.pValue - b.pValue;
      });

    const totalTotal = MathX.sum(sortedPAndTotalList.map((x) => x.totalValue));

    let cumTotal = 0;
    const sortedPAndRankedPValueList = sortedPAndTotalList.map(function ({
      pValue,
      totalValue,
    }) {
      cumTotal += totalValue;
      const rankedPValue = cumTotal / totalTotal;
      return { pValue, rankedPValue };
    });

    return function (p) {
      if (p < sortedPAndRankedPValueList[0].pValue) {
        return 0;
      }

      const n = sortedPAndRankedPValueList.length;
      for (let i = 1; i < n; i++) {
        const { pValue, rankedPValue } = sortedPAndRankedPValueList[i];
        if (p < pValue) {
          const { pValue: pValuePrev, rankedPValue: rankedPValuePrev } =
            sortedPAndRankedPValueList[i - 1];
          const q = (p - pValuePrev) / (pValue - pValuePrev);
          return rankedPValue * q + rankedPValuePrev * (1 - q);
        }
      }
      return 1;
    };
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
    const getRankPFromP = this.getGetRankPFromP(coloringKey);

    return displayRegionIDs.reduce(
      function (idToStyle, id) {
        const tableRow = this.getRowByID(id);
        let color = DEFAULT_COLOR,
          opacity = DEFAULT_OPACITY;

        color = GIG2TableStyle.getValueKeyColor(coloringKey);
        const p = tableRow.getPValue(coloringKey);
        const rankP = getRankPFromP(p);
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
