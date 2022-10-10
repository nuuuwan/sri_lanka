import { Component } from "react";
import Ents from "../../base/Ents.js";

import "./EntView.css";

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
      return <div className="div-ent-id">{entID}</div>;
    }
    return (
      <div className="div-ent-name">
        <div className="div-ent-type">{Ents.getEntTypeLongName(entType)}</div>
        <div className="div-ent-name">{ent.name}</div>
      </div>
    );
  }
}
