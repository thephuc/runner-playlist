/* eslint-disable no-undef */
import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import { getFirstAccessToken } from '../redux/authSlice';
import { getUserProfile } from '../redux/userSlice';

const Callback = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.auth.accessToken);
  const expiryTime = useSelector(state => state.auth.expiryTime);


  useEffect(() => {
    const loadData = async () => {
      //  TODO: handle auto-logout + clear localStorage data when both tokens expire
      //  TODO: find way to check if accessToken has expired
      const code = searchParams.get('code');
      console.log(expiryTime)
      if (!accessToken || Date.now() < expiryTime) {
        await dispatch(getFirstAccessToken(code))
        await dispatch(getUserProfile())
      }
    }
    loadData()
    window.location.href = '/tempo-form'
    
  }, []);

  return (
    <div>
      <Typography variant="h3">Heartbpm Callback</Typography>

    </div>
  );
};

export default Callback;
