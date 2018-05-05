import React, { Component } from 'react';
import t from 'prop-types';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Routes from 'src/routes';
// import DevTools from './DevTools';
// import env from 'env';

const theme = getMuiTheme(darkBaseTheme, {
  palette: { accent3Color: '#3d8b47' }
});

export default class Root extends Component {

    static propTypes = {
      store: t.object.isRequired
    }

    render () {
      return (
        <MuiThemeProvider muiTheme={ theme }>
          <Provider store={ this.props.store }>
            <div>
              <Routes />
              {
                // env.name === 'development' && <DevTools />
              }
            </div>
          </Provider>
        </MuiThemeProvider>
      );
    }
}
