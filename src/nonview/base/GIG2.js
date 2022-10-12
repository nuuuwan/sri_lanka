import Color from "./Color.js";
import MathX from "./MathX.js";
import WWW from "./WWW.js";
import { FIELD_NAME_TO_COLOR } from "../constants/ColorConstants.js";
import { TABLE_NAMES } from "../constants/GIG2Constants.js";

let adhocValueKeyToColor = {};

const ID_FIELD_KEY = "entity_id";

export default class GIG2 {
  static getTableNames() {
    return TABLE_NAMES;
  }

  static async getTable(tableName) {
    const url = `/sri_lanka/data/gig2/${tableName}.tsv`;
    return await WWW.tsv(url);
  }

  static async getTableIndex(tableName) {
    const table = await GIG2.getTable(tableName);
    const valueKeys = GIG2.filterValueCellKeys(table[0]);
    return table.reduce(function (tableIndex, tableRow) {
      tableIndex[tableRow[ID_FIELD_KEY]] = Object.entries(tableRow).reduce(
        function (cleanTableRow, [key, value]) {
          if (valueKeys.includes(key)) {
            value = parseFloat(value);
          }
          cleanTableRow[key] = value;
          return cleanTableRow;
        },
        {}
      );
      return tableIndex;
    }, {});
  }

  static filterValueCellKeys(tableRow) {
    const valueCellKeys = Object.keys(tableRow).filter(
      (cellKey) =>
        !(
          cellKey.includes("total_") ||
          cellKey.includes("_id") ||
          cellKey.includes("result_ut") ||
          cellKey.includes("valid") ||
          cellKey.includes("rejected") ||
          cellKey.includes("polled") ||
          cellKey.includes("electors")
        )
    );
    return valueCellKeys;
  }

  static getMaxValueKey(tableRow) {
    const valueKeys = GIG2.filterValueCellKeys(tableRow);
    const maxValueKey = valueKeys.reduce(function (maxValueKey, valueKey) {
      if (tableRow[maxValueKey] < tableRow[valueKey]) {
        maxValueKey = valueKey;
      }
      return maxValueKey;
    }, valueKeys[0]);
    return maxValueKey;
  }

  static getMinMaxValueP(dataList, valueKey) {
    return dataList.reduce(
      function ([minValueP, maxValueP], tableRow) {
        const sumValue = GIG2.getSumValues(tableRow);
        const value = tableRow[valueKey];
        const valueP = value / sumValue;
        return [Math.min(minValueP, valueP), Math.max(maxValueP, valueP)];
      },
      [1.0, 0.0]
    );
  }

  static getSumValues(tableRow) {
    const valueKeys = GIG2.filterValueCellKeys(tableRow);
    return MathX.sum(valueKeys.map((valueKey) => tableRow[valueKey]));
  }

  static getValueKeyP(tableRow, valueKey) {
    const sumValues = GIG2.getSumValues(tableRow);
    return tableRow[valueKey] / sumValues;
  }

  static getValueKeyColor(valueKey) {
    if (FIELD_NAME_TO_COLOR[valueKey]) {
      return FIELD_NAME_TO_COLOR[valueKey];
    }
    if (!adhocValueKeyToColor[valueKey]) {
      adhocValueKeyToColor[valueKey] = Color.getRandomHSLA();
    }
    return adhocValueKeyToColor[valueKey];
  }

  static getOpacityFromP(p) {
    const P_CUTOFF = 0.5;
    const q = Math.min(P_CUTOFF, p - P_CUTOFF) / P_CUTOFF;
    const [MIN_OPACITY, MAX_OPACITY] = [0.1, 0.7];
    return MIN_OPACITY + q * (MAX_OPACITY - MIN_OPACITY);
  }

  static getTableRowColorAndOpacity(tableRow) {
    const maxValueKey = GIG2.getMaxValueKey(tableRow);

    const color = GIG2.getValueKeyColor(maxValueKey);

    const maxValueP = GIG2.getValueKeyP(tableRow, maxValueKey);
    const opacity = GIG2.getOpacityFromP(maxValueP);

    return {
      color,
      opacity,
    };
  }

  static getValuePToRankP(dataList, valueKey) {
    const sortedValuePs = dataList
      .map((tableRow) => GIG2.getValueKeyP(tableRow, valueKey))
      .sort();
    const nValues = sortedValuePs.length;
    return sortedValuePs.reduce(function (valuePToRankP, valueP, iValue) {
      valuePToRankP[valueP] = iValue / nValues;
      return valuePToRankP;
    }, {});
  }
}
