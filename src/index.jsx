import 'babel-polyfill';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, getConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import store from './app/store';
import appMessages from './i18n';
import ClassroomContainer from './containers/ClassroomContainer';
import NewClassroomContainer from './containers/NewClassroomContainer';
import ManageClassroomsContainer from './containers/ManageClassroomsContainer';
import './index.scss';

const App = () => (
  <IntlProvider locale="en">
    <AppProvider store={store}>
      <Header />
      <Router basename={getConfig().PUBLIC_PATH.replace(/\/$/, '')}>
        <Switch>
          <Route path="/create/:slug/" exact component={NewClassroomContainer} />
          <Route path="/manage/" exact component={ManageClassroomsContainer} />
          <Route path="/:classroomId/" exact component={ClassroomContainer} />
          <Route render={() => <h1>No such page</h1>} />
        </Switch>
      </Router>
      <Footer />
    </AppProvider>
  </IntlProvider>
);

subscribe(APP_READY, () => {
  ReactDOM.render(<App />,
    document.getElementById('root'));
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
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
