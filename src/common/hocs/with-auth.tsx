import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function _withAuth(props: T) {
    const token = localStorage.getItem('access_token');
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
      if(!token && location.pathname !== '/auth/login') {
        navigate('/auth/login');
      }
  
      if (token && location.pathname === '/auth/login') {
        navigate('/dashboard/home');
      }
    }, [token]);

    return <Component {...props} />
  }
}

export default withAuth;
