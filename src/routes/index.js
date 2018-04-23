import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

import App from 'src/containers/core/App';

import { Projects } from 'src/containers/views';

const publicPath = '/';

export const routeCodes = {
  ROOT: publicPath,
  PROJECTS: `${ publicPath }projects`
};

export default class Routes extends Component {
  render () {
    return (
      <Router history={ history }>
        <App>
          <Switch>
            <Route path={ routeCodes.ROOT } component={ Projects } />
            <Route path={ routeCodes.PROJECTS } component={ Projects } />
          </Switch>
        </App>
      </Router>
    );
  }
}
