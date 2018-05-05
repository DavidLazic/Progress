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
export const withSocket = (WrappedComponent = () => null, { socket } = {}) =>
  class WithSocket extends Component {

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

    onLogin = ({ email, password }) => firebase.auth().signInWithEmailAndPassword(email, password)

    onLogout = () => firebase.auth().signOut()

    onChange = (ref, snapshot) => this.props.actions[ref](snapshot.val())

    onCreateProject = project => {
      const { key } = firebase.database().ref('/projects').push();

      const transform = (type, id) =>
        Object.keys(project[type]).reduce((acc, entry) =>
          ({ ...acc, [`/${type}/${entry}/${id}`]: true}), {});

      const updates = {
        [`/projects/${key}`]: project,
        ...(project.tags ? transform('tags', key) : {}),
        ...(project.periods ? transform('periods', key) : {})
      };

      return firebase.database().ref().update(updates);
    }

    render () {
      return (
        <WrappedComponent
          onLogin={ this.onLogin }
          onLogout={ this.onLogout }
          onCreateProject={ this.onCreateProject }
          { ...this.props } />
      );
    }
  };
