import { Component } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClick} size="small" align="right">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {this.props.children}
      </>
    );
  }

  render() {
    return (
      <Box>
        {this.state.show ? this.renderWhenShow() : this.renderWhenHide()}
      </Box>
    );
  }
}
