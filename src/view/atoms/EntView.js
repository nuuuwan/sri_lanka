import { Component } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Ents from "../../nonview/base/Ents.js";

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
    const { entID } = this.props;
    const { ent } = this.state;
    const entType = Ents.getEntType(entID);
    if (!ent) {
      return <Box>{entID}</Box>;
    }
    return (
      <Box>
        <Typography variant="caption">{ent.id}</Typography>
        <Typography variant="h6">{ent.name}</Typography>
        <Typography variant="caption">
          {Ents.getEntTypeLongName(entType)}
        </Typography>
      </Box>
    );
  }
}
