import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, loginRequest, registerRequest, verifyEmailRequest } from "../services/authService";

const AuthContext = createContext(null);

const TOKEN_STORAGE_KEY = "tayarat_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_STORAGE_KEY) || "");
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setUser(null);
      setInitializing(false);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        const profile = await getProfile();
        if (isMounted) {
          setUser(profile.user);
        }
      } catch {
        if (isMounted) {
          handleLogout(false);
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const persistToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  const handleLogout = (redirect = true) => {
    persistToken("");
    setUser(null);
    if (redirect) {
      navigate("/login");
    }
  };

  const handleLogin = async (credentials) => {
    const data = await loginRequest(credentials);
    persistToken(data.token);
    const profile = await getProfile();
    setUser(profile.user);
    return data;
  };

  const handleRegister = async (payload) => {
    const data = await registerRequest(payload);
    return data;
  };

  const handleVerifyEmail = async (payload) => {
    const data = await verifyEmailRequest(payload);
    if (data.token) {
      persistToken(data.token);
      const profile = await getProfile();
      setUser(profile.user);
    }
    return data;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      initializing,
      isAuthenticated: !!token,
      login: handleLogin,
      register: handleRegister,
      verifyEmail: handleVerifyEmail,
      logout: handleLogout,
    }),
    [token, user, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

