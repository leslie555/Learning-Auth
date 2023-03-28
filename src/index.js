import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider, Auth0Context } from '@auth0/auth0-react';
import history from './utils/history';
import { getConfig } from './config';

const onRedirectCallback = (appState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const deferred = (() => {
  const props = {};
  props.promise = new Promise((resolve) => (props.resolve = resolve));
  return props;
})();

export const getAccessToken = async () => {
  const getToken = await deferred.promise;
  return getToken();
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();
console.log('==', config);

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  audience: config.audience,
  scope: 'read:clients',
  advancedOptions: {
    defaultScope: 'profile',
  },
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <Auth0Context.Consumer>
      {({ getAccessTokenSilently }) => {
        deferred.resolve(getAccessTokenSilently);
        return <App />;
      }}
    </Auth0Context.Consumer>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
