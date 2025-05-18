import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const RequireRole = ({ allowedRoles, children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLoading(user === null);
    if (user !== null && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      timeoutRef.current = setTimeout(() => {
        setTimeoutExceeded(true);
        if (logout) logout();
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, logout]);

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (timeoutExceeded) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user === null) {
    return <Loading />;
  }

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireRole;
