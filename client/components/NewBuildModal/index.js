import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { DatePicker, Dialog, FlatButton, Paper, TextField } from 'material-ui';
import { hideModal, saveNewBuild } from '../../actions';
import { leftFloat, paper, field } from './styles'

export default class NewBuildModal extends Component {

  constructor() {
    super();
    this.state = {
      artifacts: [{Label : "", Link : ""}]
    }
  }

  getBuild = () => {
    var artifacts = [];
    for(var ref in this.refs){
      if(ref.indexOf("artifactLabel") != -1){
        var id = ref.substr(ref.indexOf("artifactLabel")+"artifactLabel".length);
        var artifact = {
            Label : this.refs[ref].getValue(),
            Link: this.refs["artifactLink"+id].getValue()
          }
          artifacts.push(artifact);
          console.log(artifact);
        }
      }

    return {
      ReleaseDate : this.refs.date.getDate(),
      Label: this.refs.label.getValue(),
      DockerTag : this.refs.docker.getValue(),
      Artifacts: artifacts
    };
  }

  submit = () => {
    var build = this.getBuild();
    this.props.dispatch(saveNewBuild(build));
    this.props.dispatch(hideModal());
  }

  handleClose = () => {
    this.props.dispatch(hideModal());
  }

  addArtifact = () => {
    var arts = this.state.artifacts;
    arts.push({Label : "", Link : ""});
    this.setState({artifacts: arts});
  }

  handleChange = (event) => {
    alert(event);
  };

  renderForm() {
    var artifacts = [];
    if(this.state.artifacts.map){
      var artifacts = this.state.artifacts.map((art, idx) => {
        return (
          <Paper zDepth={1} key={idx} className={paper}>
            <TextField
              hintText={`Artifact ${idx + 1} Label`}
              defaultValue={art.Label}
              fullWidth={true}
              ref={`artifactLabel${idx}`}
              />
            <br />
            <TextField
              hintText={`Artifact ${idx + 1} Link`}
              defaultValue={art.Link}
              fullWidth={true}
              ref={`artifactLink${idx}`}
              />
          </Paper>
        );
      });
    }

    return (
      <div>
        <DatePicker
          hintText="Date Of Release"
          mode="landscape"
          fullWidth={true}
          className={field}
          defaultValue={this.state.dateOfRelease}
          ref="date"
          />
        <TextField
          hintText="Build Label. eg, AM 2.0.0 (abcdef)"
          fullWidth={true}
          className={field}
          defaultValue={this.state.label}
          ref="label"
          />
          <TextField
            hintText="Docker Tag. eg, AM-2.0.0-abcdef"
            fullWidth={true}
            className={field}
            defaultValue={this.state.label}
            ref="docker"
            />
        <br />
        {artifacts}
      </div>
    );
  }

  render() {
    const actions = [
      <div>
        <div className={leftFloat}>
          <FlatButton
            label="Add Artifact"
            secondary={true}
            onTouchTap={this.addArtifact}
          />
        </div>
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this.handleClose}
        />
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.submit}
        />
      </div>
    ];

    return (
      <Dialog
        title="New Build"
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        actions={actions}
        >
        <Helmet title='New Build' />
        {this.renderForm()}
      </Dialog>
    );
  }
}
export default connect(state => state.modal)(NewBuildModal)