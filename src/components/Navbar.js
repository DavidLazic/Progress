import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { routeCodes } from 'src/routes';
import { NavLink } from 'react-router-dom';

import { Login } from 'src/components';
import { AnimateRipple } from 'src/components/animate';

export default class Navbar extends Component {

  static propTypes = {
    path: t.string.isRequired,
    Auth: t.object.isRequired
  }

  constructor (props) {
    super(props);
    this.routes = {
      [routeCodes.ROOT]: {
        label: 'Projects',
        restriction: () => true
      },
      [routeCodes.ADMIN]: {
        label: 'Admin',
        restriction: Auth => !!Auth.data
      }
    };
    this.state = {
      active: this.getActiveRoute(this.props.path)
    };
  }

  componentWillReceiveProps = props =>
    this.setState({
      active: this.getActiveRoute(props.path)
    })

  getActiveRoute = path =>
    Object
      .keys(this.routes)
      .indexOf(path)

  render () {
    return (
      <section className="h__navbar">
        <ul className="h__navbar__list">
          {
            Object.keys(this.routes).map((route, index) =>
              this.routes[route].restriction(this.props.Auth) ? (
                <li
                  key={ index }
                  className={ classNames({
                    'h__navbar__list-item': true,
                    'active': this.state.active === index
                  }) }>
                  <AnimateRipple>
                    <NavLink to={ route }>{ this.routes[route].label }</NavLink>
                  </AnimateRipple>
                </li>
              ) : null
            )
          }
        </ul>

        <Login Auth={ this.props.Auth } />
      </section>
    );
  }
}
