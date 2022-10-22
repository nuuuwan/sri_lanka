import GIG2TableRow from "./GIG2TableRow";
import GIG2TableStyle, {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
} from "./GIG2TableStyle";
const ID_FIELD_KEY = "entity_id";

export default class GIG2Table {
  constructor(dList) {
    this.tableIndex = dList.reduce(function (tableIndex, d) {
      tableIndex[d[ID_FIELD_KEY]] = new GIG2TableRow(d);
      return tableIndex;
    }, {});
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

  getStyle(id, coloringMethod) {
    const tableRow = this.getRowByID(id);
    let color = DEFAULT_COLOR,
      opacity = DEFAULT_OPACITY;

    if (coloringMethod === "majority") {
      /* eslint-disable no-unused-vars */
      const [maxValueKey, maxValue] = tableRow.getMaxValueKeyAndValue();
      color = GIG2TableStyle.getValueKeyColor(maxValueKey);
      const maxPValue = tableRow.getPValue(maxValueKey);
      opacity = GIG2TableStyle.getOpacityFromP(maxPValue);
    } else {
      const colorKey = coloringMethod;
      color = GIG2TableStyle.getValueKeyColor(colorKey);
      const p = tableRow.getPValue(colorKey);
      opacity = GIG2TableStyle.getOpacityFromP(p);
    }

    return {
      color,
      opacity,
    };
  }
}
