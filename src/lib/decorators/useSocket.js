import React, { Component } from 'react';
import t from 'prop-types';
import { db } from 'src/firebase';

/**
 * @description
 * Higher order component
 * Component wrapper used for connecting component to admin sockets
 *
 * @param  {Function} WrappedComponent
 * @return {Object}
 * @public
 */
export const useSocket = (WrappedComponent = () => null, { socket } = {}) =>
  class UseSocket extends Component {

    static propTypes = {
      actions: t.object
    }

    static defaultProps = {
      actions: null
    }

    componentDidMount () {
      return socket
        && socket.refs
        && socket.refs
          .map(ref =>
            db
              .ref(ref)
              .on('value', this.onChange.bind(this, ref)));
    }

    componentWillUnmount () {
      return socket
        && socket.refs
        && socket.refs
          .map(ref =>
            db
              .ref(ref)
              .off('value', this.onChange));
    }

    onChange = (ref, snapshot) => this.props.actions[ref](snapshot.val())

    render () {
      return (
        <WrappedComponent { ...this.props } />
      );
    }
  };
