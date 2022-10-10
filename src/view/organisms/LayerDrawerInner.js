import { Component } from "react";

import List from "@mui/material/List";

import GIG2 from "../../nonview/base/GIG2";

import LayerView from "../../view/molecules/LayerView";

export default class LayerDrawInner extends Component {
  constructor(props) {
    super(props);
    this.state = { metaData: null };
  }

  async componentDidMount() {
    const metaData = await GIG2.getMetaData();
    this.setState({ metaData });
  }

  render() {
    const { metaData } = this.state;
    if (!metaData) {
      return "Loading...";
    }

    return (
      <List>
        {metaData.map(function (layerData, iLayer) {
          const key = "layer-" + iLayer;
          return <LayerView key={key} layerData={layerData} />;
        })}
      </List>
    );
  }
}
