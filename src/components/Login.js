import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { AUTHORIZE_ACCOUNT_ENDPOINT } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthStore } from '../redux/authSlice';

const Login = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const expiryTime = useSelector(state => state.auth.expiryTime);  
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (accessToken && Date.now() < expiryTime) {
      window.location.href = '/tempo-form'
    }
    dispatch(resetAuthStore())
  }, [accessToken, expiryTime]);
  

  const handleLogin = () => {
    const scope = 'user-top-read playlist-modify-private playlist-modify-public';

    const urlParams = new URLSearchParams({
      response_type: 'code',
      // eslint-disable-next-line no-undef
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope,    
      // eslint-disable-next-line no-undef
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    })
    const redirect_url = `${AUTHORIZE_ACCOUNT_ENDPOINT}?${urlParams.toString()}`;
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


