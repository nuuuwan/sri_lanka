import Color from "./Color.js";
import MathX from "./MathX.js";
import FIELD_NAME_TO_COLOR from "../constants/FIELD_NAME_TO_COLOR.js";

let adhocValueKeyToColor = {};

export const DEFAULT_LAYER_TABLE_NAME = "population-ethnicity.regions.2012";
const DEFAULT_COLOR = "#ccc";
const DEFAULT_OPACITY = 0.5;

export default class GIG2TableUtils {
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
    const valueKeys = GIG2TableUtils.filterValueCellKeys(tableRow);
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
        const sumValue = GIG2TableUtils.getSumValues(tableRow);
        const value = tableRow[valueKey];
        const valueP = value / sumValue;
        return [Math.min(minValueP, valueP), Math.max(maxValueP, valueP)];
      },
      [1.0, 0.0]
    );
  }

  static getSumValues(tableRow) {
    const valueKeys = GIG2TableUtils.filterValueCellKeys(tableRow);
    return MathX.sum(valueKeys.map((valueKey) => tableRow[valueKey]));
  }

  static getValueKeyP(tableRow, valueKey) {
    const sumValues = GIG2TableUtils.getSumValues(tableRow);
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
    const P_CUTOFF = 0.55;
    const q = Math.min(P_CUTOFF, p - P_CUTOFF) / P_CUTOFF;
    const [MIN_OPACITY, MAX_OPACITY] = [0.4, 1];
    return MIN_OPACITY + q * (MAX_OPACITY - MIN_OPACITY);
  }

  static getTableRowColorAndOpacity(coloringMethod, tableRow) {
    let color = DEFAULT_COLOR,
      opacity = DEFAULT_OPACITY;

    if (coloringMethod === "majority") {
      const maxValueKey = GIG2TableUtils.getMaxValueKey(tableRow);
      color = GIG2TableUtils.getValueKeyColor(maxValueKey);
      const maxValueP = GIG2TableUtils.getValueKeyP(tableRow, maxValueKey);
      opacity = GIG2TableUtils.getOpacityFromP(maxValueP);
    } else {
      const colorKey = coloringMethod;
      color = GIG2TableUtils.getValueKeyColor(colorKey);
      const p = GIG2TableUtils.getValueKeyP(tableRow, colorKey);
      opacity = GIG2TableUtils.getOpacityFromP(p);
    }

    return {
      color,
      opacity,
    };
  }

  static getValuePToRankP(dataList, valueKey) {
    const sortedValuePs = dataList
      .map((tableRow) => GIG2TableUtils.getValueKeyP(tableRow, valueKey))
      .sort();
    const nValues = sortedValuePs.length;
    return sortedValuePs.reduce(function (valuePToRankP, valueP, iValue) {
      valuePToRankP[valueP] = iValue / nValues;
      return valuePToRankP;
    }, {});
  }
}
