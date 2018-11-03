import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { routes } from 'src/routes';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import firebase from 'src/firebase';
import IconProjects from '@material-ui/icons/ViewList';
import IconArrow from '@material-ui/icons/ChevronRight';
import { AnimateRipple } from 'src/components/animate';
import IconLogout from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  button: {
    color: '#b6b6b7'
  }
});

class Navbar extends Component {

  static propTypes = {
    location: t.object.isRequired,
    Auth: t.object.isRequired,
    classes: t.object.isRequired
  }

  static getActiveRoute = (list, path) =>
    Object
      .keys(list)
      .indexOf(path)

  constructor (props) {
    super(props);
    this.routes = {
      [routes.ADMIN_PROJECTS]: {
        label: 'Projects',
        icon: <IconProjects />,
        restriction: () => true
      }
    };
    this.state = {
      active: Navbar.getActiveRoute(this.routes, this.props.location.pathname)
    };
  }

  componentWillReceiveProps = props =>
    props.location.pathname !== this.props.location.pathname
    && this.setState({
      active: Navbar.getActiveRoute(this.routes, props.location.pathname)
    })

  onLogout = () =>
    firebase.auth().signOut()

  render () {
    const { classes } = this.props;

    return (
      <section className="h__navbar">

        <div className="h__navbar__user">
          <div className="h__navbar__user-title">
            <span>progress</span>
          </div>
          <div className="h__navbar__user-avatar"></div>
          <div className="h__navbar__user-content">
            David Lazić
            <div>dlazic.dev@gmail.com</div>
          </div>
        </div>

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
                    <NavLink to={ route }>
                      { this.routes[route].icon }
                      { this.routes[route].label }

                      {
                        (this.state.active === index)
                        && (
                          <span>
                            <IconArrow />
                          </span>
                        )
                      }
                    </NavLink>
                  </AnimateRipple>
                </li>
              ) : null
            )
          }
        </ul>

        <div
          className="h__navbar__button"
          onClick={ this.onLogout }>
          <IconLogout className={ classes.button } />
          <span>Logout</span>
        </div>
      </section>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
