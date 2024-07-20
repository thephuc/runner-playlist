import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import TempoForm from './components/TempoForm';
import RecommendedTracks from './components/RecommendedTracks';
import Callback from './components/Callback';
import ProtectedRoute from './components/ProtectedRoute';
import { resetAuthStore } from './redux/authSlice';

const App = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const expiryTime = useSelector(state => state.auth.expiryTime);  
  const dispatch = useDispatch()
  if (accessToken && Date.now() > expiryTime) {
    dispatch(resetAuthStore())
  }

  const checkIsAuthenticated = () => !!(accessToken && Date.now() < expiryTime)
  const isAuthenticated = checkIsAuthenticated()


  return (
    <Router>
      <Routes>
        <Route path="/tempo-form" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <TempoForm  />            
          </ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <RecommendedTracks  />            
          </ProtectedRoute>
        } />
        <Route exact path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="*"
          element={<Navigate to="/tempo-form" replace={true} />}
        />
      </Routes>
    </Router>
      

  );
};

export default App;
