import { Component } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";

export default class ShowHide extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  renderWhenHide() {
    const { ShowIcon } = this.props;
    const onClick = function () {
      this.setState({ show: true });
    }.bind(this);
    return (
      <IconButton onClick={onClick}>
        <ShowIcon />
      </IconButton>
    );
  }

  renderWhenShow() {
    const onClick = function () {
      this.setState({ show: false });
    }.bind(this);
    return (
      <>
        <IconButton onClick={onClick}>
          <CloseIcon />
        </IconButton>
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
