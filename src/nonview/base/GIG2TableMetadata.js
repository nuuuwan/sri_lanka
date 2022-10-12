import StringX from "../../nonview/base/StringX";
import { METADATA_MAP } from "../../nonview/constants/GIG2Constants";

export default class GIG2TableMetadata {
  constructor(tableName) {
    this.tableName = tableName;
    this.data = METADATA_MAP[tableName];
  }

  get fileName() {
    return this.data["file_name"];
  }

  get spaceID() {
    return this.data["space_id"];
  }

  get timeID() {
    return this.data["time_id"];
  }

  get attrID() {
    return this.data["attr_id"];
  }

  get valueKeyList() {
    return this.data["value_key_list_str"].split(";");
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
