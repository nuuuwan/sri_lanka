import GIG2Table from "./GIG2Table";
import GIG2TableMetadata from "./GIG2TableMetadata.js";
import WWW from "./WWW.js";
import GIG2_TABLE_NAMES from "../constants/GIG2_TABLE_NAMES.js";

export const DEFAULT_LAYER_TABLE_NAME =
  "government-elections-parliamentary.regions-ec.2020";

const URL_BASE =
  "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2";

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

  static getGroupToMeasurementToTableNames() {
    return GIG2_TABLE_NAMES.reduce(function (idx, tableName) {
      const tableMetadata = new GIG2TableMetadata(tableName);
      const group = tableMetadata.group;
      const measurement = tableMetadata.measurement;
      if (!idx[group]) {
        idx[group] = {};
      }
      if (!idx[group][measurement]) {
        idx[group][measurement] = [];
      }

      idx[group][measurement].push(tableName);
      return idx;
    }, {});
  }

  static async getTable(tableName) {
    const url = `${URL_BASE}/${tableName}.tsv`;
    const dList = await WWW.tsv(url);
    return new GIG2Table(dList);
  }
}
