import '../css/main.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import FacebookLoginStore from './flux/stores/FacebookLoginStore';

import AppContainer from './component/app-container.component';

function redirectToLogin(nextState, replace) {
  if (!FacebookLoginStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function redirectToDashboard(nextState, replace) {
  if (FacebookLoginStore.isLoggedIn()) {
    replace('/');
  }
}

render((
  <Router history={browserHistory}>

    <Route path="/" component={AppContainer}>

      <IndexRoute getComponent={(location, cb) => {
          // Only load if we're logged in
          if (FacebookLoginStore.isLoggedIn()) {
            return require.ensure([], (require) => {
              cb(null, require('./component/dashboard.component').default);
            });
          }
          return require.ensure([], (require) => {
            cb(null, require('./component/home.component').default);
          });
        }}/>

        <Route
          path="/about"
          getComponent={(location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./component/about.component').default);
            });
          }}/>

          <Route
            path="/login"
            onEnter={redirectToDashboard}
            getComponent={(location, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./component/login.component').default);
              });
            }}/>

            <Route
              path="/user/:id"
              onEnter={redirectToLogin}
              getComponent={(location, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('./component/profile.component').default);
                });
              }}/>

              <Route
                path="/settings"
                onEnter={redirectToLogin}
                getComponent={(location, cb) => {
                  require.ensure([], (require) => {
                    cb(null, require('./component/settings.component').default);
                  });
                }}/>

              </Route>

            </Router>
          ),
          document.getElementById('myGridContainer')
        );
