import React, { Component } from 'react';
import t from 'prop-types';
import firebase from 'src/firebase';

/**
 * @description
 * Higher order component
 * Component wrapper used for connecting component to a specific ref socket
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
      return socket &&
        socket.refs &&
        socket.refs
          .map(ref => firebase.database().ref(ref).on('value', this.onChange.bind(this, ref)));
    }

    componentWillUnmount () {
      return socket &&
        socket.refs &&
        socket.refs
          .map(ref => firebase.database().ref(ref).off('value', this.onChange));
    }

    onChange = (ref, snapshot) => this.props.actions[ref](snapshot.val())

    onApply = updates => firebase.database().ref().update(updates)

    render () {
      return (
        <WrappedComponent
          onApply={ this.onApply }
          { ...this.props } />
      );
    }
  };
