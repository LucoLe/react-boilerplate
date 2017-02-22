import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import './styles/app.scss';

import routes from './routes';

$(document).foundation();

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
