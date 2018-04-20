import React, { Component } from 'react';
import t from 'prop-types';
import { routeCodes } from 'src/routes';
import storage from 'src/constants/localStorage';

export const useRestricted = (WrappedComponent = () => null) =>
  class UseRestricted extends Component {

    static propTypes = {
      Auth: t.object,
      actions: t.object.isRequired,
      restricted: t.bool,
      history: t.object.isRequired
    }

    static defaultProps = {
      Auth: {},
      restricted: false
    }

    componentDidMount = () => this.verifyToken() ? this.props.actions.ping() : this.verifyAuth(this.props)

    componentWillReceiveProps = props => this.verifyAuth(props)

    /**
     * @description
     * Resolve existing API token
     *
     * @return {Function}
     * @private
     */
    verifyToken = () => !this.props.Auth.data && localStorage.getItem(storage.TOKEN)

    /**
     * @description
     * Resolve existing user or redirect to ROOT route
     *
     * @param {Object} props
     * @return {Function}
     * @private
     */
    verifyAuth = props =>
      !this.isAuthorized(props.restricted, props.Auth.data) &&
        this.props.history.push(routeCodes.ROOT)

    /**
     * @description
     * Check if user is logged in or route is public.
     *
     * @param  {Bool} restrictedRoute
     * @param  {Object} user
     * @return {Bool}
     * @private
     */
    isAuthorized = (restrictedRoute, user) => Boolean(user) || !restrictedRoute

    render () {
      return this.isAuthorized(this.props.restricted, this.props.Auth.data) ?
        <WrappedComponent { ...this.props } /> : null;
    }
  };
