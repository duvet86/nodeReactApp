import FacebookLoginStore from './flux/stores/FacebookLoginStore';

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

export default {
  component: require('../component/app-container.component').default,
  // childRoutes: [
  //   { path: '/logout',
  //     getComponent: (location, cb) => {
  //       require.ensure([], (require) => {
  //         cb(null, require('../component/logout.component').default);
  //       });
  //     }
  //   },
    { path: '/about',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../component/about.component').default);
        });
      }
    },

    { onEnter: redirectToDashboard,
      childRoutes: [
        // Unauthenticated routes
        // Redirect to dashboard if user is already logged in
        { path: '/login',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../component/login.component').default);
            });
          }
        }
        // ...
      ]
    },

    { onEnter: redirectToLogin,
      childRoutes: [
        // Protected routes that don't share the dashboard UI
        { path: '/user/:id',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../component/profile.component').default);
            });
          }
        }
        // ...
      ]
    },

    { onEnter: redirectToLogin,
      childRoutes: [
        // Protected routes that don't share the dashboard UI
        { path: '/settings',
          getComponent: (location, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../component/settings.component').default);
            });
          }
        }
        // ...
      ]
    },

    { path: '/',
      getComponent: (location, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (FacebookLoginStore.isLoggedIn()) {
          return require.ensure([], (require) => {
            cb(null, require('../component/dashboard.component').default);
          });
        }
        return require.ensure([], (require) => {
          cb(null, require('../component/home.component').default);
        });
      },
      indexRoute: {
        getComponent: (location, cb) => {
          // Only load if we're logged in
          if (FacebookLoginStore.isLoggedIn()) {
            return require.ensure([], (require) => {
              cb(null, require('../component/dashboard.component').default);
            });
          }
          return cb();
        }
      }
    }

  ]
};
