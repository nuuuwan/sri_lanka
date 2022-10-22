import GIG2TableMetadata from "./GIG2TableMetadata.js";
import GIG2TableUtils from "./GIG2TableUtils";
import WWW from "./WWW.js";
import GIG2_TABLE_NAMES from "../constants/GIG2_TABLE_NAMES.js";

const ID_FIELD_KEY = "entity_id";
export const DEFAULT_LAYER_TABLE_NAME = "population-ethnicity.regions.2012";

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
    const valueKeys = GIG2TableUtils.filterValueCellKeys(table[0]);
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
}
