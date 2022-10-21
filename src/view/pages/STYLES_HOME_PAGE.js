export const FOOTER_HEIGHT = 60;
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

export const STYLE_DRAWER_INNER = {
  width: 320,
};

export const STYLE_FLOATING_BOX = {
  position: "fixed",
  top: "1%",
  left: "1%",
  zIndex: 10000,
  background: "rgba(255,255,255,0.8)",
  padding: 1,
  borderRadius: 3,
};

export const STYLE_DRAWER = {
  "& .MuiPaper-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
};