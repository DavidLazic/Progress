import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { routeCodes } from 'src/routes';
import { NavLink } from 'react-router-dom';
import { AnimateRipple } from 'src/components/animate';

export default class Navbar extends Component {

    static propTypes = {
      path: t.string.isRequired
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

    render () {
      return (
        <section className="h__navbar">
          <ul className="h__navbar__list">
            {
              Object.keys(this.routes).map((route, index) => (
                <li
                  key={ index }
                  className={ classNames({
                    'h__navbar__list-item': true,
                    'active': this.state.active === index
                  }) }>
                  <AnimateRipple>
                    <NavLink to={ route } >{ this.routes[route] }</NavLink>
                  </AnimateRipple>
                </li>
              ))
            }
          </ul>
        </section>
      );
    }
}
