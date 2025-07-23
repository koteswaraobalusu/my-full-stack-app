import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStatusQuery } from '../api/authApi';

const ProtectedRoute = ({ children }) => {
  const { data, error, isLoading } = useStatusQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (error || data?.message !== "Authenticated") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
