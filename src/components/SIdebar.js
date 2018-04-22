import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { routeCodes } from 'src/routes';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';

@connect(state => state, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
export default class Sidebar extends Component {

    static propTypes = {
      path: t.string.isRequired,
      actions: t.object.isRequired
    }

    constructor (props) {
      super(props);
      this.routes = {
        [routeCodes.ROOT]: 'Projects'
      };
      this.state = {
        active: this.getActiveRoute(this.props.path)
      };
    }

    componentWillReceiveProps = props => this.setState({ active: this.getActiveRoute(props.path) })

    /**
     * @description
     * Get currently active route index.
     *
     * @param {String} path
     * @return {Number}
     * @private
     */
    getActiveRoute = path => Object.keys(this.routes).indexOf(path)

    /**
     * @description
     * On logout fn
     *
     * @return {Function}
     * @private
     */
    onLogout = () => this.props.actions.logout()

    render () {
      return (
        <section className="h__sidemenu">
          <ul className="h__sidemenu__list">
            {
              Object.keys(this.routes).map((route, index) => (
                <li
                  className={ classNames({
                    'h__sidemenu__list-item': true,
                    'active': this.state.active === index
                  }) }
                  key={ index }>
                  <NavLink to={ route } >{ this.routes[route] }</NavLink>
                </li>
              ))
            }
            <li className="h__sidemenu__list-item">
              <button type="button" onClick={ this.onLogout }>Sign out</button>
            </li>
          </ul>
        </section>
      );
    }
}
