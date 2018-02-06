import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css';
import ChartBang from './containers/ChartBang';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ChartBang />,
  document.getElementById('root')
);
registerServiceWorker();
