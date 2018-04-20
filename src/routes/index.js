import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';

import App from 'src/containers/core/App';

import Home from 'src/containers/views/Home';
import Login from 'src/containers/views/Login';
import Projects from 'src/containers/views/Projects';

import Admin from 'src/containers/views/admin/Admin';
import AdminProjects from 'src/containers/views/admin/project/Projects';
import AdminProject from 'src/containers/views/admin/project/Project.single';

const publicPath = '/';

export const routeCodes = {
  ROOT: publicPath,
  LOGIN: `${ publicPath }login`,
  PROJECTS: `${ publicPath }projects`,
  ADMIN: `${ publicPath }admin`,
  ADMIN_PROJECTS: `${ publicPath }admin/projects`,
  ADMIN_PROJECT_CREATE: `${ publicPath }admin/projects/create`
};

const AdminLayout = (params) => (
  <Route
    path={ routeCodes.ADMIN }
    render={ props => (
      <Admin { ...props } { ...params } restricted>
        <Switch>
          <Route exact path={ routeCodes.ADMIN } component={ null } />
          <Route exact path={ routeCodes.ADMIN_PROJECTS } component={ AdminProjects } />
          <Route exact path={ routeCodes.ADMIN_PROJECTS_CREATE } component={ AdminProject } />
          <Route path={ `${routeCodes.ADMIN_PROJECTS}/:id` } component={ AdminProject } />
        </Switch>
      </Admin>
    ) } />
);

export default class Routes extends Component {
  render () {
    return (
      <Router history={ history }>
        <App>
          <Route path={ routeCodes.PROJECTS } component={ Projects } />

          <Switch>
            <Route exact path={ routeCodes.ROOT } component={ Home } />
            <Route path={ routeCodes.LOGIN } component={ Login } />

            <AdminLayout path={ routeCodes.ADMIN } />
          </Switch>

          {/* <Route render={ () => <Redirect to={ routeCodes.ROOT } /> } /> */}

        </App>
      </Router>
    );
  }
}
