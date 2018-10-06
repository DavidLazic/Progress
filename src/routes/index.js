import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from 'src/containers/core/App';
import { Login, Projects, Admin } from 'src/containers/views';
import history from './history';

const publicPath = '/';

export const routes = {
  ROOT: publicPath,
  ADMIN: `${ publicPath }admin`,
  ADMIN_PROJECTS: `${ publicPath }admin/projects`
};

export default class Routes extends Component {
  render () {
    return (
      <Router history={ history }>
        <App>
          <Switch>
            <Route exact path={ routes.ROOT } component={ Login } />
            <Route exact path={ routes.ADMIN } component={ Admin } />
            <Route path={ routes.ADMIN_PROJECTS } component={ Projects } />
          </Switch>
        </App>
      </Router>
    );
  }
}
