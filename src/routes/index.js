import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

import App from 'src/containers/core/App';

import { Projects, Admin } from 'src/containers/views';

const publicPath = '/';

export const routeCodes = {
  ROOT: publicPath,
  PROJECTS: `${ publicPath }projects`,
  ADMIN: `${ publicPath }admin`
};

export default class Routes extends Component {
  render () {
    return (
      <Router history={ history }>
        <App>
          <Switch>
            <Route exact path={ routeCodes.ROOT } component={ Projects } />
            <Route path={ routeCodes.PROJECTS } component={ Projects } />
            <Route path={ routeCodes.ADMIN } component={ Admin } />
          </Switch>
        </App>
      </Router>
    );
  }
}
