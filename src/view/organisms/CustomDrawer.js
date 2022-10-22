import { Component } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import LayersIcon from "@mui/icons-material/Layers";
import MapIcon from "@mui/icons-material/Map";

import LayerListView from "../../view/molecules/LayerListView";
import RegionDrawerInner from "../../view/organisms/RegionDrawerInner";

const STYLE_DRAWER = {};

const STYLE_DRAWER_INNER = {
  width: 320,
};

export default class CustomDrawer extends Component {
  renderInner() {
    const {
      regionID,
      layerTableName,
      setColorMethod,
      colorMethod,
      setLayerTableName,
      drawerTabValue,
    } = this.props;

    switch (drawerTabValue) {
      case "regions":
        return (
          <RegionDrawerInner
            regionID={regionID}
            layerTableName={layerTableName}
            setColorMethod={setColorMethod}
            colorMethod={colorMethod}
          />
        );
      default:
        return (
          <LayerListView
            layerTableName={layerTableName}
            setLayerTableName={setLayerTableName}
          />
        );
    }
  }

  render() {
    const { handleCloseDrawer, drawerTabValue, setDrawerTabValue } = this.props;

    const onChangeTabs = function (_, tabValue) {
      setDrawerTabValue(tabValue);
    };
    const isOpen = drawerTabValue !== "none";
    return (
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={handleCloseDrawer}
        sx={STYLE_DRAWER}
      >
        {isOpen ? (
          <Box sx={STYLE_DRAWER_INNER}>
            <Tabs value={drawerTabValue} onChange={onChangeTabs} centered>
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
