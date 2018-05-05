import React, { Component } from 'react';
import t from 'prop-types';
import firebase from 'src/firebase';
import moment from 'moment';

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
      const { key } = firebase.database().ref('/projects').push();

      const data = {
        title: 'BDW',
        subtitle: 'Belgrade Design Week',
        description: 'Official Belgrade design week website',
        content: '',
        url: 'http://www.belgradedesignweek.com',
        tags: {
          PHP: true,
          JavaScript: true,
          HTML: true,
          CSS: true,
          Wordpress: true,
          Compass: true
        },
        periods: {
          2014: true
        },
        frames: [
          {
            start: moment()
              .year(2014)
              .month(3)
              .startOf('month')
              .valueOf(),
            end: moment()
              .year(2014)
              .month(10)
              .startOf('month')
              .valueOf()
          }
        ]
      };

      // start.format('MMM YYYY');

      const transform = (type, id) =>
        Object.keys(data[type]).reduce((acc, entry) =>
          ({ ...acc, [`/${type}/${entry}/${id}`]: true}), {});

      const updates = {
        [`/projects/${key}`]: data,
        ...(data.technologies ? transform('technologies', key) : {}),
        ...(data.tools ? transform('tools', key) : {}),
        ...(data.libraries ? transform('libraries', key) : {}),
        ...(data.frameworks ? transform('frameworks', key) : {}),
        ...(data.periods ? transform('periods', key) : {})
      };

      console.log('UPDATES', updates);

      // firebase.database().ref().update(updates).then(() => console.log('DONE!'));

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

    render () {
      return (
        <WrappedComponent
          onLogin={ this.onLogin }
          onLogout={ this.onLogout }
          { ...this.props } />
      );
    }
  };
