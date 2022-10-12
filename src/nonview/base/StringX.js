const MAX_SIG_DIGITS = 2;

const STRING_REPLACE_LIST = [
  [" Of ", " of "],
  ["Election Presidential", "Presidential Election"],
];

export default class StringX {
  static toTitleCase(str) {
    if (str === str.toUpperCase()) {
      return str;
    }
    str = str.replaceAll("_", " ");
    str = str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    for (let [before, after] of STRING_REPLACE_LIST) {
      str = str.replaceAll(before, after);
    }
    return str;
  }

  static formatInt(x) {
    const logBase1000 = Math.log(x) / Math.log(1000);

    let numPart, multPart, color;
    if (x >= 1_000_000) {
      numPart = Number(x / 1_000_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "M";
      color = "#000";
    } else if (x >= 1_000) {
      numPart = Number(x / 1_000).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "K";
      color = "#222";
    } else {
      numPart = Number(x).toLocaleString(undefined, {
        maximumSignificantDigits: MAX_SIG_DIGITS,
      });
      multPart = "";
      color = "#444";
    }

    const style = {
      fontSize: parseInt(logBase1000 * 100) + "%",
      color,
    };

    return (
      <span style={style}>
        {numPart}
        {multPart}
      </span>
    );
  }

  static formatPercent(numerator, denominator) {
    const p = numerator / denominator;
    const pFontSize = Math.pow(p, 0.01);

    let numPart = Number(p).toLocaleString(undefined, {
      style: "percent",
      maximumSignificantDigits: MAX_SIG_DIGITS,
    });

    let color;
    if (p > 0.1) {
      color = "#000";
    } else if (p > 0.01) {
      color = "#555";
    } else {
      color = "#aaa";
      numPart = "<1%";
    }

    const style = {
      fontSize: parseInt(pFontSize * 100) + "%",
      color: color,
    };

    return <span style={style}>{numPart}</span>;
  }
}
