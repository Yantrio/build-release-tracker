import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { List, ListItem, Dialog, Divider, FlatButton } from 'material-ui';
import { hideModal } from '../../actions';

export default class ViewBuildModal extends Component {
  constructor(props) {
    super(props);
    this.state = { build : props.build };
  }

  handleClose = () => {
    store.dispatch(hideModal());
  }

  renderItem = (label, text) => {
    return (
      <ListItem>
        <div>
          <b style={{fontWeight:"bold", textAlign:"left"}}>
            {label}
          </b>
          <span style={{float:"right"}}>
            {text}
          </span>
        </div>
      </ListItem>
    )
  }

  renderForm() {
    var b = this.state.build;

    var artifacts = b.Artifacts.map((artifact) => {
      return (
        <div>
          {this.renderItem(artifact.Label, <a href={artifact.Link}>{artifact.Link}</a>)}
          <Divider/>
        </div>
      )
    });
    return (
      <div>
        <List>
          {this.renderItem("Label", b.Label)}
          <Divider/>
          {this.renderItem("Docker Tag", b.DockerTag)}
          <Divider/>
          {this.renderItem("Date Released", b.ReleaseDate)}
          <Divider/>
          {artifacts}
        </List>
      </div>
    );
  }

  render() {
    const actions = [
      <div>
        <FlatButton
          label="Close"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleClose}
        />
      </div>
    ];

    return (
      <Dialog
        title={"Build Release: " + this.state.build.Label}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        actions={actions}
        >
        <Helmet title={this.state.build.Label} />
        {this.renderForm()}
      </Dialog>
    );
  }
}
export default connect(state => state.modal)(ViewBuildModal)