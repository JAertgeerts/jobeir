import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Core from '../modules/core/containers/Core';

// Polyfill for require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export function errorLoading(err) {
  throw new Error('Dynamic page loading failed: ' + err);
}

export function loadRoute(cb) {
  return module => cb(null, module.default);
}

// Ned to add routes here to allow development routes to work correctly
if (process.env.NODE_ENV === 'development') {
  require('../modules/home/containers/Home');
  require('../modules/auth/containers/Redirect');
  require('../modules/auth/login/containers/Login');
  require('../modules/auth/signup/containers/Signup');
  require('../modules/auth/reset/containers/Reset');
  require('../modules/auth/password/containers/Password');
  require('../modules/create/step/containers/Step');
  require('../modules/account/profile/containers/Profile');
  require('../modules/not-found/components/NotFound');
}

// React router setup with code splitting
const routes = (
  <Route path="/" component={Core}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/home/containers/Home').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/login/containers/Login').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/signup/containers/Signup').default);
        });
      }}
    />
    <Route
      path="/reset"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/reset/containers/Reset').default);
        });
      }}
    />
    <Route
      path="/password/:resetPasswordToken"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/auth/password/containers/Password').default
          );
        });
      }}
    />
    <Route
      path="/redirect"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/auth/containers/Redirect').default);
        });
      }}
    />
    <Route
      path="/create/:create/:step"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/create/step/containers/Step').default);
        });
      }}
    />
    <Route
      path="/dashboard"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('../modules/account/profile/containers/Profile').default
          );
        });
      }}
    />
    <Route
      path="*"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('../modules/not-found/components/NotFound').default);
        });
      }}
    />
  </Route>
);

function getRoutesArray(obj) {
  const arr = [
    '/api/v0/login',
    '/api/v0/register',
    '/api/v0/reset',
    '/api/v0/password',
    '/api/v0/upload',
    '/favicon.ico'
  ];

  (function getIds(obj) {
    for (let x in obj) {
      if (typeof obj[x] === 'object') {
        getIds(obj[x]);
      } else if (x === 'path') {
        arr.push(obj[x]);
      }
    }
  })(obj);

  return arr;
}

export const routesArray = getRoutesArray(routes);

export default routes;
