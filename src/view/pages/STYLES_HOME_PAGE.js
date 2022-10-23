export const FOOTER_HEIGHT = 60;
const TITLE_HEIGHT = 40;
const PADDING = 10;
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

export const STYLE_TITLE_BOX = {
  position: "fixed",
  top: PADDING,
  right: PADDING,
  height: TITLE_HEIGHT,
  zIndex: 10000,
  background: "rgba(255,255,255,1)",
  padding: 1,
  borderRadius: 5,
};

export const STYLE_BODY_REGION_DETAILS = {
  position: "fixed",
  bottom: FOOTER_HEIGHT + PADDING,
  left: PADDING,
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
  maxWidth: 240,
};
export const STYLE_BODY_LAYERS = {
  position: "fixed",
  top: PADDING * 3 + TITLE_HEIGHT,
  right: PADDING,
  zIndex: 10000,
  maxWidth: 200,
  maxHeight: "67vh",
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
};

export const STYLE_BODY_REGION_TYPES = {
  position: "fixed",
  top: PADDING * 9 + TITLE_HEIGHT,
  right: PADDING,
  zIndex: 10000,
  maxWidth: "67%",
  maxHeight: "67vh",
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
};
