import React from 'react';
import { render } from 'react-dom';
import { configStore } from 'src/lib/redux/configStore';
import Root from 'src/containers/core/Root.js';
import './scss/style.scss';

import 'src/electron/helpers/context_menu.js';
import 'src/electron/helpers/external_links.js';

render(
  <Root store={ configStore() } />,
  document.getElementById('app')
);
