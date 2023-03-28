import React, { Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Hero from '../components/Hero';
import Content from '../components/Content';
import { getAccessToken } from '../index';

const Home = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getNewToken = async () => {
    const t1 = await getAccessToken();
    const t2 = await getAccessTokenSilently({ ignoreCache: true });
    console.log(t1 === t2, t1.length, t2.length);
    console.log(t1);
    console.log(t2);
    console.log((await getAccessToken()) === t2);
  };

  const getClients = async () => {
    const token = await getAccessToken();
    const response = await axios.get('https://dev-bvyp5kpmxea26ie0.us.auth0.com/api/v2/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  };

  return (
    <Fragment>
      <Hero />
      <button onClick={getNewToken}>Click</button>
      <button onClick={getClients}>Click to get clients</button>
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
