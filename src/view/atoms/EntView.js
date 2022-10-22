import { Component } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Ents from "../../nonview/base/Ents.js";
import StringX from "../../nonview/base/StringX";

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
    const { entID, top, bottom } = this.props;
    const { ent } = this.state;
    const entType = Ents.getEntType(entID);
    if (!ent) {
      return <Box>{entID}</Box>;
    }
    return (
      <Box>
        {top ? (
          <>
            <Typography variant="subtitle1">{ent.name}</Typography>
          </>
        ) : null}

        {bottom ? (
          <Box sx={{color: "lightgray"}}>
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
            <Typography variant="body2">
              {Ents.getEntTypeLongName(entType)}
            </Typography>
            <Typography variant="body2">{ent.id}</Typography>
          </Box>
        ) : null}
      </Box>
    );
  }
}
