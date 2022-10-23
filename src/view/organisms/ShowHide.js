import { Component } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const STYLE_BUTTON = {
  fontSize: "50%",
  p: 0,
  m: 0,
};

export default class ShowHide extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  renderWhenHide() {
    const onClick = function () {
      this.setState({ show: true });
    }.bind(this);
    return (
      <Button onClick={onClick} sx={STYLE_BUTTON}>
        {this.props.title}
      </Button>
    );
  }

  renderWhenShow() {
    const onClick = function () {
      this.setState({ show: false });
    }.bind(this);
    return (
      <>
        <Button onClick={onClick} sx={STYLE_BUTTON}>
          {"X"}
        </Button>
        {this.props.children}
      </>
    );
  }

  render() {
    return (
      <Stack direction="row" alignItems="right">
        {this.state.show ? this.renderWhenShow() : this.renderWhenHide()}
      </Stack>
    );
  }
}
