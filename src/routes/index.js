import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from 'src/containers/core/App';
import { ViewLogin, ViewProjects } from 'src/containers/views';
import history from './history';

const publicPath = '/';

export const routes = {
  ROOT: publicPath,
  ADMIN_PROJECTS: `${ publicPath }admin/projects`
};

export default class Routes extends Component {
  render () {
    return (
      <Router history={ history }>
        <App>
          <Switch>
            <Route exact path={ routes.ROOT } component={ ViewLogin } />
            <Route path={ routes.ADMIN_PROJECTS } component={ ViewProjects } />
          </Switch>
        </App>
      </Router>
    );
  }
}
