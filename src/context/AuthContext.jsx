import { createContext, useState, useEffect } from 'react';
import { loginUser as loginService } from '../services/mockService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const stored = localStorage.getItem('b4one_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('b4one_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await loginService(email, password);
    setUser(userData);
    localStorage.setItem('b4one_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('b4one_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
