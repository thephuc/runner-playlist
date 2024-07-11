import React from 'react';
import { Button, Typography } from '@mui/material';
import { AUTHORIZE_ACCOUNT_ENDPOINT } from '../utils/constants';

const Login = () => {
  const handleLogin = () => {
    const scopes = 'user-top-read';
    // eslint-disable-next-line no-undef
    const redirect_url = `${AUTHORIZE_ACCOUNT_ENDPOINT}?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  
    // Redirect users to Spotify authentication
    window.location.href =  redirect_url;
  };

  return (
    <div>
      <Typography variant="h3">Heartbpm</Typography>
      <Button variant="contained" onClick={handleLogin}>Login with Spotify</Button>
    </div>
  );
};

export default Login;


