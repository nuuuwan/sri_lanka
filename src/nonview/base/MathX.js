export default class MathX {
  static sum(numList) {
    return numList.reduce(function (_sum, num) {
      return _sum + num;
    }, 0);
  }

  static forceRange(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }
}
