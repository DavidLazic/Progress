import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { routeCodes } from 'src/routes';
import * as types from 'src/actions/types';

import { Sidebar, Header } from 'src/components';
import { Project } from 'src/containers/views';

@connect(state => ({
  Sidebar: state.sidebarReducer[types.SIDEBAR]
}))
class App extends Component {

    static propTypes = {
      location: t.object,
      children: t.object,
      Sidebar: t.object.isRequired
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
        <Fragment>
          <Header />
          <div className={ classNames({
            'h__article': true,
            'h__article--menu-open': this.props.Sidebar.active
          }) }>
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
        </Fragment>
      );
    }
}

export default withRouter(App);
