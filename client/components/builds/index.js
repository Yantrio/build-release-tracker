import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { loadBuilds, removeBuild, showViewBuildModal } from '../../actions';
import { center } from './styles.css';
import { CircularProgress, FlatButton, Table, TableHeader, TableBody, TableHeaderColumn, TableRow , TableRowColumn} from 'material-ui';

class Builds extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    store.dispatch(loadBuilds());
  }
  /*eslint-enable */

  removeBuild = (build) => {
    store.dispatch(removeBuild(build));
  };

  viewBuild = (build) => {
    store.dispatch(showViewBuildModal(build));
  };

  render() {
    if(this.props.buildstore.fetching == true) {
      return (
        <CircularProgress size={2} className={center} />
      );
    }
    var builds;
    if(this.props.buildstore.builds) {
      builds = this.props.buildstore.builds.map(b => {
        var d = new Date(b.ReleaseDate);
        return (
          <TableRow key={b.ID} onRowClick={() => alert("woo")}>
            <TableRowColumn>{d.toLocaleString()}</TableRowColumn>
            <TableRowColumn>{b.Label}</TableRowColumn>
            <TableRowColumn>{b.DockerTag}</TableRowColumn>
              <TableRowColumn style={{width:150}}>
                <FlatButton
                  label="View"
                  onTouchTap={() => this.viewBuild(b)}
                />
              </TableRowColumn>
            <TableRowColumn style={{width:150}}>
              <FlatButton
                label="Remove"
                onTouchTap={() => this.removeBuild(b)}
              />
            </TableRowColumn>
          </TableRow>
        );
      });
    }

    return (
      <div>
        <Helmet title='Builds' />
        <Table onRowClick={()=> {alert('Click event on row')}}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Release Date</TableHeaderColumn>
              <TableHeaderColumn>Version</TableHeaderColumn>
              <TableHeaderColumn>Docker Tag</TableHeaderColumn>
              <TableHeaderColumn style={{width:150}} />
              <TableHeaderColumn style={{width:150}} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {builds}
          </TableBody>
        </Table>
      </div>);
  }

}

export default connect(store => ({ buildstore: store.builds }))(Builds);
