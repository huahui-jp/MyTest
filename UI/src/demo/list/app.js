import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import GettingStarted from './components/GettingStarted';
import PageNotFound from './components/PageNotFound';
import Basic from './basic/demo';


const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ Home } />
          <Route path='getting-started' component={ GettingStarted }/>
          <Route path='examples'>
            <Route path='basic' component={ Basic } />
            <Route path='column' component={ Column } />
            <Route path='sort' component={ Sort } />
            <Route path='column-format' component={ ColumnFormat } />
            <Route path='column-filter' component={ ColumnFilter } />
            <Route path='column-header-span' component={ Span } />
            <Route path='selection' component={ Selection } />
            <Route path='pagination' component={ Pagination } />
            <Route path='manipulation' component={ Manipulation } />
            <Route path='cell-edit' component={ CellEdit } />
            <Route path='style' component={ Style } />
            <Route path='advance' component={ Advance } />
            <Route path='others' component={ Other } />
            <Route path='complex' component={ Complex } />
            <Route path='remote' component={ Remote } />
            <Route path='custom' component={ Custom } />
            <Route path='expandRow' component={ Expand } />
            <Route path='keyboard-nav' component={ KeyBoardNav } />
          </Route>
          <Route path='*' component={ PageNotFound }/>
        </Route>
      </Router>
    </AppContainer>, document.querySelector('#root'));
};

if (module.hot) {
  module.hot.accept('./app', renderApp);
}

renderApp();