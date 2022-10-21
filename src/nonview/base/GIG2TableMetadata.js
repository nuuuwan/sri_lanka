import StringX from "../../nonview/base/StringX";

const FILE_BASE = "/public/data/gig2";
export default class GIG2TableMetadata {
  constructor(tableName) {
    this.tableName = tableName;
  }

  get tokens() {
    return this.tableName.split(".");
  }

  get fileName() {
    return FILE_BASE + this.tableName + ".tsv";
  }

  get measurement() {
    return this.tokens[0];
  }

  get measurementTokens() {
    return this.measurement.split("-");
  }

  get measurementLowest() {
    return StringX.toTitleCase(this.measurementTokens.slice(-1)[0]);
  }

  get measurement2ndLowest() {
    return StringX.toTitleCase(this.measurementTokens.slice(-2)[0]);
  }

  get group() {
    return StringX.toTitleCase(this.measurementTokens[0]);
  }

  get entity() {
    return this.tokens[1];
  }

  get time() {
    return this.tokens[2];
  }

  get dataSource() {
    if (this.entity === "regions") {
      return "statistics.gov.lk";
    }

    if (this.entity === "regions-ec") {
      return "elections.gov.lk";
    }

    return "unknown";
  }
}
