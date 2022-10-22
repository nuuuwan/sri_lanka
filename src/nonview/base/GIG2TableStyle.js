import Color from "./Color";
import FIELD_NAME_TO_COLOR from "../../nonview/constants/FIELD_NAME_TO_COLOR";

export const DEFAULT_COLOR = "gray";
export const DEFAULT_OPACITY = 0.5;

let adhocValueKeyToColor = {};

export default class GIG2TableStyle {
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
}
