import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired = false,
  children: PropTypes.elementType.isRequired, // Requires a valid React component as 'component' prop
};
export default ProtectedRoute;
