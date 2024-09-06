import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'vet') {
        navigate('/vet-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [currentUser, navigate]);

  return null; // or a loading spinner if needed
};

export default RoleBasedRoute;
