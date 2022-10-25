import { Component } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EntTypes from "../../nonview/base/EntTypes.js";
import Ents from "../../nonview/base/Ents.js";
import StringX from "../../nonview/base/StringX";

const STYLE_TEXT_LIGHT = {
  color: "#aaa",
};

export default class EntView extends Component {
  constructor(props) {
    super(props);
    this.state = { ent: undefined };
  }

  async componentDidMount() {
    const { entID } = this.props;
    const ent = await Ents.getEnt(entID);
    this.setState({ ent });
  }

  render() {
    const { entID, minimal, top, bottom } = this.props;
    const { ent } = this.state;
    if (!ent) {
      return null;
    }
    const entType = EntTypes.getEntType(entID);
    return (
      <Box>
        {minimal ? (
          <Typography variant="caption" sx={{ fontSize: "50%" }}>
            {ent.name}
          </Typography>
        ) : null}

        {top ? (
          <>
            <Typography variant="body1" display="inline">
              {ent.name}
            </Typography>
            <Typography variant="caption" sx={STYLE_TEXT_LIGHT}>
              {" " + EntTypes.getEntTypeLongName(entType)}
            </Typography>
          </>
        ) : null}

        {bottom ? (
          <Box sx={STYLE_TEXT_LIGHT}>
            <Typography variant="caption">
              {StringX.formatInt(ent.population)}
              {" pop"}
            </Typography>
            <Typography variant="caption">
              {" · " + ent.area + "km² area"}
            </Typography>
            <Typography variant="caption">
              {" · " + ent.centroid_altitude + "m alt"}
            </Typography>
            <Typography variant="caption">{" · " + ent.id}</Typography>
          </Box>
        ) : null}
      </Box>
    );
  }
}
