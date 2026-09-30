import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAdmin } from '../redux/authSlice.jsx';

// <LoginProtectedRoute />            -> any logged-in user
// <LoginProtectedRoute adminOnly />  -> logged-in AND is_admin (confirmed by the server)
const LoginProtectedRoute = ({ Children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const adminLoaded = useSelector((state) => state.auth.adminLoaded);
  const location = useLocation();

  useEffect(() => {
    if (adminOnly && isAuthenticated && !adminLoaded) dispatch(checkAdmin());
  }, [adminOnly, isAuthenticated, adminLoaded, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (adminOnly) {
    if (!adminLoaded) return null; // still asking the server
    if (!isAdmin) return <Navigate to="/" replace />;
  }
  return Children ? Children : <Outlet />;
};

export default LoginProtectedRoute;
