import 'babel-polyfill';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import store from './app/store';

import appMessages from './i18n';
// import ExamplePage from './example/ExamplePage';
import ClassroomContainer from './containers/ClassroomContainer';
import NewClassroomContainer from './containers/NewClassroomContainer';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Header />
      <Switch>
        <Route path="/:slug/:classroomId/" exact component={ClassroomContainer} />
        <Route path="/:slug/" exact component={NewClassroomContainer} />
        <Route render={() => <h1>No such page</h1>} />
      </Switch>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
