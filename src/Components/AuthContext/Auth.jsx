

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: null, userId: null, email: null });
  console.log("hi")
  const saveAuthData = ({ token, userId, email }) => {
    console.log("from AuthContext", token, userId, email);
    setAuthData({ token, userId, email});
  };

  return (
    <AuthContext.Provider value={{ authData, saveAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};