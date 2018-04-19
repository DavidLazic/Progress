import React from 'react';
import { render } from 'react-dom';
// import { configStore } from 'lib/redux/configStore';
// import Root from './containers/core/Root.js';
import './stylesheets/main.scss';

import './electron/helpers/context_menu.js';
import './electron/helpers/external_links.js';

const App = () => (<div>Hello</div>);

render(
  <App />,
  document.getElementById('app')
);
