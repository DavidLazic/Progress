import React, { Component } from 'react';
import t from 'prop-types';
import { Provider } from 'react-redux';
// import Routes from 'routes';
// import DevTools from './DevTools';

export default class Root extends Component {

    static propTypes = {
      store: t.object.isRequired
    }

    render () {
      return (
        <Provider store={ this.props.store }>
          <div>
            Hello
            {/* <Routes /> */}
          </div>
        </Provider>
      );
    }
}
