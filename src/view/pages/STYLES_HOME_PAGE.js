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

export const STYLE_BODY_RIGHT_PANEL = {
  position: "fixed",
  top: PADDING,
  bottom: PADDING,
  right: PADDING,
  zIndex: 10000,
};

export const STYLE_TITLE_BOX = {
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
};

export const STYLE_BODY_REGION_DETAILS = {
  position: "fixed",
  bottom: FOOTER_HEIGHT + PADDING,
  left: PADDING,
  zIndex: 10000,
};
