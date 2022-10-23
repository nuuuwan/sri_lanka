export const FOOTER_HEIGHT = 60;
const PADDING = 4;
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

export const STYLE_FLOATING_BOX = {
  position: "fixed",
  bottom: FOOTER_HEIGHT + PADDING,
  right: PADDING,
  zIndex: 10000,
  background: "rgba(255,255,255,1)",
  padding: 1,
  borderRadius: 5,
};

export const STYLE_BODY_REGION_DETAILS = {
  position: "fixed",
  top: PADDING,
  left: PADDING,
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
};
export const STYLE_BODY_LAYERS = {
  position: "fixed",
  top: PADDING,
  right: PADDING,
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 5,
};
