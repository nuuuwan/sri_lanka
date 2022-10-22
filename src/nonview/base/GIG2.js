import Color from "./Color.js";
import GIG2TableMetadata from "./GIG2TableMetadata.js";
import MathX from "./MathX.js";
import WWW from "./WWW.js";
import FIELD_NAME_TO_COLOR from "../constants/FIELD_NAME_TO_COLOR.js";
import GIG2_TABLE_NAMES from "../constants/GIG2_TABLE_NAMES.js";

let adhocValueKeyToColor = {};

const ID_FIELD_KEY = "entity_id";
export const DEFAULT_LAYER_TABLE_NAME =
  "population-ethnicity.regions.2012";
const DEFAULT_COLOR = "#ccc";
const DEFAULT_OPACITY = 0.5;

export default class GIG2 {
  static getGroupFromTableName(tableName) {
    return tableName.split(".")[0].split("-")[0];
  }

  static getGroupToTableNames() {
    return GIG2_TABLE_NAMES.reduce(function (groupToTableNames, tableName) {
      const tableMetadata = new GIG2TableMetadata(tableName);
      const group = tableMetadata.group;
      if (!groupToTableNames[group]) {
        groupToTableNames[group] = [];
      }
      groupToTableNames[group].push(tableName);
      return groupToTableNames;
    }, {});
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
    const P_CUTOFF = 0.55;
    const q = Math.min(P_CUTOFF, p - P_CUTOFF) / P_CUTOFF;
    const [MIN_OPACITY, MAX_OPACITY] = [0.4, 1];
    return MIN_OPACITY + q * (MAX_OPACITY - MIN_OPACITY);
  }

  static getTableRowColorAndOpacity(coloringMethod, tableRow) {
    let color = DEFAULT_COLOR,
      opacity = DEFAULT_OPACITY;

    if (coloringMethod === "majority") {
      const maxValueKey = GIG2.getMaxValueKey(tableRow);
      color = GIG2.getValueKeyColor(maxValueKey);
      const maxValueP = GIG2.getValueKeyP(tableRow, maxValueKey);
      opacity = GIG2.getOpacityFromP(maxValueP);
    } else {
      const colorKey = coloringMethod;
      color = GIG2.getValueKeyColor(colorKey);
      const p = GIG2.getValueKeyP(tableRow, colorKey);
      opacity = GIG2.getOpacityFromP(p);
    }

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
