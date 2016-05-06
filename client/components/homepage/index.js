import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import {fullHeight} from '../app/styles.css';

import Builds from '#app/components/builds';

export default class Homepage extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    Builds.onEnter({store, nextState, replaceState, callback});
    callback(); // this call is important, don't forget it
  }
  /*eslint-enable */

  render() {
    return (
        <Builds />
    );
  }
}
