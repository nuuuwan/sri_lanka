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

  get spaceID() {
    return this.tokens[1];
  }

  get timeID() {
    return this.tokens[2];
  }

  get attrID() {
    return this.tokens[0];
  }

  get attr() {
    return StringX.toTitleCase(this.attrID);
  }

  get space() {
    return StringX.toTitleCase(this.spaceID);
  }

  get time() {
    return StringX.toTitleCase(this.timeID);
  }

  get dataSource() {
    if (this.spaceID === "regions") {
      return "statistics.gov.lk";
    }

    if (this.spaceID === "regions_ec") {
      return "elections.gov.lk";
    }

    return "unknown";
  }
}
