export const FOOTER_HEIGHT = 60;
const PADDING = 5;
export const STYLE_BODY = {
  position: "fixed",
  bottom: FOOTER_HEIGHT,
  top: 0,
  left: 0,
  right: 0,
};
export const STYLE_FOOTER = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: FOOTER_HEIGHT,
};

export const STYLE_BODY_TOP_RIGHT_PANEL = {
  position: "fixed",
  top: PADDING,
  bottom: PADDING,
  right: PADDING,
  zIndex: 10000,
  width: "fit-content",
  height: "fit-content",
};

export const STYLE_BODY_BOTTOM_RIGHT_PANEL = {
  position: "fixed",
  bottom: PADDING + FOOTER_HEIGHT,
  right: PADDING,
  zIndex: 10000,
  width: "fit-content",
  height: "fit-content",
};
