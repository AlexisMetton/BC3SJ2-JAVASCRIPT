import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../utils/configAPI';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/isAuthenticated`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      });
  }, []);

  const login = async (credentials) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      fetch(`${API_URL}/api/isAuthenticated`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setUser(data.user);
            navigate('/profile');
          }
        });
    } else {
      alert(data.message);
    }
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user === null) return;
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);
  
    return user ? children : null;
  }
  