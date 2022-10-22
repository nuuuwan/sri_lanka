import GIG2TableStyle, {
  DEFAULT_COLOR,
  DEFAULT_OPACITY,
} from "./GIG2TableStyle";

export default class GIG2TableRow {
  static isValueKey(k) {
    return !(
      k.includes("total_") ||
      k.includes("_id") ||
      k.includes("result_ut") ||
      k.includes("valid") ||
      k.includes("rejected") ||
      k.includes("polled") ||
      k.includes("electors")
    );
  }

  constructor(dRaw) {
    [this.d, this.sumValue] = Object.entries(dRaw).reduce(
      function ([d, sumValue], [k, v]) {
        if (GIG2TableRow.isValueKey(k)) {
          v = parseFloat(v);
          d[k] = v;
          sumValue += v;
        }
        return [d, sumValue];
      },
      [{}, 0]
    );
  }

  getValue(k) {
    return this.d[k];
  }

  getMaxValueKeyAndValue() {
    return Object.entries(this.d).reduce(
      function ([maxValueKey, maxValue], [k, v]) {
        if (maxValue === undefined || maxValue < v) {
          return [k, v];
        }
        return [maxValueKey, maxValue];
      },
      [undefined, undefined]
    );
  }

  getPValue(valueKey) {
    return this.d[valueKey] / this.sumValue;
  }

  getStyle(coloringMethod) {
    let color = DEFAULT_COLOR,
      opacity = DEFAULT_OPACITY;

    if (coloringMethod === "majority") {
      /* eslint-disable no-unused-vars */
      const [maxValueKey, maxValue] = this.getMaxValueKeyAndValue();
      color = GIG2TableStyle.getValueKeyColor(maxValueKey);
      const maxPValue = this.getPValue(maxValueKey);
      opacity = GIG2TableStyle.getOpacityFromP(maxPValue);
    } else {
      const colorKey = coloringMethod;
      color = GIG2TableStyle.getValueKeyColor(colorKey);
      const p = this.getPValue(colorKey);
      opacity = GIG2TableStyle.getOpacityFromP(p);
    }

    return {
      color,
      opacity,
    };
  }
}
