import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import LayersIcon from "@mui/icons-material/Layers";
import MapIcon from "@mui/icons-material/Map";

import LayerListView from "../../view/molecules/LayerListView";
import RegionDrawerInner from "../../view/organisms/RegionDrawerInner";

const STYLE_DRAWER = {
  "& .MuiPaper-root": {
    background: "rgba(255, 255, 255, 0.8)",
  },
};

const STYLE_DRAWER_INNER = {
  width: 320,
};

export default class CustomDrawer extends Component {
  renderInner() {
    const {
      selectedRegionID,
      selectedLayerTableName,
      setColorMethod,
      selectedColorMethod,
      setSelectedLayerTableName,
      selectedDrawerTabValue,
    } = this.props;

    switch (selectedDrawerTabValue) {
      case "regions":
        return (
          <RegionDrawerInner
            selectedRegionID={selectedRegionID}
            selectedLayerTableName={selectedLayerTableName}
            setColorMethod={setColorMethod}
            selectedColorMethod={selectedColorMethod}
          />
        );
      default:
        return (
          <LayerListView
            selectedLayerTableName={selectedLayerTableName}
            setSelectedLayerTableName={setSelectedLayerTableName}
          />
        );
    }
  }

  render() {
    const {
      handleCloseDrawer,
      selectedDrawerTabValue,
      setSelectedDrawerTabValue,
    } = this.props;

    const onChangeTabs = function (_, tabValue) {
      setSelectedDrawerTabValue(tabValue);
    };
    const isOpen = selectedDrawerTabValue !== "none";
    return (
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={handleCloseDrawer}
        sx={STYLE_DRAWER}
      >
        {isOpen ? (
          <Box sx={STYLE_DRAWER_INNER}>
            <Tabs
              value={selectedDrawerTabValue}
              onChange={onChangeTabs}
              centered
            >
              <Tab icon={<LayersIcon />} value="layers" />
              <Tab icon={<MapIcon />} value="regions" />
            </Tabs>
            {this.renderInner()}
          </Box>
        ) : null}
      </Drawer>
    );
  }
}
