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
    return this.attrID.replaceAll("_", " ");
  }

  get space() {
    return this.spaceID.replaceAll("_", " ");
  }

  get time() {
    return this.timeID.replaceAll("_", " ");
  }
}
