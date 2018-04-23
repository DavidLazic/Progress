import React, { Component } from 'react';
import t from 'prop-types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';

import { Sidebar } from 'src/components';
import { Project } from 'src/containers/views';

class App extends Component {

    static propTypes = {
      location: t.object,
      children: t.object
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
        <div className="h__article--menu-open">
          <Sidebar path={ this.props.location.pathname } />

          <section className="h__pusher">
            { this.props.children }

            {
              modal &&
              <Route
                path={ `${routeCodes.PROJECTS}/:id` }
                render={ props =>
                  <Project { ...props } position={ position } />
                } />
            }
          </section>
        </div>
      );
    }
}

export default withRouter(App);
