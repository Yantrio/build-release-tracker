import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { AppBar, FlatButton} from 'material-ui';
import { content, fullHeight } from './styles';
import { showNewBuildModal } from '../../actions';

import ModalRoot from '#c/ModalRoot'

class App extends Component {
  openModal() {
    this.props.dispatch(showNewBuildModal());
  }

  render() {
    return (
      <div className={fullHeight}>
        <Helmet title='Builds List' />
          <AppBar
            title="Build Release List"
            iconElementRight={<FlatButton label="AddNew" onClick={() => this.openModal()}/>}
          />
        <div className={content, fullHeight}>
          {this.props.children}
        </div>
        <ModalRoot />
      </div>);
  }
}

export default connect(store => ({ builds: store.builds }))(App);