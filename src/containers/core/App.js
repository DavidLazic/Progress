import React, { Component } from 'react';
import t from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { routeCodes } from 'routes';

import Project from 'containers/views/Project.single';

class App extends Component {

    static propTypes = {
      location: t.object,
      children: t.array
    }

    static defaultProps = {
      location: {},
      children: null
    }

    render () {
      const { location } = this.props;

      const modal = location.state && location.state.to === 'modal';
      const position = modal && location.state.meta.from || {};

      return (
        <div>
          {
            React.Children.map(this.props.children, child =>
              child && React.cloneElement(child, { key: child.id })) || null
          }

          {
            modal &&
            <Switch>
              <Route
                path={ `${routeCodes.PROJECTS}/:id` }
                render={ props =>
                  <Project { ...props } position={ position } />
                } />
            </Switch>
          }
        </div>
      );
    }
}

export default withRouter(App);
