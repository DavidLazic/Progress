import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from 'src/routes';
import env from 'env';
import DevTools from './DevTools';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ffB88C' },
    secondary: { main: '#e56590' },
    green: { main: '#4ccbab' },
    blue: { main: '#039be5' }
  }
});

export default class Root extends Component {

  static propTypes = {
    store: t.object.isRequired
  }

  render () {
    return (
      <MuiThemeProvider theme={ theme }>
        <Provider store={ this.props.store }>
          <Fragment>
            <Routes />
            {
              env.name === 'development'
              && <DevTools />
            }
          </Fragment>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
