import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Bypassing auth for now: Always provide a dummy user object
  const [currentUser] = useState({ uid: 'bypass-admin', email: 'admin@portfolio.local' });
  const loading = false;

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
