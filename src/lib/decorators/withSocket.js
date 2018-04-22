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
export const withSocket = (WrappedComponent = () => null, { socket }) =>
  class WithSocket extends Component {

    static propTypes = {
      actions: t.object.isRequired
    }

    componentDidMount () {
      socket.refs
        .map(ref => firebase.database().ref(ref).on('value', this.onChange.bind(this, ref)));
    }

    componentWillUnmount () {
      socket.refs
        .map(ref => firebase.database().ref(ref).off('value', this.onChange));
    }

    onChange = (ref, snapshot) => this.props.actions[ref](snapshot.val())

    render () {
      return (
        <WrappedComponent
          { ...this.props } />
      );
    }
  };
